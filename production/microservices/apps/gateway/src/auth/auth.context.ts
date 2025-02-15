import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { Cookie } from "@_shared/types/Cookie";
import { RedisClientConnectionType } from "@keyv/redis";
import { REDIS_CLIENT } from "./redis.module";
import { CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import {Response, Request} from "express";
import { accessTokenLife, getCookiesOptions } from "@_shared/consts/auth"

@Injectable()
export class AuthContext {
  constructor(private configService: ConfigService,
              private jwtService: JwtService,
              @Inject(REDIS_CLIENT) private redisClient: RedisClientConnectionType) {
  }

  async validate({ req, res }: {
    req: Request & Cookie
    res: Response & Cookie
  }) {
    let user: CurrentUserI;
    const cookiesOptions = getCookiesOptions(this.configService.get("NODE_ENV"));

    const resetAccessToken = async () => {
      const refreshToken = req.cookies["refreshToken"];
      if (refreshToken) {
        const isBlacklisted = await this.redisClient.exists(refreshToken);
        if (!isBlacklisted) {
          console.log("refreshToken", refreshToken);
          user = this.jwtService.verify(refreshToken);
          console.log("user", user);
          const newAccessToken = this.jwtService.sign({
            sub: user.sub,
            role: user.role,
            username: user.username
          } as JwtPayload, {
            expiresIn: accessTokenLife
          });
          console.log("new access token", newAccessToken);
          res.cookie("accessToken", newAccessToken, {
            ...cookiesOptions,
            maxAge: accessTokenLife
          });
        }
      }
    };
    try {

      const accessToken = req.cookies["accessToken"];
      if (accessToken) {
        user = this.jwtService.verify(accessToken);
        console.log("user 1", user);
      } else {
        void resetAccessToken();
      }

    } catch (e) {
      console.log(e);
      if (e instanceof TokenExpiredError) {
        void resetAccessToken();
      }
    }
    console.log(user);

    // const cookiesOptions = {
    //   httpOnly: true, // Токен доступен только на сервере
    //   secure: this.configService.get('NODE_ENV') === 'production',
    // }
    // res.clearCookie("refreshToken", cookiesOptions);
    return { user, cookies: req.cookies };
  }
}