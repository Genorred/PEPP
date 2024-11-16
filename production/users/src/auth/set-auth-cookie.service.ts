import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@shared/entities/jwt.entity";

@Injectable()
export class SetAuthCookieService {
  constructor(private jwtService: JwtService) {
  }
  generateToken(user: Partial<User>, isAccess: boolean) {
    const { id, username, role } = user;
    const payload: JwtPayload = { username, sub: id, role };
    return this.jwtService.sign(payload, {
      expiresIn: isAccess ? '15m' : '21d'
    });
  }

}