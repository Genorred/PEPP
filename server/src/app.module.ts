import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
// import {ConfigModule} from "@nestjs/config";
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),  // Code-first approach
    }),
    ConfigModule.forRoot({
      envFilePath: '../.env'
    }),
PrismaModule,
    UsersModule],
  providers: [PrismaService]})
export class AppModule {}
