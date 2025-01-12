import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";
import * as bcrypt from "bcrypt";
import { CreateUserInput } from "../users/dto/create-user.input";
import { SetAuthTokens } from "./auth-flow-guard/set-auth-tokens";
import { CustomContext } from "@_shared/types/CustomContext";
import { REDIS_CLIENT } from "./redis.module";
import { RedisClientConnectionType } from "@keyv/redis";
import getCookies from "@_shared/utils/getCookies";
import { ConfigService } from "@nestjs/config";
import { getCookiesOptions } from "@_config/auth";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private SetAuthTokens: SetAuthTokens,
    @Inject(REDIS_CLIENT) private redisClient: RedisClientConnectionType,
    private configService: ConfigService
  ) {
  }

  async register(registerInput: CreateUserInput, context: CustomContext) {
    const { password } = registerInput;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const { password: dbHashedPassword, ...user } = await this.usersService.create({
      ...registerInput,
      password: hashedPassword
    });
    if (!user) {
      throw new Error("error creating user");
    }
    this.SetAuthTokens.setTokens(user, context.res);
    console.log("goal");
    return user;
  }

  async login(loginInput: LoginInput, context: CustomContext) {
    const { password, ...user } = await this.validateUser(loginInput);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    this.SetAuthTokens.setTokens(user, context.res);
    return user;
  }

  private async validateUser(loginInput: LoginInput) {
    const { password, email } = loginInput;

    const user = await this.usersService.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  public async logout(context: CustomContext) {
    const token = getCookies(context).refreshToken;
    if (token) {
      const decoded = this.jwtService.verify(token);
      const PX = new Date().getTime() -
        new Date(Number(decoded.exp as string)).getTime();
      const isOk = await this.redisClient.set(token, 0, {
        PX
      });

      const cookiesOptions = getCookiesOptions(this.configService.get("NODE_ENV"));
      context.res.clearCookie("refreshToken", cookiesOptions);
      context.res.clearCookie("accessToken", cookiesOptions);
      return isOk;
    } else {
      throw new UnauthorizedException();
    }
  }

}
