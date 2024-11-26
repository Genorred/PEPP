import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { User } from "./posts/entities/user.entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import JSON from "graphql-type-json";
import NextjsEndpoint from "./config/nextjsEndpoint";
import { CacheModule } from "@nestjs/cache-manager";
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [ CacheModule.register({
    isGlobal: true,
  }),
    ConfigModule.forRoot({
      load: [NextjsEndpoint],
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
],
  providers: [PrismaService]})
export class AppModule {}
