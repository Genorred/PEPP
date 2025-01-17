import { Inject, Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { REDIS_CLIENT } from "../../interfaces/modules/redis.module";
import { RedisClientConnectionType } from "@keyv/redis";
import { TokenService } from "../../domain/domain-service/token.service";

@Injectable()
export class TokenServiceImpl implements TokenService {
  constructor(private jwtService: JwtService) {
  }

  generateToken(user: Partial<User>, isAccess: boolean) {
    const payload: JwtPayload = { username: user?.username, sub: user?.id, role: user?.role };
    return this.jwtService.sign(payload, {
      expiresIn: isAccess ? "15m" : "21d"
    });
  }

}