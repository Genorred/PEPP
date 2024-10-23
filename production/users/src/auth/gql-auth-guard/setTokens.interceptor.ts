import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SetTokensInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService,
              private configService: ConfigService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        const user = (request.user || response.body) as User;

        const accessToken = this.generateToken(user, true);
        const refreshToken = this.generateToken(user, false);

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
        console.log("request", request)
        return response.redirect("http://localhost:3000" + request.query.state);
      })
    );
  }

  private async generateToken(user: Partial<User>, isAccess: boolean) {
    const { id, username, role } = user;
    const payload = { username, sub: id, role };
    return this.jwtService.sign(payload, {
      expiresIn: isAccess ? '15m' : '21d'
    });
  }
}