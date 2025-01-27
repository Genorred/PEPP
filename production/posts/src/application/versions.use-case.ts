import { Args, Query } from "@nestjs/graphql";
import { Version } from "../domain/entities/version.entity";
import { FindByPostInput } from "../interfaces/dto/versions/find-by-post.input";
import { FindOneVersionInput } from "../domain/dto/versions/find-one-version.input";
import { VersionsRepository } from "../domain/repositories/versions/versions.repository";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { VersionIsHiddenService } from "../domain/domain_services/version-is-hidden.service";
import { Transaction } from "../domain/repositories/transaction";
import { CreateVersionInput } from "./dto/create-version.input";

@Injectable()
export class VersionsUseCase {
  constructor(
    private readonly versionsRepository: VersionsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly transaction: Transaction,
    private readonly versionIdHiddenService: VersionIsHiddenService
  ) {
  }

  async create(createVersionInput: CreateVersionInput) {
    const { postId, ...data } = createVersionInput;
    const {id: dbId, isHidden, ...post} = await this.postsRepository.findOne({
      id: postId
    });
    return (await this.transaction.exec([
      this.postsRepository.update({
        id: postId,
        ...data,
        version: post.version + 1
      }),
      this.versionsRepository.create({ postId, ...post })
    ]))[0];
  }

  async findByPost(findByPostInput: FindByPostInput): Promise<Version[]> {
    const { postId } = findByPostInput;
    const versions = await this.versionsRepository.findMany({ postId });
    const post = await this.postsRepository.findOne({ id: versions[0].postId });
    this.versionIdHiddenService.isHidden(post);
    return versions;
  }

  async findOne(findOneVersion: FindOneVersionInput): Promise<Version> {
    const version = await this.versionsRepository.findOne(findOneVersion);
    const post = await this.postsRepository.findOne({ id: version.postId });
    this.versionIdHiddenService.isHidden(post);
    return version;
  }
}