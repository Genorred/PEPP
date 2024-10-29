import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './consts';
import { AuthResolver } from './auth.resolver';
import { GoogleController } from "./google.controller";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./google.strategy";
import { SetAuthCookieService } from "./set-auth-cookie.service";

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),],
  controllers: [GoogleController],
  providers: [AuthService, AuthResolver, GoogleStrategy, SetAuthCookieService],
})
export class AuthModule {}
