import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthContext {
  constructor(private configService: ConfigService,
              private jwtService: JwtService) {
  }
  async validate ({req}: {req: Request}) {
    console.log("goal")
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if (authHeader) {
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]
      console.log(bearer === 'Bearer' || token)

      if (bearer === 'Bearer' || token) {
        const user = this.jwtService.verify(token);
        console.log(user)
        return {user}
      }

    }

    return {}
  }
}