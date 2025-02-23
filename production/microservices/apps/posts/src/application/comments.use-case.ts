import { Injectable } from "@nestjs/common";
import { CreateCommentInput } from "../domain/dto/comments/create-comment.input";
import { GetByPostInput } from "../domain/dto/comments/get-by-post.input";
import { CommentsByPost } from "../domain/dto/comments/output/comments-by-post.output";
import { GetByParentCommentInput } from "../domain/dto/comments/get-by-parent-comment.input";
import { Transaction } from "../domain/repositories/transaction";
import { CommentsRepository } from "../domain/repositories/comments/comments.repository";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateReplyInput } from "../domain/dto/comments/create-reply.input";

const page = 20;

@Injectable()
export class CommentsUseCase {
  constructor(
    private readonly transaction: Transaction,
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository
  ) {
  }

  async addReplyToPostComment({ parentId, postId, respondedCommentId, ...data }: CurrentUserExtendT<CreateReplyInput>) {
    return (await this.transaction.exec([
      this.commentsRepository.createReply({
        ...data,
        postId,
        parentId,
        respondedCommentId
      }),
      this.commentsRepository.incrementRepliesQuantity(parentId),
      this.postsRepository.incrementComments(postId)
    ]))[0];
  }

  async addCommentToPost({ postId, ...data }: CurrentUserExtendT<CreateCommentInput>) {
    return (await this.transaction.exec([
      this.commentsRepository.create({
        ...data,
        postId
      }),
      this.postsRepository.incrementComments(postId)
    ]))[0];

  }

  async getByPost(getByPostInput: GetByPostInput): Promise<CommentsByPost> {
    const { postId, skipPages } = getByPostInput;
    const [data, totalCount] = await Promise.all([
      this.commentsRepository.findMany({
        postId,
        parentId: null,
        skipPages,
        take: page,
        likes: "asc",
        repliesQuantity: "asc",
        dislikes: "desc"
      }),
      this.postsRepository.getCommentsQuantity(postId)
    ]);
    console.log(data);
    return {
      data,
      totalPages: Math.max(Math.floor(totalCount / page), 1)
    };
  }

  async getByParentComment(getByParentCommentInput: GetByParentCommentInput) {
    const { parentId, skipPages } = getByParentCommentInput;
    const [data, parent] = await Promise.all([
      this.commentsRepository.findMany({
        parentId,
        skipPages,
        take: page
      }),
      this.commentsRepository.findOne(parentId)
    ]);
    return {
      data,
      totalPages: Math.max(Math.floor(parent.repliesQuantity / page), 1)
    };
  }
}
