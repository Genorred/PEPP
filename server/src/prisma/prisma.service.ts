import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
console.log(process.env.SERVER_PORT);
@Injectable()
export class PrismaService extends PrismaClient {


}