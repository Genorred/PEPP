import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import googleConfig from "./config/google.config";
import authConfig from "./config/auth.config";
import clientConfig from "./config/client.config";
import { LoggerModule } from "nestjs-pino";
import { LoggerOptions } from "@_shared/modules/logger-module";
import { RedisModule } from "./auth/redis.module";
import redisConfig from "./config/redis.config";

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
  ],
  providers: [PrismaService]
})
export class AppModule {
}
