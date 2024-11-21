import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from "../prisma/prisma.module";
import { TopicsRepository } from "./topics.repository";

@Module({
  imports: [PrismaModule],
  providers: [PostsResolver, PostsService, TopicsRepository],
})
export class PostsModule {}
