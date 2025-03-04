import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { TokenService } from "../../domain/domain-service/token.service";
import { CookieOptions, Response } from "express";
import { accessTokenLife, getCookiesOptions, refreshTokenLife } from "@_shared/consts/auth";
import { ConfigService } from "@nestjs/config";
import { GenerateTokenDto } from "../../domain/domain-service/dto/generate-token.dto";
import { GenerateUserCredentialsTokenDto } from "../../domain/domain-service/dto/generate-user-credentials-token.dto";

@Injectable()
export class TokenServiceImpl implements TokenService {
  cookiesOptions: CookieOptions;

  constructor(private jwtService: JwtService,
              private configService: ConfigService) {
    this.cookiesOptions = getCookiesOptions(this.configService.get("NODE_ENV"));
  }

  verify(token: string): Record<string, any> {
    return this.jwtService.verify(token);
  }

  generateToken(user: GenerateTokenDto, isAccess?: boolean) {
    const payload: JwtPayload = { sub: user?.id, role: user?.role };
    return this.jwtService.sign(payload, {
      expiresIn: isAccess ? "15m" : "21d"
    });
  }

  generateUserCredentialsToken(user: GenerateUserCredentialsTokenDto) {
    const payload = { username: user?.username, password: user?.password, email: user?.email };
    return this.jwtService.sign(payload, {
      expiresIn: "15m"
    });
  }

  setTokens(user: GenerateTokenDto, response: Response) {
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