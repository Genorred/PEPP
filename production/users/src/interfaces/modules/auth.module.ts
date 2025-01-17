import { Module } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { UsersModule } from "./users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "../resolvers/auth.resolver";
import { GoogleController } from "../resolvers/google.controller";
import { PassportModule } from "@nestjs/passport";
import { GoogleUseCase } from "../../application/google.use-case";
import { TokenService } from "../../domain/domain-service/token.service";
import { ConfigModule, ConfigType } from "@nestjs/config";
import authConfig from "../../infrastructure/config/auth.config";
import { SetAuthTokens } from "../../auth/auth-flow-guard/set-auth-tokens";
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
  providers: [AuthService, AuthResolver, GoogleUseCase, TokenService, SetAuthTokens,
  ]
})
export class AuthModule {
}
