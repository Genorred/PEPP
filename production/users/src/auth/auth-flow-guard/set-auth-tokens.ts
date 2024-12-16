import { ArgumentsHost, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SetAuthCookieService } from "../set-auth-cookie.service";
import { ServerResponse } from "node:http";
import { CustomContext } from "@_shared/types/CustomContext";

@Injectable()
export class SetAuthTokens {
  constructor(private jwtService: JwtService,
              private configService: ConfigService,
              private setAuthService: SetAuthCookieService) {
  }

  setTokens(user: User, context: CustomContext ) {
    console.log(context.res);
    const response = context.res;

        const accessToken = this.setAuthService.generateToken(user, true);
        const refreshToken = this.setAuthService.generateToken(user, false);

        console.log(accessToken, refreshToken);
        response.cookie("accessToken", accessToken, {
          httpOnly: true, // Токен доступен только на сервере
          // secure: this.configService.get('NODE_ENV') === 'production',
          maxAge: 3600000 // Время жизни куки (например, 1 час)
        });

        response.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          // secure: this.configService.get('NODE_ENV') === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000 // Время жизни куки (например, 7 дней)
        });
  }
}