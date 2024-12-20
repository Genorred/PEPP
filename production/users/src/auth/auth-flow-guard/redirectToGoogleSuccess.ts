import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../../users/entities/user.entity";
import { SetAuthCookieService } from "../set-auth-cookie.service";
import clientConfig from "../../config/client.config";

@Injectable()
export class RedirectToGoogleSuccess implements NestInterceptor {
  constructor(private setAuthService: SetAuthCookieService,
              @Inject(clientConfig.KEY) private clientService: ConfigType<typeof clientConfig>) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const user = (request.user) as User;

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
        return response.redirect(this.clientService.url + "/google-success?user=" + JSON.stringify(user) +
          (request.query.state ? ("&returnUrl=" + request.query.state) : ""));
      })
    );
  }
}
