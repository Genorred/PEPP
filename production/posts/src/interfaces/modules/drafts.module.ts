import { Module } from "@nestjs/common";
import { DraftsResolver } from "../resolvers/drafts.resolver";
import { DraftsUseCase } from "../../application/drafts.use-case";
import { DraftsRepository } from "../../domain/repositories/drafts/drafts.repository";
import { DraftsRepositoryImpl } from "../../infrastructure/repository-impls/drafts.repository.impl";
import { PostsModule } from "./posts.module";
import { TopicsModule } from "./topics.module";
import { PrismaModule } from "../prisma.module";
import { VersionsModule } from "./versions.module";

@Module({
  providers: [DraftsResolver, DraftsUseCase, {
    provide: DraftsRepository,
    useClass: DraftsRepositoryImpl
  }],
  imports: [PostsModule, TopicsModule, TopicsModule, VersionsModule, PrismaModule],
})
export class DraftsModule {
}
