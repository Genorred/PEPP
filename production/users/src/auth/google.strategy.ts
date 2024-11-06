import googleConfig from "../config/google.config";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigType } from "@nestjs/config";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleConfig.KEY) private configService: ConfigType<typeof googleConfig>,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.clientID,                               // Ваш clientID
      clientSecret: configService.clientSecret,                       // Ваш clientSecret
      callbackURL: configService.callbackURL,                         // URL, куда вернется Google
      scope: ['profile', 'email'],                                    // Запрашиваемые scope'ы
      passReqToCallback: true
    });
  }

  async authenticate(req) {
    if (req.query.returnUrl) {
      // /auth
      return super.authenticate(req, {
        state: req.query.returnUrl,
      });
    }
    // /auth/callback
    return super.authenticate(req);
  }

  async validate(req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails, photos } = profile;
    console.log(accessToken, refreshToken, profile, done)
    const user = {
      google_id: id,
      email: emails[0].value,
      username: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    await this.usersService.create(user).catch(err => {})
    done(null, user);
  }
}
