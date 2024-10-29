import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
// import {ConfigModule} from "@nestjs/config";
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import databaseConfig from "./config/database.config";
import googleConfig from "./config/google.config";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req, res }) => ({ req, res })
    }),
    ConfigModule.forRoot({
      load: [databaseConfig, googleConfig],
      expandVariables: true,
      cache: true,
      isGlobal: true,
      envFilePath: '.env.local'
    }),
PrismaModule,
    UsersModule,
    AuthModule,
    PostsModule,
],
  providers: [PrismaService]})
export class AppModule {}
