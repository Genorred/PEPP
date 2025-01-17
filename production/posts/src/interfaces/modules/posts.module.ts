import { Module } from "@nestjs/common";
import { PostsService } from "../../infrastructure/posts/posts.service";
import { PostsResolver } from "../resolvers/posts.resolver";
import { PrismaModule } from "../prisma.module";
import { TopicsRepository } from "../../infrastructure/repositories/prismaDb/topics/topics.repository";
import { PreferencesRepository } from "../../infrastructure/repositories/redis/preferences.repository";
import { SearchModule } from "./search.module";
import { UserResolver } from "../resolvers/user.resolver";

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
