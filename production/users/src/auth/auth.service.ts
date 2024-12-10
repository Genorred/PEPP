import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "./dto/login.input";
import * as bcrypt from "bcrypt";
import { CreateUserInput } from "../users/dto/create-user.input";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  register(registerInput: CreateUserInput) {
    const { password } = registerInput;
    const hashedPassword = bcrypt.hashSync(password, 12);
    return this.usersService.create({ ...registerInput, password: hashedPassword });
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async validateUser(loginInput: LoginInput) {
    const { password, email } = loginInput;

    const user = await this.usersService.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


}
