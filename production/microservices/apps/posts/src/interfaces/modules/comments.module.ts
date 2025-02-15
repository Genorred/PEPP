import { Module } from '@nestjs/common';
import { CommentsUseCase } from '../../application/comments.use-case';
import { CommentsResolver } from '../resolvers/comments.resolver';
import { PrismaService } from "../../infrastructure/repository-impls/prismaDb/prisma.service";
import { PrismaModule } from "../prisma.module";
import { CommentsRepositoryImpl } from "../../infrastructure/repository-impls/comments.repository.impl";
import { COMMENTS_REPOSITORY_TOKEN, CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { PostsModule } from "./posts.module";

@Module({
  providers: [CommentsResolver, CommentsUseCase,
    {
      provide: CommentsRepository, // Токен интерфейса
      useClass: CommentsRepositoryImpl,        // Реализация интерфейса
    }],
  imports: [PrismaModule, PostsModule]
})
export class CommentsModule {}
