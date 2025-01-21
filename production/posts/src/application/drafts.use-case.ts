import { Injectable } from "@nestjs/common";
import { CreatePostInputService } from "../domain/dto/posts/create-post.input";
import { PrismaService } from "../infrastructure/repository-impls/prismaDb/prisma.service";
import { TopicsRepositoryImpl } from "../infrastructure/repository-impls/topics.repository.impl";
import { FindPostInput } from "../domain/dto/posts/find-post.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { UpdatePostInput } from "../domain/dto/posts/update-post.input";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { PublishDraftInputService } from "../domain/dto/drafts/publish-draft.input";
import { DraftsRepository } from "../domain/repositories/drafts/drafts.repository";
import { UpdateDraftInputService } from "../domain/dto/drafts/update-draft.input";
import { Post } from "../domain/entities/post.entity";
import { CreateDraftInputService } from "../domain/dto/drafts/create-draft.input";
import { Draft } from "../domain/entities/draft.entity";
import { FindDraftInputService } from "../domain/dto/drafts/find-draft.input";
import { VersionsRepository } from "../domain/repositories/versions/versions.repository";
import { Transaction } from "../domain/repositories/transaction";

@Injectable()
export class DraftsUseCase {
  constructor(
    private readonly draftsRepository: DraftsRepository,
    private readonly versionRepository: VersionsRepository,
    private readonly transaction: Transaction,
    private readonly postsRepository: PostsRepository
  ) {
  }

  async createDraft(input: CreateDraftInputService): Promise<Draft> {
    let version: number;
    if (input.postId) {
      const post = await this.postsRepository.findOne({ id: input.postId });
      version = post.version;
    }
    return this.draftsRepository.create({ version, ...input });
  }

  async publishDraft(publishDraftInput: UpdateDraftInputService) {
    const { id, userId, ...data } = publishDraftInput;
    const { topics, subTopics, ...draft } = await this.draftsRepository.findOne({ id, userId });
    const mappedTopics = [
      ...topics.map(topic => topic.title),
      ...subTopics.map(topic => topic.title)
    ];

    if (draft.version === 1) {
      return (await this.transaction.exec([
        this.postsRepository.create({
          ...draft,
          ...mappedTopics,
          ...data
        }),
        this.draftsRepository.remove({ id, userId })
      ]))[0];
    } else {
      const version = await this.postsRepository.findOne({
        id: draft.postId
      });
      return (await this.transaction.exec([
        this.postsRepository.update({
          id: draft.postId,
          ...draft,
          ...mappedTopics,
          ...data
        }),
        this.versionRepository.create({ postId: draft.postId, ...version }),
        this.draftsRepository.remove({ id, userId })
      ]))[0];
    }
  }
}