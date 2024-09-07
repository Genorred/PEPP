import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
// import {ConfigModule} from "@nestjs/config";
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '../.env.development'
    // }),
  //   TypeOrmModule.forRoot({
  //   type: 'postgres',
  //   host: process.env.POSTGRES_HOST,
  //   port: Number(process.env.DB_PORT),
  //   username: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB,
  //   entities: [],
  //   synchronize: process.env.NODE_ENV!=='production',
  //   autoLoadEntities: process.env.NODE_ENV!=='production'
  // }),],
  // controllers: [AppController],
  // providers: [AppService],
PrismaModule],
  providers: [PrismaService]})
export class AppModule {}
