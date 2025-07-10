import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from '../resolvers/auth.resolver';
import { GoogleController } from '../controllers/google.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleService } from '../../infrastructure/services/google.service';
import { TokenService } from '../../domain/domain-service/token.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from '../../infrastructure/config/auth.config';
import { RedisModule } from './redis.module';
import { AuthUseCase } from '../../application/auth.use-case';
import { TokenServiceImpl } from '../../infrastructure/services/token.service.impl';
import { NotificationsModule } from './notifications.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    RedisModule,
    NotificationsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: async (configService: ConfigType<typeof authConfig>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [GoogleController],
  providers: [
    AuthUseCase,
    AuthResolver,
    GoogleService,
    {
      provide: TokenService,
      useClass: TokenServiceImpl,
    },
  ],
})
export class AuthModule {}
