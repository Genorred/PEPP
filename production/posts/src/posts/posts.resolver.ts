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
import { FindPostInput } from "./dto/find-post.input";
import { Inject, Req, UnauthorizedException } from "@nestjs/common";
import NextjsEndpoint from "../config/nextjsEndpoint";
import { ConfigType } from "@nestjs/config";
import { FindAllPostsInput } from "./dto/_nextjs_find-posts.input";
import { FindAlgorithmPostsInput } from "./dto/find-algorithm-posts.input";

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService,
              @Inject(NextjsEndpoint.KEY) private readonly configService: ConfigType<typeof NextjsEndpoint>) {
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
    return this.postsService.findMany({ userId: userId, isPublished: true });
  }

  @Query(() => [Post], { name: "userDrafts" })
  @UseAuth()
  findUserDrafts(@CurrentUser() user: JwtPayload) {
    return this.postsService.findMany({ userId: user.sub, isDraft: true });
  }

  @Query(() => [Post], { name: "algoPosts" })
  findAlgorithmPosts(@Args('findAlgorithmInput') findAlgorithmInput: FindAlgorithmPostsInput) {
    return this.postsService.algoPosts(findAlgorithmInput);
  }

  @Query(() => Post, { name: "post" })
  findOne(@Args("findOne") findOne: FindPostInput) {
    return this.postsService.findOne(findOne);
  }

  @Query(() => Post, { name: "draft" })
  async findDraft(@Args("findDraft") findDraft: FindPostInput, @CurrentUser() user: JwtPayload) {
    const draft = await this.postsService.findOne({...findDraft, isDraft: true});
    if (draft?.userId === user.sub) {
      return draft;
    } else {
      throw new UnauthorizedException()
    }
  }

  @Mutation(() => Post)
  async updatePost(@Args("updatePostInput") updatePostInput: UpdatePostInput, @CurrentUser() user: JwtPayload) {
    return this.postsService.update({ ...updatePostInput, userId: user.sub });
  }

  @Mutation(() => Post)
  async publish(@Args("publishInput", {type: () => Int}) postId: number, @CurrentUser() user: JwtPayload) {
    return this.postsService.publishVersion(postId, user.sub);
  }

  @Mutation(() => Post)
  removePost(@Args("id", { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }





  @Query(() => [Post], {name: 'allPosts'})
  findAll(@Args('findAllPostsInput') findAllPostsInput: FindAllPostsInput) {
    const {token, ...isArchived} = findAllPostsInput
    if (this.configService.token === token) {
      return this.postsService.findMany(isArchived)
    } else {
      throw new UnauthorizedException()
    }
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: "User", id: post.userId };
  }
}
