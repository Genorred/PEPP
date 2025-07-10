import googleConfig from '../config/google.config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';
import { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class GoogleService extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleConfig.KEY)
    private configService: ConfigType<typeof googleConfig>,
    private usersService: UsersRepository,
  ) {
    super({
      clientID: configService.clientID,
      clientSecret: configService.clientSecret,
      callbackURL: configService.callbackURL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
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

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    console.log(accessToken, refreshToken, profile, done);
    const user = {
      google_id: id,
      email: emails[0].value,
      username: `${name.givenName} ${name.familyName || ''}`.trimEnd(),
      img: photos[0].value,
    };

    let dbUser = await this.usersService.findOne({ email: user.email });
    console.log('dbUser', dbUser);
    if (!dbUser)
      try {
        dbUser = await this.usersService.create(user);
      } catch (err) {
        dbUser = await this.usersService.create({
          ...user,
          username: user.username + Math.random(),
        });
      }

    if (!dbUser)
      throw new UnauthorizedException('User could not be authenticated');
    done(null, dbUser);
  }
}
