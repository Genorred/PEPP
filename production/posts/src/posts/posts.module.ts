import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from "../prisma/prisma.module";
import { TopicsRepository } from "./topics.repository";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [PrismaModule, CacheModule.register()],
  providers: [PostsResolver, PostsService, TopicsRepository],
})
export class PostsModule {}
