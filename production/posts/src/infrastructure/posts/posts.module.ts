import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsResolver } from "./posts.resolver";
import { PrismaModule } from "../../domain/kernel/prisma/prisma.module";
import { TopicsRepository } from "../../domain/repositories/db/topics.repository";
import { CacheModule } from "@nestjs/cache-manager";
import { PreferencesRepository } from "../../domain/repositories/elastic/preferences.repository";
import { SearchModule } from "../search/search.module";
import { ConfigModule, ConfigType } from "@nestjs/config";
import redisConfig from "../config/redis";
import KeyvRedis, { Keyv } from "@keyv/redis";
import { UserResolver } from "./user.resolver";

@Module({
  imports: [
    PrismaModule,
    SearchModule
  ],
  providers: [
    PostsResolver,
    PostsService,
    TopicsRepository,
    PreferencesRepository,
    UserResolver
  ]
})
export class PostsModule {
}
