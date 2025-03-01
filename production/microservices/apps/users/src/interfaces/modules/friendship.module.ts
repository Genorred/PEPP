import { Module } from "@nestjs/common";
import { UsersRepositoryImpl } from "../../infrastructure/repositories/users.repository.impl";
import { UsersResolver } from "../resolvers/users.resolver";
import { PrismaModule } from "./prisma.module";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { NotificationsModule } from "./notifications.module";
import { UserUseCase } from "../../application/user.use-case";
import { FriendshipResolver } from "../resolvers/friendship.resolver";
import { FriendshipUseCase } from "../../application/friendship.use-case";
import { FriendshipRepository } from "../../domain/repositories/friendship.repository";
import { FriendshipRepositoryImpl } from "../../infrastructure/repositories/friendship.repository.impl";
import { UserLoader } from "../batchers/users.batcher";
import { UsersModule } from "./users.module";

@Module({
  providers: [FriendshipResolver, FriendshipUseCase, UserLoader, {
    provide: FriendshipRepository,
    useClass: FriendshipRepositoryImpl
  }],
  imports: [PrismaModule, UsersModule],
})
export class FriendshipModule {
}
