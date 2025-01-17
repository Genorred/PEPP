import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../dto/comments/create-comment.input";
import { Comment } from "../../entities/comment.entity";
import { GetByPostInput } from "../../dto/comments/get-by-post.input";
import { CommentsByPost } from "../../response/comments-by-post.response";
import { GetByParentCommentInput } from "../../dto/comments/get-by-parent-comment.input";
import { CreatePostInput } from "../../dto/posts/create-post.input";
import { UpdatePostInput } from "../../dto/posts/publish-post.input";
import { Post } from "../../entities/post.entity";

export interface PostsRepository {
  create(input: CurrentUserExtendT<CreatePostInput>): Promise<Comment>;

  findOne(id: number): Promise<Comment>;

  update(input: UpdatePostInput): Promise<Comment>;

  remove(input: CurrentUserExtendT<{ id: number }>): Promise<Comment>;

  incrementComments(postId: number): Promise<Post>;

  getCommentsQuantity(postId: number): Promise<number>;
}
