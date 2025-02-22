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
import { SharedLoggerModule } from "@_shared/modules/logger-module";
import redisConfig from "./infrastructure/config/redis.config";
import { HealthModule } from "@_shared/modules/health.module";
import { NotificationsModule } from "./interfaces/modules/notifications.module";
import { UsersHealthModule } from "./interfaces/modules/users.health.module";
import { ConfigModuleInitializer } from "./interfaces/modules/config.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      },
      context: ({ req, res }) => ({ req, res })
    }),
    ConfigModuleInitializer,
    SharedLoggerModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
    NotificationsModule,
    UsersHealthModule
  ],
  providers: [PrismaService]
})
export class AppModule {
}
