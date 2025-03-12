import { Injectable } from "@nestjs/common";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { DraftsRepository } from "../domain/repositories/drafts/drafts.repository";
import { UpdateDraftDto } from "../domain/dto/drafts/update-draft.dto";
import { Draft } from "../domain/entities/draft.entity";
import { VersionsRepository } from "../domain/repositories/versions/versions.repository";
import { Transaction } from "../domain/repositories/transaction";
import { CreateDraftInputService } from "./dto/crate-draft.input";
import { mapTopicsToTopicsDto } from "../domain/dto/topics/map-topics-to-topics.dto";
import { SearchRepository } from "../domain/repositories/posts/search.repository";
import { retryOperation } from "@_shared/utils/retryOperation";

@Injectable()
export class DraftsUseCase {
  constructor(
    private readonly draftsRepository: DraftsRepository,
    private readonly versionRepository: VersionsRepository,
    private readonly searchService: SearchRepository,
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

  async publishDraft(publishDraftInput: UpdateDraftDto) {
    const { id, userId, ...data } = publishDraftInput;
    const { topics, subTopics, version, postId, ...rest } = await this.draftsRepository.findOne({ id, userId });
    console.log("id", id);
    console.log("draft", rest);
    const draft = {
      title: rest.title,
      description: rest.description,
      body: rest.body,
      userId: rest.userId
    };
    const mappedTopics = {
      topics: topics && mapTopicsToTopicsDto(topics),
      subTopics: subTopics && mapTopicsToTopicsDto(subTopics)
    };

    if (version === 1) {
      const post = await this.postsRepository.create({
        ...draft,
        ...mappedTopics,
        ...data
      });
      console.log('post', post);
      try {
        await retryOperation(() => this.searchService.indexPost(post), 5, 500);
      } catch (e) {
        console.log(e);
        await this.postsRepository.remove({ id: post.id });
        throw new Error("Error indexing post");
      }

      try {
        await retryOperation(() => this.draftsRepository.remove({ id, userId }), 5, 500);
      } catch (e) {
        await this.searchService.deletePost(post.id);
        await this.postsRepository.remove({ id: post.id });
        throw new Error("Error removing post");
      }
      return post

    } else {
      const { id: dbId, isHidden, ...versionData } = await this.postsRepository.findOne({
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