import { Args, Query } from "@nestjs/graphql";
import { Version } from "../domain/entities/version.entity";
import { FindByPostInput } from "../interfaces/dto/versions/find-by-post.input";
import { FindOneVersionDto } from "../domain/dto/versions/find-one-version.dto";
import { VersionsRepository } from "../domain/repositories/versions/versions.repository";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { VersionIsHiddenService } from "../domain/domain_services/version-is-hidden.service";
import { Transaction } from "../domain/repositories/transaction";
import { CreateVersionUseCaseDto } from "./dto/create-version-use-case.dto";
import { PostsUow } from "../domain/UoW/posts.uow";
import { Post } from "../domain/entities/post.entity";
import { SearchRepository } from "../domain/repositories/posts/search.repository";

@Injectable()
export class VersionsUseCase {
  constructor(
    private readonly versionsRepository: VersionsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly postsUow: PostsUow,
    private readonly versionIdHiddenService: VersionIsHiddenService,
    private readonly searchService: SearchRepository
  ) {
  }

  async create(createVersionInput: CreateVersionUseCaseDto) {
    const { postId, ...data } = createVersionInput;

    return await this.postsUow.run(async ({ postsRepository, versionsRepository }) => {
      const { id: dbId, isHidden, ...post } = await postsRepository.findOne({
        id: postId
      });
      const updatedPost = await postsRepository.update({
        id: postId,
        ...data,
        version: post.version + 1
      });
      if (!isHidden) {
        await this.searchService.updatePost(updatedPost);
      }
      await versionsRepository.create({ postId, ...post });
      return updatedPost
    });
  }

  async findByPost(findByPostInput: FindByPostInput): Promise<Version[]> {
    const { postId } = findByPostInput;
    const versions = await this.versionsRepository.findMany({ postId });
    const post = await this.postsRepository.findOne({ id: versions[0].postId });
    this.versionIdHiddenService.isHidden(post);
    return versions;
  }

  async findOne(findOneVersion: FindOneVersionDto): Promise<Version> {
    const version = await this.versionsRepository.findOne(findOneVersion);
    const post = await this.postsRepository.findOne({ id: version.postId });
    this.versionIdHiddenService.isHidden(post);
    return version;
  }
}