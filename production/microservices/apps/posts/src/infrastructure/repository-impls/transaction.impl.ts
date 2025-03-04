import { Prisma } from ".prisma/client";
import { Transaction } from "../../domain/repositories/transaction";
import { PrismaService } from "./prismaDb/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionImpl implements Transaction {
  constructor(
    private readonly prismaService: PrismaService
  ) {
  }

  exec<T extends readonly Promise<any>[]>(arg: [...T]) {
    console.log(this.prismaService);
    return this.prismaService.$transaction(arg as Prisma.PrismaPromise<any>[]) as Promise<{ [K in keyof T]: Awaited<T[K]> }>;
  }
}