import { Module } from "@nestjs/common";
import { UsersRepositoryImpl } from "../../infrastructure/repositories/users.repository.impl";
import { UsersResolver } from "../resolvers/users.resolver";
import { PrismaModule } from "./prisma.module";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { NotificationsModule } from "./notifications.module";

@Module({
  providers: [UsersResolver, {
    provide: UsersRepository,
    useClass: UsersRepositoryImpl
  }],
  imports: [PrismaModule],
  exports: [UsersRepository]
})
export class UsersModule {
}
