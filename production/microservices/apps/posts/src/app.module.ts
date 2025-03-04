import { Module } from "@nestjs/common";
import { PrismaModule } from "./interfaces/prisma.module";
import { PostsModule } from "./interfaces/modules/posts.module";
import { TopicsModule } from "./interfaces/modules/topics.module";
import { SearchModule } from "./interfaces/modules/search.module";
import { RedisModule } from "./interfaces/modules/redis.module";
import { GraphQLModuleInitializer } from "./interfaces/modules/graphql.module";
import { CommentsModule } from "./interfaces/modules/comments.module";
import { DraftsModule } from "./interfaces/modules/drafts.module";
import { VersionsModule } from "./interfaces/modules/versions.module";
import { SharedLoggerModule } from "@_shared/modules/logger-module";
import { PostsHealthModule } from "./interfaces/modules/posts.health.module";
import { ConfigModuleInitializer } from "./interfaces/modules/config.module";


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
    SharedLoggerModule,
    PostsHealthModule
  ]
})
export class AppModule {
}
