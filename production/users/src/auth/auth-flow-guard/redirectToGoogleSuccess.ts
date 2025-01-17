import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../../domain/entities/user.entity";
import { TokenService } from "../../domain/domain-service/token.service";
import clientConfig from "../../infrastructure/config/client.config";
import { SetAuthTokens } from "./set-auth-tokens";

@Injectable()
export class RedirectToGoogleSuccess implements NestInterceptor {
  constructor(private setAuthService: TokenService,
              @Inject(clientConfig.KEY) private clientService: ConfigType<typeof clientConfig>,
              private setAuthTokens: SetAuthTokens) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const user = (request.user) as User;

        this.setAuthTokens.setTokens(user, response)
        return response.redirect(this.clientService.url + "/google-success?user=" + JSON.stringify(user) +
          (request.query.state ? ("&returnUrl=" + request.query.state) : ""));
      })
    );
  }
}
