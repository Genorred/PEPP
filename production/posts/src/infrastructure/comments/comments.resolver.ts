import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ResolveReference } from "@nestjs/graphql";
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import useAuth from "@_shared/auth-guard/useAuth";
import { GetByPostInput } from "./dto/get-by-post.input";
import { User } from "../../domain/entities/user.entity";
import { Post } from "../../domain/entities/post.entity";
import { Comment } from "../../domain/entities/comment.entity";
import { CommentsByPost } from "./model/recommendations.response";
import { GetByParentCommentInput } from "./dto/get-by-parent-comment.input";

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @useAuth()
  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput, @CurrentUser() user: CurrentUserI) {
    return this.commentsService.create({...createCommentInput, userId: user.sub });
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
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentsService.update(updateCommentInput.id, updateCommentInput);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
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
    return this.commentsService.findOne(reference.id);
  }
}
