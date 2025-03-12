import { Module } from "@nestjs/common";
import { VersionsResolver } from "../resolvers/versions.resolver";
import { VersionsRepositoryImpl } from "../../infrastructure/repository-impls/versions.repository.impl";
import { VersionsRepository } from "../../domain/repositories/versions/versions.repository";
import { PostsModule } from "./posts.module";
import { VersionsUseCase } from "../../application/versions.use-case";
import { PrismaModule } from "../prisma.module";
import { VersionIsHiddenService } from "../../domain/domain_services/version-is-hidden.service";
import { SearchModule } from "./search.module";

@Module({
  providers: [VersionsResolver, VersionsUseCase, VersionIsHiddenService, {
    provide: VersionsRepository,
    useClass: VersionsRepositoryImpl
  }],
  imports: [PostsModule, PrismaModule, SearchModule],
  exports: [VersionsRepository]
})

export class VersionsModule {
}
