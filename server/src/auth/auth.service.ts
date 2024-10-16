import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async register(registerInput: CreateUserInput) {
    const { password } = registerInput;
    const hashedPassword = bcrypt.hashSync(password, 12);
    try {
      const user = await this.usersService.create({ ...registerInput, password: hashedPassword });
      return this.getToken(user);
    } catch (e) {
      const { message } = e;
      if (message.includes('username'))
        throw new ConflictException('Username');
      if (message.includes('email'))
        throw new ConflictException('Email');
      throw e;
    }
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.getToken(user);
  }


  private async getToken(user: Partial<User>) {
    const { id, username, role } = user;
    const payload = { username, sub: id, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
