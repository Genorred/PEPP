import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigType } from "@nestjs/config";
import { PostsModule } from './posts/posts.module';
import { User } from "./posts/entities/user.entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import JSON from "graphql-type-json";
import NextjsEndpoint from "./config/nextjsEndpoint";
import { CacheModule } from "@nestjs/cache-manager";
import { TopicsModule } from './topics/topics.module';
import { SearchModule } from './search/search.module';
import elasticDb from "./config/elasticDb";
import redisConfig from "./config/redis";
import { redisStore } from "cache-manager-redis-store";
import { hosts } from "@_config/hosts";

@Module({
  imports: [ SearchModule, CacheModule.register({
    isGlobal: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigType<typeof redisConfig>) => {
      const store = await redisStore({
        socket: {
          host: hosts.redis,
          port: 6379,
        },
      });
      return {
        store: () => store,
      };
    },
    inject: [redisConfig.KEY],
  }),
    ConfigModule.forRoot({
      load: [NextjsEndpoint, elasticDb, redisConfig],
      expandVariables: true,
      cache: true,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      },
      resolvers: { JSON },
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
PrismaModule,
    PostsModule,
    TopicsModule,
    SearchModule,
],
  providers: [PrismaService]})
export class AppModule {}
