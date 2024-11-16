import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { Post } from "./entities/post.entity";
import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { PartialPostInput } from "./dto/partial-post.input";
import { User } from "./entities/user.entity";
import { CurrentUser } from "@shared/auth-guard/CurrentUser";
import { JwtPayload } from "@shared/entities/jwt.entity";
import UseAuth from "@shared/auth-guard/useAuth";
import { CreateVersionPostInput } from "./dto/create-version-post.input";

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {
  }

  @Mutation(() => Post)
  @UseAuth()
  async createPost(@Args("createPostInput") createPostInput: CreatePostInput, @CurrentUser() user: JwtPayload) {
    return this.postsService.create({ ...createPostInput, userId: user.sub });
  }
  @Mutation(() => Post)
  @UseAuth()
  createVersionPost(@Args("createVersionPostInput") createPostInput: CreateVersionPostInput, @CurrentUser() user: JwtPayload) {
    return this.postsService.createVersion({...createPostInput, userId: user.sub})
  }

  @Query(() => [Post], { name: "userPosts" })
  findUserPosts(@Args("userId", { type: () => Int }) userId: number) {
    return this.postsService.findMany({ userId: userId, published: true });
  }

  @Query(() => [Post], { name: "userDrafts" })
  @UseAuth()
  findUserDrafts(@CurrentUser() user: JwtPayload) {
    return this.postsService.findMany({ userId: user.sub, published: false });
  }

  @Query(() => [Post], { name: "algoPosts" })
  findAlgorithmPosts(@Args("findAlgorithmPostsInput") findAlgorithmPostsInput: PartialPostInput) {
    return this.postsService.findMany(findAlgorithmPostsInput);
  }

  @Query(() => Post, { name: "post" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Query(() => Post, { name: "draft" })
  async findDraft(@Args("id", { type: () => Int }) id: number, @CurrentUser() user: JwtPayload) {
    const draft = await this.postsService.findOne(id, false);
    if (draft.userId === user.sub) {
      return draft;
    }
  }

  @Mutation(() => Post)
  async updatePost(@Args("updatePostInput") updatePostInput: UpdatePostInput, @CurrentUser() user: JwtPayload) {
    return this.postsService.update({ ...updatePostInput, userId: user.sub });
  }

  @Mutation(() => Post)
  async publish(@Args("publishInput", {type: () => Int}) postId: number, @CurrentUser() user: JwtPayload) {
    return this.postsService.publish(postId, user.sub);
  }
  @Mutation(() => Post)
  removePost(@Args("id", { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: "User", id: post.userId };
  }
}
