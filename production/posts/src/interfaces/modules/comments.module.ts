import { Module } from '@nestjs/common';
import { CommentsService } from '../../domain/domain_services/comments.service';
import { CommentsResolver } from '../resolvers/comments.resolver';
import { PrismaService } from "../../infrastructure/repositories/prismaDb/prisma.service";
import { PrismaModule } from "../prisma.module";
import { CommentsRepositoryImpl } from "../../infrastructure/repositories/comments.repository.impl";
import { COMMENTS_REPOSITORY_TOKEN } from "../../domain/repositories/comments/comments.repository";

@Module({
  providers: [CommentsResolver, CommentsService,
    {
      provide: COMMENTS_REPOSITORY_TOKEN, // Токен интерфейса
      useClass: CommentsRepositoryImpl,        // Реализация интерфейса
    }],
  imports: [PrismaModule]
})
export class CommentsModule {}
