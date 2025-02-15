import { Module } from "@nestjs/common";
import { PrismaModule } from "./interfaces/prisma.module";
import { PostsModule } from "./interfaces/modules/posts.module";
import { TopicsModule } from "./interfaces/modules/topics.module";
import { SearchModule } from "./interfaces/modules/search.module";
import { RedisModule } from "./interfaces/modules/redis.module";
import { ConfigModuleInitializer } from "./infrastructure/config/index.module";
import { GraphQLModuleInitializer } from "./interfaces/modules/graphql.module";
import { CommentsModule } from './interfaces/modules/comments.module';
import { DraftsModule } from './interfaces/modules/drafts.module';
import { VersionsModule } from './interfaces/modules/versions.module';
import { LoggerOptions } from "@_shared/modules/logger-module";
import { LoggerModule } from "nestjs-pino";
import { HealthModule } from "@_shared/modules/health.module";


@Module({
  imports: [
    SearchModule,
    ConfigModuleInitializer,
    GraphQLModuleInitializer,
    PrismaModule,
    PostsModule,
    TopicsModule,
    SearchModule,
    RedisModule,
    CommentsModule,
    DraftsModule,
    VersionsModule,
    LoggerModule.forRoot(LoggerOptions),
    HealthModule
  ]
})
export class AppModule {
}
