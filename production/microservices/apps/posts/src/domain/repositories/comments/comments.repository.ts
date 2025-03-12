import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../dto/comments/create-comment.input";
import { Comment } from "../../entities/comment.entity";
import { CreateReplyInput } from "../../dto/comments/create-reply.input";
import { FindManyInput } from "../../dto/comments/find-many.input";
import { UpdateCommentInput } from "../../dto/comments/update-comment.input";

export const COMMENTS_REPOSITORY_TOKEN = Symbol("CommentsRepository");

export abstract class CommentsRepository {
  abstract create(input: CurrentUserExtendT<CreateCommentInput>): Promise<Comment>;

  abstract createReply(input: CurrentUserExtendT<CreateReplyInput>): Promise<Comment>;

  abstract findMany(input: FindManyInput): Promise<Comment[]>;

  abstract findOne(id: number): Promise<Comment>;

  abstract update(id: number, updateCommentInput: UpdateCommentInput): Promise<Comment>;

  abstract incrementRepliesQuantity(id: number): Promise<Comment>;

  abstract remove(id: number): Promise<Comment>;
}