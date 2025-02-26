import { Injectable } from "@nestjs/common";
import { CreatePostServiceDto } from "../domain/dto/posts/create-post.dto";
import { PrismaService } from "../infrastructure/repository-impls/prismaDb/prisma.service";
import { TopicsRepositoryImpl } from "../infrastructure/repository-impls/topics.repository.impl";
import { FindPostDto } from "../domain/dto/posts/find-post.dto";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { UpdatePostDto } from "../domain/dto/posts/update-post.dto";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { PublishDraftInputService } from "../domain/dto/drafts/publish-draft.input";
import { DraftsRepository } from "../domain/repositories/drafts/drafts.repository";
import { UpdateDraftInputService } from "../domain/dto/drafts/update-draft.input";
import { Post } from "../domain/entities/post.entity";
import { Draft } from "../domain/entities/draft.entity";
import { FindDraftInputService } from "../domain/dto/drafts/find-draft.input";
import { VersionsRepository } from "../domain/repositories/versions/versions.repository";
import { Transaction } from "../domain/repositories/transaction";
import { CreateDraftInputService } from "./dto/crate-draft.input";
import { mapTopicsToTopicsDto } from "../domain/dto/topics/map-topics-to-topics.dto";
import { Field } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";

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
    let version: number = 0;
    if (input.postId) {
      const post = await this.postsRepository.findOne({ id: input.postId });
      version = post.version;
    }
    return this.draftsRepository.create({ version: version + 1, ...input });
  }

  async publishDraft(publishDraftInput: UpdateDraftInputService) {
    const { id, userId, ...data } = publishDraftInput;
    const { topics, subTopics, version, postId, ...rest } = await this.draftsRepository.findOne({ id, userId });
    console.log('id', id);
    console.log('draft', rest);
    const draft = {
      title: rest.title,
      description: rest.description,
      body: rest.body,
      userId: rest.userId
    }
    const mappedTopics = [
      ...topics ? mapTopicsToTopicsDto(topics) : [],
      ...subTopics ? mapTopicsToTopicsDto(subTopics) : []
    ];

    if (version === 1) {
      return (await this.transaction.exec([
        this.postsRepository.create({
          ...draft,
          ...mappedTopics,
          ...data
        }),
        this.draftsRepository.remove({ id, userId })
      ]))[0];
    } else {
      const { id: dbId, isHidden, ...versionData} = await this.postsRepository.findOne({
        id: postId
      });
      return (await this.transaction.exec([
        this.postsRepository.update({
          id: postId,
          ...draft,
          ...mappedTopics,
          ...data,
          version: version + 1
        }),
        this.versionRepository.create({ postId: postId, ...versionData }),
        this.draftsRepository.remove({ id, userId })
      ]))[0];
    }
  }
}