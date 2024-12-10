import { Module } from "@nestjs/common";
import { PrismaModule } from "./domain/kernel/prisma/prisma.module";
import { PostsModule } from "./infrastructure/posts/posts.module";
import { TopicsModule } from "./infrastructure/topics/topics.module";
import { SearchModule } from "./infrastructure/search/search.module";
import { RedisModule } from "./domain/kernel/redis.module";
import { ConfigModuleInitializer } from "./infrastructure/config/index.module";
import { GraphQLModuleInitializer } from "./infrastructure/graphql/graphql.module";

@Module({
  imports: [
    SearchModule,
    ConfigModuleInitializer,
    GraphQLModuleInitializer,
    PrismaModule,
    PostsModule,
    TopicsModule,
    SearchModule,
    RedisModule
  ]
})
export class AppModule {
}
