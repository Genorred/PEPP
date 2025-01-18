import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { REDIS_CLIENT } from "../../interfaces/modules/redis.module";
import { RedisClientConnectionType } from "@keyv/redis";
import { TokenService } from "../../domain/domain-service/token.service";
import e, { CookieOptions, Response } from "express";
import { accessTokenLife, refreshTokenLife } from "@_config/auth";
import { ConfigService } from "@nestjs/config";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class TokenServiceImpl implements TokenService {
  cookiesOptions: CookieOptions

  constructor(private jwtService: JwtService,
              private configService: ConfigService,) {
    this.cookiesOptions = {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production"
    }
  }

  verify(token: string): Record<string, any> {
    return this.jwtService.verify(token);
  }

  generateToken(user: Partial<User>, isAccess: boolean) {
    const payload: JwtPayload = { username: user?.username, sub: user?.id, role: user?.role };
    return this.jwtService.sign(payload, {
      expiresIn: isAccess ? "15m" : "21d"
    });
  }

  setTokens(user: Pick<User, "id" | "username" | "role">, response: Response) {
    const accessToken = this.generateToken(user, true);
    const refreshToken = this.generateToken(user, false);

    console.log(accessToken, refreshToken);
    response.cookie("accessToken", accessToken, {
      ...this.cookiesOptions,
      maxAge: accessTokenLife
    });

    response.cookie("refreshToken", refreshToken, {
      ...this.cookiesOptions,
      maxAge: refreshTokenLife
    });
  }
  removeTokens(res: Response) {
    res.clearCookie("refreshToken", this.cookiesOptions);
    res.clearCookie("accessToken", this.cookiesOptions);
  }
}