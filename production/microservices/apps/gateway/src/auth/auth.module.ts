import { Module } from '@nestjs/common';
import { AuthContext } from './auth.context';
import { JwtModule } from '@nestjs/jwt';
import authConfig from '../config/authConfig';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RedisModule } from './redis.module';

@Module({
  imports: [
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: async (configService: ConfigType<typeof authConfig>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthContext, RedisModule],
  exports: [AuthContext],
})
export class AuthModule {}
