import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@_shared/entities/jwt.entity";

interface Cookie {
  cookies: string[]
  cookie: any
}
@Injectable()
export class AuthContext {
  constructor(private configService: ConfigService,
              private jwtService: JwtService) {
  }

  async validate({ req, res }: {
    req: Request & Cookie
    res: Response & Cookie
  }) {

    let user: JwtPayload

    const resetAccessToken = () => {
      const refreshToken = req.cookies["refreshToken"];
      console.log('refreshToken', refreshToken);
      if (refreshToken) {
        user = this.jwtService.verify(refreshToken);
        console.log('user', user);
        const newAccessToken = this.jwtService.sign({
          sub: user.sub,
          role: user.role,
          username: user.username
        } as JwtPayload, {
          expiresIn: '15m'
        });
        console.log('new access token', newAccessToken)
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true, // Токен доступен только на сервере
          // secure: this.configService.get('NODE_ENV') === 'production',
          maxAge: 900000 // Время жизни куки (например, 1 час)
        });
      }
    }
    try {

      const accessToken = req.cookies["accessToken"];
      if (accessToken) {
        user = this.jwtService.verify(accessToken);
        console.log('user 1', user)
      } else {
        resetAccessToken()
      }

    } catch (e) {
      console.log(e)
      if (e instanceof Error && e.message.includes("expired")) {
        resetAccessToken()
      }
    }

    return { user };
  }
}