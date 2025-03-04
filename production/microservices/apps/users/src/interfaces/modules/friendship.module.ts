import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma.module";
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
  imports: [PrismaModule, UsersModule]
})
export class FriendshipModule {
}
