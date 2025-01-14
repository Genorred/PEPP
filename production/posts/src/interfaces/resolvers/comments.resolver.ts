import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from "@nestjs/graphql";
import { CommentsService } from '../../domain/domain_services/comments.service';
import { CreateCommentInput } from '../../domain/dto/comments/create-comment.input';
import { UpdateCommentInput } from '../../domain/dto/comments/update-comment.input';
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import useAuth from "@_shared/auth-guard/useAuth";
import { GetByPostInput } from "../../domain/dto/comments/get-by-post.input";
import { User } from "../../domain/entities/user.entity";
import { Post } from "../../domain/entities/post.entity";
import { Comment } from "../../domain/entities/comment.entity";
import { CommentsByPost } from "../../domain/response/comments-by-post.response";
import { GetByParentCommentInput } from "../../domain/dto/comments/get-by-parent-comment.input";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService,
              private readonly commentsRepository: CommentsRepository,
              ) {}

  @useAuth()
  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput, @CurrentUser() user: CurrentUserI) {
    return this.commentsService.addCommentToPost({...createCommentInput, userId: user.sub });
  }

  @Query(() => CommentsByPost, { name: 'comments' })
  getByPost(@Args('postComments') getByPostInput: GetByPostInput) {
    return this.commentsService.getByPost(getByPostInput);
  }

  @Query(() => CommentsByPost, { name: 'replies' })
  getByParentComment(@Args('postComments') getByPostInput: GetByParentCommentInput) {
    return this.commentsService.getByParentComment(getByPostInput);
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentsRepository.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentsRepository.update(updateCommentInput.id, updateCommentInput);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsRepository.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment): any {
    return { __typename: "User", id: comment.userId };
  }
  @ResolveField(() => Post)
  post(@Parent() comment: Comment): any {
    return { __typename: "Post", id: comment.userId };
  }
  @ResolveField(() => Comment)
  parent(@Parent() comment: Comment): any {
    return { __typename: "Comment", id: comment.parentId };
  }
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<Comment> {
    return this.commentsRepository.findOne(reference.id);
  }
}