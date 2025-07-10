import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../interfaces/graphql-entities/user.graphql-entity';
import { TokenService } from '../../domain/domain-service/token.service';
import clientConfig from '../config/client.config';

@Injectable()
export class RedirectToGoogleSuccessInterceptor implements NestInterceptor {
  constructor(
    private tokenService: TokenService,
    @Inject(clientConfig.KEY)
    private clientService: ConfigType<typeof clientConfig>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const user = request.user as User;

        this.tokenService.setTokens(user, response);
        return response.redirect(
          this.clientService.url +
            '/google-success?user=' +
            JSON.stringify(user) +
            (request.query.state ? '&returnUrl=' + request.query.state : ''),
        );
      }),
    );
  }
}
