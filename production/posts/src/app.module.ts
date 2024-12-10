import { Module } from "@nestjs/common";
import { PrismaService } from "./domain/kernel/prisma/prisma.service";
import { PrismaModule } from "./domain/kernel/prisma/prisma.module";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { PostsModule } from "./infrastructure/posts/posts.module";
import { User } from "./domain/entities/user.entity";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import JSON from "graphql-type-json";
import NextjsEndpoint from "./infrastructure/config/nextjsEndpoint";
import { TopicsModule } from "./infrastructure/topics/topics.module";
import { SearchModule } from "./infrastructure/search/search.module";
import elasticDb from "./infrastructure/config/elasticDb";
import redisConfig from "./infrastructure/config/redis";
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
