import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenService } from "../../domain/domain-service/token.service";
import { Response } from "express";
import { accessTokenLife, getCookiesOptions, refreshTokenLife } from "@_config/auth";

@Injectable()
export class SetAuthTokens {
  constructor(private jwtService: JwtService,
              private configService: ConfigService,
              private setAuthService: TokenService) {
  }

  setTokens(user: Pick<User, "id" | "username" | "role">, response: Response) {
    const accessToken = this.setAuthService.generateToken(user, true);
    const refreshToken = this.setAuthService.generateToken(user, false);

    console.log(accessToken, refreshToken);
    const cookiesOptions = getCookiesOptions(this.configService.get("NODE_ENV"));
    response.cookie("accessToken", accessToken, {
      ...cookiesOptions,
      maxAge: accessTokenLife
    });

    response.cookie("refreshToken", refreshToken, {
      ...cookiesOptions,
      maxAge: refreshTokenLife
    });
  }
}