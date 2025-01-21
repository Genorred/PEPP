import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { Post } from "../../domain/entities/post.entity";
import { CreatePostInput } from "../../domain/dto/posts/create-post.input";
import { UpdatePostInput } from "../../domain/dto/posts/update-post.input";
import { User } from "../../domain/entities/user.entity";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import { JwtPayload } from "@_shared/entities/jwt.entity";
import UseAuth from "@_shared/auth-guard/useAuth";
import { CreateVersionPostInput } from "../../domain/dto/posts/create-version-post.input";
import { FindPostInput } from "../../domain/dto/posts/find-post.input";
import { Inject, UnauthorizedException } from "@nestjs/common";
import FRONTEND_SERVER from "../../infrastructure/config/frontend-server";
import { ConfigType } from "@nestjs/config";
import { FindAllPostsInput } from "../../domain/dto/posts/_nextjs_find-posts.input";
import { FindAlgorithmPostsInput } from "../../domain/dto/posts/find-algorithm-posts.input";
import { Recommendations } from "../dto/posts/output/recommendations.output";

import { Comment } from "../../domain/entities/comment.entity";
import { PostsUseCase } from "../../application/posts.use-case";
import { RemovePostInput } from "../../domain/dto/posts/remove-post.input";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsUseCase,
              private readonly postsRepository: PostsRepository,
              @Inject(FRONTEND_SERVER.KEY) private readonly configService: ConfigType<typeof FRONTEND_SERVER>) {
  }

  @Mutation(() => Post)
  @UseAuth()
  async createPost(@Args("createPostInput") createPostInput: CreatePostInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.create({ ...createPostInput, userId: user.sub });
  }

  @Query(() => [Post], { name: "userPosts" })
  findUserPosts(@Args("userId", { type: () => Int }) userId: number) {
    return this.postsService.findUserPosts(userId);
  }

  @Query(() => Recommendations, { name: "algoPosts" })
  recommendations(@Args("findAlgorithmInput") findAlgorithmInput: FindAlgorithmPostsInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.recommendations({ ...findAlgorithmInput, userId: user?.sub });
  }

  @Query(() => Post, { name: "post" })
  findOne(@Args("findOne") id: number, @CurrentUser() user: CurrentUserI) {
    return this.postsService.findOne({ id, userId: user?.sub });
  }

  @Mutation(() => Post)
  async updatePost(@Args("updatePostInput") updatePostInput: UpdatePostInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.update({ ...updatePostInput, userId: user?.sub });
  }

  @Mutation(() => Post, { name: "hide" })
  hide(@Args("findOne") id: number, @CurrentUser() user: CurrentUserI) {
    return this.postsService.hide(id, user?.sub);
  }

  @Mutation(() => Post, { name: "expose" })
  expose(@Args("findOne") id: number, @CurrentUser() user: CurrentUserI) {
    return this.postsService.expose(id, user?.sub);
  }

  @Mutation(() => Post)
  removePost(@Args("removePostInput") input: RemovePostInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.remove({ ...input, userId: user?.sub });
  }


  @Query(() => [Post], { name: "allPosts" })
  findAll(@Args("findAllPostsInput") findAllPostsInput: FindAllPostsInput) {
    return this.postsService.findAll(findAllPostsInput);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: "User", id: post.userId };
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<Post> {
    return this.postsRepository.findOne({
      id: reference.id,
      isHidden: false
    });
  }
}
