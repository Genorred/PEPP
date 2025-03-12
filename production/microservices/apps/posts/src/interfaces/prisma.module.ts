import { Module } from "@nestjs/common";
import { PrismaService } from "../infrastructure/repository-impls/prismaDb/prisma.service";
import { Transaction } from "../domain/repositories/transaction";
import { TransactionImpl } from "../infrastructure/repository-impls/transaction.impl";
import { TopicsRepositoryImpl } from "../infrastructure/repository-impls/topics.repository.impl";

@Module({
  providers: [PrismaService, {
    provide: Transaction,
    useClass: TransactionImpl
  }, TopicsRepositoryImpl],
  exports: [PrismaService, Transaction]
})
export class PrismaModule {
}
