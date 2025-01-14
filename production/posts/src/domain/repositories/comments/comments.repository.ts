import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../dto/comments/create-comment.input";
import { Comment } from "../../entities/comment.entity";
import { GetByPostInput } from "../../dto/comments/get-by-post.input";
import { CommentsByPost } from "../../response/comments-by-post.response";
import { GetByParentCommentInput } from "../../dto/comments/get-by-parent-comment.input";
import { CreateReplyInput } from "../../dto/comments/create-reply.input";
import { FindManyInput } from "../../dto/comments/find-many.input";
import { UpdateCommentInput } from "../../dto/comments/update-comment.input";

export const COMMENTS_REPOSITORY_TOKEN = Symbol('CommentsRepository');
export interface CommentsRepository {
  create(input: CurrentUserExtendT<CreateCommentInput>): Promise<Comment>;

  createReply(input: CurrentUserExtendT<CreateReplyInput>): Promise<Comment>;

  findMany(input: FindManyInput): Promise<Comment[]>;

  findOne(id: number): Promise<Comment>;

  update(id: number, updateCommentInput: UpdateCommentInput): Promise<Comment>;

  incrementRepliesQuantity(id: number): Promise<Comment>;

  remove(id: number): Promise<Comment>;
}