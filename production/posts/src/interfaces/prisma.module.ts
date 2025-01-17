import { Module } from "@nestjs/common";
import { PrismaService } from "../infrastructure/repositories/prismaDb/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {
}
