import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { CommentsUseCase } from "../../application/comments.use-case";
import { CreateCommentInput } from "../../domain/dto/comments/create-comment.input";
import { UpdateCommentInput } from "../../domain/dto/comments/update-comment.input";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import useAuth from "@_shared/auth-guard/useAuth";
import { GetByPostInput } from "../../domain/dto/comments/get-by-post.input";
import { User } from "../../domain/entities/user.entity";
import { Post } from "../../domain/entities/post.entity";
import { Comment } from "../../domain/entities/comment.entity";
import { CommentsByPost } from "../../domain/dto/comments/output/comments-by-post.output";
import { GetByParentCommentInput } from "../../domain/dto/comments/get-by-parent-comment.input";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { CreateReplyInput } from "../../domain/dto/comments/create-reply.input";
import { GetByUserInput } from "../dto/comments/get-by-user.input";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsUseCase,
              private readonly commentsRepository: CommentsRepository,
              private readonly postsRepository: PostsRepository
  ) {
  }

  @useAuth()
  @Mutation(() => Comment)
  createComment(@Args("createCommentInput") createCommentInput: CreateCommentInput, @CurrentUser() user: CurrentUserI) {
    return this.commentsService.addCommentToPost({ ...createCommentInput, userId: user.sub });
  }

  @useAuth()
  @Mutation(() => Comment)
  createReply(@Args("createReplyInput") createReplyInput: CreateReplyInput, @CurrentUser() user: CurrentUserI) {
    return this.commentsService.addReplyToPostComment({ ...createReplyInput, userId: user.sub });
  }

  @Query(() => CommentsByPost, { name: "comments" })
  getByPost(@Args("getCommentsByPostInput") getByPostInput: GetByPostInput) {
    return this.commentsService.getByPost(getByPostInput);
  }

  @Query(() => CommentsByPost, { name: "userComments" })
  getByUser(@Args("getCommentsByUserInput") getByPostInput: GetByUserInput) {
    return this.commentsService.getByUser(getByPostInput);
  }

  @Query(() => CommentsByPost, { name: "replies" })
  getByParentComment(@Args("getRepliesByCommentInput") getByPostInput: GetByParentCommentInput) {
    return this.commentsService.getByParentComment(getByPostInput);
  }

  @Query(() => Comment, { name: "comment" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.commentsRepository.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args("updateCommentInput") updateCommentInput: UpdateCommentInput) {
    return this.commentsRepository.update(updateCommentInput.id, updateCommentInput);
  }

  @Mutation(() => Comment)
  removeComment(@Args("id", { type: () => Int }) id: number) {
    return this.commentsRepository.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment): any {
    return { __typename: "User", id: comment.userId };
  }

  @ResolveField(() => Post)
  post(@Parent() comment: Comment): any {
    return this.postsRepository.findOne({ id: comment.postId });
  }

  @ResolveField(() => Comment)
  parent(@Parent() comment: Comment): any {
    return this.commentsRepository.findOne(comment.id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<Comment> {
    return this.commentsRepository.findOne(reference.id);
  }
}
