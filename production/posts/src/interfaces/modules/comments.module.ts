import { Module } from '@nestjs/common';
import { CommentsService } from '../../infrastructure/comments/comments.service';
import { CommentsResolver } from '../resolvers/comments.resolver';
import { PrismaService } from "../../infrastructure/repositories/prismaDb/prisma.service";
import { PrismaModule } from "../prisma.module";

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [PrismaModule]
})
export class CommentsModule {}
