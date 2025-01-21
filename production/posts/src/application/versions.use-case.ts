import { Args, Query } from "@nestjs/graphql";
import { Version } from "../domain/entities/version.entity";
import { FindByPostInput } from "../interfaces/dto/versions/find-by-post.input";
import { FindOneVersionInput } from "../domain/dto/versions/find-one-version.input";
import { VersionsRepository } from "../domain/repositories/versions/versions.repository";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { ForbiddenException } from "@nestjs/common";
import { VersionIsHiddenService } from "../domain/domain_services/version-is-hidden.service";

export class VersionsUseCase {
  constructor(
    private readonly versionsRepository: VersionsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly versionIdHiddenService: VersionIsHiddenService
  ) {
  }

  async findByPost(@Args("findByPostInput") findByPostInput: FindByPostInput): Promise<Version[]> {
    const { postId } = findByPostInput;
    const versions = await this.versionsRepository.findMany({ postId });
    const post = await this.postsRepository.findOne({ id: versions[0].postId });
    this.versionIdHiddenService.isHidden(post)
    return versions;
  }

  async findOne(@Args("findOne") findOneVersion: FindOneVersionInput): Promise<Version> {
    const version = await this.versionsRepository.findOne(findOneVersion);
    const post = await this.postsRepository.findOne({ id: version.postId });
    this.versionIdHiddenService.isHidden(post)
    return version
  }
}