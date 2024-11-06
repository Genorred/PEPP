import { Module } from '@nestjs/common';
import { AuthContext } from "./auth.context";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../consts";
import authConfig from "../config/authConfig";
import { ConfigModule, ConfigType } from "@nestjs/config";

@Module({
  imports: [
   JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: async (configService: ConfigType<typeof authConfig>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '60m' },
      }),
    })
],
  providers: [AuthContext],
  exports: [AuthContext],
})
export class AuthModule {}