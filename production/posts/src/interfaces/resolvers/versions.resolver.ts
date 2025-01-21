import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { FindByPostInput } from "../dto/versions/find-by-post.input";
import { FindOneVersionInput } from "../../domain/dto/versions/find-one-version.input";
import { Version } from "../../domain/entities/version.entity";
import { VersionsUseCase } from "../../application/versions.use-case";

@Resolver(() => Version)
export class VersionsResolver {
  constructor(private readonly versionsService: VersionsUseCase) {
  }

  @Query(() => [Version])
  findByPost(@Args("findByPostInput") findByPostInput: FindByPostInput): Promise<Version[]> {
    return this.versionsService.findByPost(findByPostInput);
  }

  @Query(() => [Version], { name: "version" })
  findOne(@Args("findOne") findOneVersion: FindOneVersionInput): Promise<Version> {
    return this.versionsService.findOne(findOneVersion);
  }
}
