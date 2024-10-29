import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../../users/entities/user.entity";
import { SetAuthCookieService } from "../set-auth-cookie.service";

@Injectable()
export class RedirectToGoogleSuccess implements NestInterceptor {
  constructor(private setAuthService: SetAuthCookieService) {
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const user = (request.user) as User;

        const accessToken = this.setAuthService.generateToken(user, true);
        const refreshToken = this.setAuthService.generateToken(user, false);

        console.log(accessToken, refreshToken)
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
        return response.redirect("http://localhost:3000/google-success?user=" + JSON.stringify(user) +
          (request.query.state ? ("&returnUrl=" + request.query.state) : ''));
      })
    );
  }
}
