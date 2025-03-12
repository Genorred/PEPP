import { Module } from "@nestjs/common";
import { PostsResolver } from "../resolvers/posts.resolver";
import { PrismaModule } from "../prisma.module";
import { TopicsRepositoryImpl } from "../../infrastructure/repository-impls/topics.repository.impl";
import { PreferencesRepositoryImpl } from "../../infrastructure/repository-impls/preferences.repository.impl";
import { SearchModule } from "./search.module";
import { UserResolver } from "../resolvers/user.resolver";
import { ClientCacheRepository } from "../../domain/repositories/client.cache.repository";
import { ClientCacheRepositoryImpl } from "../../infrastructure/repository-impls/client.cache.repository.impl";
import { PostsUseCase } from "../../application/posts.use-case";
import { PostsRepositoryImpl } from "../../infrastructure/repository-impls/posts.repository.impl";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";
import { PostsSecurityCheckService } from "../../domain/domain_services/posts.security.check.service";
import { PreferencesRepository } from "../../domain/repositories/posts/preferenses.repository";
import { TopicsModule } from "./topics.module";
import { PostsUow } from "../../domain/repositories/UoW/posts.uow";
import { PostsUowImpl } from "../../infrastructure/services/posts.uow.impl";

@Module({
  imports: [
    PrismaModule,
    SearchModule,
    TopicsModule
  ],
  providers: [
    PostsResolver,
    PostsUseCase,
    PostsSecurityCheckService,
    TopicsRepositoryImpl,
    UserResolver,
    {
      provide: PreferencesRepository,
      useClass: PreferencesRepositoryImpl
    },
    {
      provide: PostsRepository,
      useClass: PostsRepositoryImpl
    },
    {
      provide: ClientCacheRepository,
      useClass: ClientCacheRepositoryImpl
    },
    {
      provide: PostsUow,
      useClass: PostsUowImpl
    }
  ],
  exports: [
    PostsRepository, PostsUow
  ]
})
export class PostsModule {
}
