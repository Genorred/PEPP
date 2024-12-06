import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from "../prisma/prisma.module";
import { TopicsRepository } from "./topics.repository";
import { CacheModule } from "@nestjs/cache-manager";
import { PreferencesService } from "./preferences.service";
import { SearchModule } from "../search/search.module";

@Module({
  imports: [PrismaModule, SearchModule],
  providers: [PostsResolver, PostsService, TopicsRepository, PreferencesService],
})
export class PostsModule {}
