import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindByPostInput } from '../dto/versions/find-by-post.input';
import { Version } from '../../domain/entities/version.entity';
import { VersionsUseCase } from '../../application/versions.use-case';
import { Post } from '../../domain/entities/post.entity';
import { CurrentUser, CurrentUserI } from '@_shared/auth-guard/CurrentUser';
import useAuth from '@_shared/auth-guard/useAuth';
import { FindOneVersionInput } from '../dto/versions/find-one-version.input';
import { CreateVersionInput } from '../dto/versions/create-version.input';

@Resolver(() => Version)
export class VersionsResolver {
  constructor(private readonly versionsService: VersionsUseCase) {}

  @useAuth()
  @Mutation(() => Post)
  createVersion(
    @Args('createVersionInput') createVersionInput: CreateVersionInput,
    @CurrentUser() user: CurrentUserI,
  ): Promise<Post> {
    return this.versionsService.create({
      ...createVersionInput,
      userId: user?.sub,
    });
  }

  @Query(() => [Version])
  findByPost(
    @Args('findVersionByPostInput') findByPostInput: FindByPostInput,
  ): Promise<Version[]> {
    return this.versionsService.findByPost(findByPostInput);
  }

  @Query(() => [Version], { name: 'version' })
  findOne(
    @Args('findVersionInput') findOneVersion: FindOneVersionInput,
  ): Promise<Version> {
    return this.versionsService.findOne(findOneVersion);
  }
}
