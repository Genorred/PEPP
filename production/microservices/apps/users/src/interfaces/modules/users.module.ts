import { Module } from "@nestjs/common";
import { UsersRepositoryImpl } from "../../infrastructure/repositories/users.repository.impl";
import { UsersResolver } from "../resolvers/users.resolver";
import { PrismaModule } from "./prisma.module";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { UserUseCase } from "../../application/user.use-case";

@Module({
  providers: [UsersResolver, UserUseCase, {
    provide: UsersRepository,
    useClass: UsersRepositoryImpl
  }],
  imports: [PrismaModule],
  exports: [UsersRepository]
})
export class UsersModule {
}
