import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Post } from '../../domain/entities/post.entity';
import { User } from '../../domain/entities/user.entity';
import { CurrentUser, CurrentUserI } from '@_shared/auth-guard/CurrentUser';
import UseAuth from '@_shared/auth-guard/useAuth';
import useAuth from '@_shared/auth-guard/useAuth';
import { Inject } from '@nestjs/common';
import FRONTEND_SERVER from '../../infrastructure/config/frontend-server';
import { ConfigType } from '@nestjs/config';
import { Recommendations } from '../dto/posts/output/recommendations.output';
import { PostsUseCase } from '../../application/posts.use-case';
import { PostsRepository } from '../../domain/repositories/posts/posts.repository';
import { FindUserPostsInput } from '../dto/posts/find-user-posts-input';
import { FindPostInput } from '../dto/posts/find-post.input';
import { CreatePostInput } from '../dto/posts/create-post.input';
import { FindAllPostsInput } from '../dto/posts/_nextjs_find-posts.input';
import { RemovePostInput } from '../dto/posts/remove-post.input';
import { FindAlgorithmPostsInput } from '../dto/posts/find-algorithm-posts.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsUseCase,
    private readonly postsRepository: PostsRepository,
    @Inject(FRONTEND_SERVER.KEY)
    private readonly configService: ConfigType<typeof FRONTEND_SERVER>,
  ) {}

  @Mutation(() => Post)
  @UseAuth()
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: CurrentUserI,
  ) {
    return this.postsService.create({ ...createPostInput, userId: user.sub });
  }

  @Query(() => Recommendations, { name: 'userPosts' })
  findUserPosts(
    @Args('findUserPostsInput') findUserPostsInput: FindUserPostsInput,
  ) {
    return this.postsService.findUserPosts(findUserPostsInput);
  }

  @Query(() => Recommendations, { name: 'postsRecommendations' })
  recommendations(
    @Args('postRecommendationsInput')
    findAlgorithmInput: FindAlgorithmPostsInput,
    @CurrentUser() user: CurrentUserI,
  ) {
    return this.postsService.recommendations({
      ...findAlgorithmInput,
      userId: user?.sub,
    });
  }

  @Query(() => Post, { name: 'post' })
  findOne(
    @Args('findPostInput') findPostInput: FindPostInput,
    @CurrentUser() user: CurrentUserI,
  ) {
    return this.postsService.findOne({ ...findPostInput, userId: user?.sub });
  }

  // @useAuth()
  // @Mutation(() => Post)
  // async updatePost(@Args("updatePostInput") updatePostInput: UpdatePostDto, @CurrentUser() user: CurrentUserI) {
  //   return this.postsService.update({ ...updatePostInput, userId: user?.sub });
  // }

  @useAuth()
  @Mutation(() => Post, { name: 'hide' })
  hide(@Args('hidePostInput') id: number, @CurrentUser() user: CurrentUserI) {
    return this.postsService.hide(id, user?.sub);
  }

  @useAuth()
  @Mutation(() => Post, { name: 'expose' })
  expose(
    @Args('exposePostInput') id: number,
    @CurrentUser() user: CurrentUserI,
  ) {
    return this.postsService.expose(id, user?.sub);
  }

  @useAuth()
  @Mutation(() => Post)
  removePost(
    @Args('removePostInput') input: RemovePostInput,
    @CurrentUser() user: CurrentUserI,
  ) {
    return this.postsService.remove({ ...input, userId: user?.sub });
  }

  @Query(() => [Post], { name: 'allPosts' })
  findAll(@Args('findAllPostsInput') findAllPostsInput: FindAllPostsInput) {
    return this.postsService.findAll(findAllPostsInput);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: 'User', id: post.userId };
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Post> {
    return this.postsRepository.findOne({
      id: reference.id,
      isHidden: false,
    });
  }
}
