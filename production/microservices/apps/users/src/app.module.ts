import { Module } from "@nestjs/common";
import { PrismaService } from "./infrastructure/repositories/prismaDb/prisma.service";
import { PrismaModule } from "./interfaces/modules/prisma.module";
import { UsersModule } from "./interfaces/modules/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./interfaces/modules/auth.module";
import googleConfig from "./infrastructure/config/google.config";
import authConfig from "./infrastructure/config/auth.config";
import clientConfig from "./infrastructure/config/client.config";
import { LoggerModule } from "nestjs-pino";
import { LoggerOptions } from "@_shared/modules/logger-module";
import { RedisModule } from "./interfaces/modules/redis.module";
import redisConfig from "./infrastructure/config/redis.config";
import { HealthModule } from "@_shared/modules/health.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      },
      context: ({ req, res }) => ({ req, res })
    }),
    ConfigModule.forRoot({
      load: [googleConfig, authConfig, clientConfig, redisConfig],
      expandVariables: true,
      cache: true,
      isGlobal: true
    }),
    LoggerModule.forRoot(LoggerOptions),
    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule
  ],
  providers: [PrismaService]
})
export class AppModule {
}
