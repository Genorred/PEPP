import { ArgumentsHost, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";
import * as bcrypt from "bcrypt";
import { CreateUserInput } from "../users/dto/create-user.input";
import { SetAuthTokens } from "./auth-flow-guard/set-auth-tokens";
import { ServerResponse } from "node:http";
import { CustomContext } from "@_shared/types/CustomContext";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private SetAuthTokens: SetAuthTokens
  ) {
  }

  async register(registerInput: CreateUserInput, context: CustomContext ) {
    const { password } = registerInput;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = await this.usersService.create({ ...registerInput, password: hashedPassword });
    if (!user) {
      throw new Error('error creating user');
    }
    this.SetAuthTokens.setTokens(user, context);
    return user;
  }

  async login(loginInput: LoginInput, context: CustomContext ) {
    const user = await this.validateUser(loginInput);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    this.SetAuthTokens.setTokens(user, context);
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


}
