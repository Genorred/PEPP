import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepositoryImpl } from "../infrastructure/repositories/users.repository.impl";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "../domain/dto/input/auth/login.input";
import * as bcrypt from "bcrypt";
import { CustomContext } from "@_shared/types/CustomContext";
import { RedisClientConnectionType } from "@keyv/redis";
import getCookies from "@_shared/utils/getCookies";
import { ConfigService } from "@nestjs/config";
import { getCookiesOptions } from "@_config/auth";
import { UsersRepository } from "../domain/repositories/users.repository";
import { CreateUserInput } from "../domain/dto/input/users/create-user.input";
import { TokenService } from "../domain/domain-service/token.service";

@Injectable()
export class AuthUseCase {
  constructor(
    private usersService: UsersRepository,
    private jwtService: JwtService,
    private readonly tokenService: TokenService
  ) {
  }

  async register(registerInput: CreateUserInput, context: CustomContext) {
    const { password, ...data } = registerInput;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const { password: dbHashedPassword, ...user } = await this.usersService.create({
      ...data,
      password: hashedPassword
    });
    if (!user) {
      throw new Error("error creating user");
    }
    this.tokenService.setTokens(user, context.res as Response);
    console.log("goal");
    return user;
  }

  async login(loginInput: LoginInput) {
    const { password, ...user } = await this.validateUser(loginInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateUser(loginInput: LoginInput) {
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
