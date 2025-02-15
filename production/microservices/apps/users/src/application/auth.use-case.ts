import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginInput } from "../domain/dto/input/auth/login.input";
import * as argon2 from "argon2";
import { CustomContext } from "@_shared/types/CustomContext";
import getCookies from "@_shared/utils/getCookies";
import { UsersRepository } from "../domain/repositories/users.repository";
import { CreateUserInput } from "../domain/dto/input/users/create-user.input";
import { TokenService } from "../domain/domain-service/token.service";
import { CacheRepository } from "../domain/repositories/cache.repository";

@Injectable()
export class AuthUseCase {
  constructor(
    private usersService: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly cacheRepository: CacheRepository,
  ) {
  }

  async register(registerInput: CreateUserInput, context: CustomContext) {
    const { password, ...data } = registerInput;
    const hashedPassword = await argon2.hash(password);
    const { password: dbHashedPassword, ...user } = await this.usersService.create({
      ...data,
      password: hashedPassword
    });
    if (!user) {
      throw new Error("error creating user");
    }
    this.tokenService.setTokens(user, context.res);
    console.log("goal");
    return user;
  }

  async login(loginInput: LoginInput, context: CustomContext) {
    const { password, ...user } = await this.validateUser(loginInput);
    if (!user) {
      throw new UnauthorizedException();
    }
    this.tokenService.setTokens(user, context.res);
    return user;
  }

  public async logout(context: CustomContext) {
    const token = getCookies(context).refreshToken;
    if (token) {
      const decoded = this.tokenService.verify(token);
      const PX = new Date().getTime() - new Date(Number(decoded.exp as string)).getTime();
      await this.cacheRepository.set(token, 0, PX);
      this.tokenService.removeTokens(context.res)
      return 'success'
    } else {
      throw new UnauthorizedException();
    }
  }

  private async validateUser(loginInput: LoginInput) {
    const { password, email } = loginInput;

    const user = await this.usersService.findOne({ email });
    const isCorrect = await argon2.verify(user.password, password)
    if (user && isCorrect) {
      return user;
    }
    return null;
  }

}
