import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SetAuthCookieService {
  constructor(private jwtService: JwtService) {
  }
  async generateToken(user: Partial<User>, isAccess: boolean) {
    const { id, username, role } = user;
    const payload = { username, sub: id, role };
    return this.jwtService.sign(payload, {
      expiresIn: isAccess ? '15m' : '21d'
    });
  }

}