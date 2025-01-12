import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { GoogleController } from "./google.controller";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./google.strategy";
import { SetAuthCookieService } from "./set-auth-cookie.service";
import { ConfigModule, ConfigType } from "@nestjs/config";
import authConfig from "../config/auth.config";
import { SetAuthTokens } from "./auth-flow-guard/set-auth-tokens";
import { RedisModule } from "./redis.module";

@Module({
  imports: [UsersModule, PassportModule, RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: async (configService: ConfigType<typeof authConfig>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: "60m" }
      })
    })],
  controllers: [GoogleController],
  providers: [AuthService, AuthResolver, GoogleStrategy, SetAuthCookieService, SetAuthTokens,
  ]
})
export class AuthModule {
}
