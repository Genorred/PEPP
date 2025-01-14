import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { PostsService } from "../../infrastructure/posts/posts.service";
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
import NextjsEndpoint from "../../infrastructure/config/nextjsEndpoint";
import { ConfigType } from "@nestjs/config";
import { FindAllPostsInput } from "../../domain/dto/posts/_nextjs_find-posts.input";
import { FindAlgorithmPostsInput } from "../../domain/dto/posts/find-algorithm-posts.input";
import { Recommendations } from "../../domain/response/recommendations.response";

import { Comment } from "../../domain/entities/comment.entity";

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService,
              @Inject(NextjsEndpoint.KEY) private readonly configService: ConfigType<typeof NextjsEndpoint>) {
  }

  @Mutation(() => Post)
  @UseAuth()
  async createPost(@Args("createPostInput") createPostInput: CreatePostInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.create({ ...createPostInput, userId: user.sub });
  }

  @Mutation(() => Post)
  @UseAuth()
  createVersionPost(@Args("createVersionPostInput") createPostInput: CreateVersionPostInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.createVersion({ ...createPostInput, userId: user.sub });
  }

  @Query(() => [Post], { name: "userPosts" })
  findUserPosts(@Args("userId", { type: () => Int }) userId: number) {
    return this.postsService.findMany({ userId: userId, isPublished: true });
  }

  @Query(() => [Post], { name: "userDrafts" })
  @UseAuth()
  findUserDrafts(@CurrentUser() user: CurrentUserI) {
    return this.postsService.findMany({ userId: user.sub, isDraft: true });
  }

  @Query(() => Recommendations, { name: "algoPosts" })
  findAlgorithmPosts(@Args("findAlgorithmInput") findAlgorithmInput: FindAlgorithmPostsInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.recommendations({ ...findAlgorithmInput, userId: user?.sub });
  }

  @Query(() => Post, { name: "post" })
  findOne(@Args("findOne") findOne: FindPostInput) {
    return this.postsService.findOne(findOne);
  }

  @Query(() => Post, { name: "draft" })
  async findDraft(@Args("findDraft") findDraft: FindPostInput, @CurrentUser() user: CurrentUserI) {
    const draft = await this.postsService.findOne({ ...findDraft, isDraft: true });
    if (draft?.userId === user.sub) {
      return draft;
    } else {
      throw new UnauthorizedException();
    }
  }

  @Mutation(() => Post)
  async updatePost(@Args("updatePostInput") updatePostInput: UpdatePostInput, @CurrentUser() user: CurrentUserI) {
    return this.postsService.update({ ...updatePostInput, userId: user?.sub });
  }

  @Mutation(() => Post)
  async publish(@Args("publishInput", { type: () => Int }) postId: number, @CurrentUser() user: CurrentUserI) {
    return this.postsService.publishVersion(postId, user?.sub);
  }

  @Mutation(() => Post)
  removePost(@Args("id", { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }


  @Query(() => [Post], { name: "allPosts" })
  findAll(@Args("findAllPostsInput") findAllPostsInput: FindAllPostsInput) {
    const { token, ...isArchived } = findAllPostsInput;
    if (this.configService.token === token) {
      return this.postsService.findMany(isArchived);
    } else {
      throw new UnauthorizedException();
    }
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: "User", id: post.userId };
  }
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<Post> {
    return this.postsService.findOne({
      id: reference.id
    });
  }
}
