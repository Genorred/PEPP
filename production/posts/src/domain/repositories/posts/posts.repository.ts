import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../dto/comments/create-comment.input";
import { Comment } from "../../entities/comment.entity";
import { GetByPostInput } from "../../dto/comments/get-by-post.input";
import { CommentsByPost } from "../../dto/comments/output/comments-by-post.output";
import { GetByParentCommentInput } from "../../dto/comments/get-by-parent-comment.input";
import { CreatePostInput, CreatePostInputService } from "../../dto/posts/create-post.input";
import { UpdatePostInput } from "../../dto/posts/publish-post.input";
import { Post } from "../../entities/post.entity";
import { FindManyInput } from "../../dto/posts/find-many.input";
import { RemovePostInputService } from "../../dto/posts/remove-post.input";
import { FindPostInput, FindPostInputService } from "../../dto/posts/find-post.input";
import { UpdatePostInputService } from "../../dto/posts/update-post.input";

export abstract class PostsRepository {
  abstract create(input: CreatePostInputService): Promise<Post>;

  abstract findOne(input: FindPostInput): Promise<Post>;

  abstract findMany(input?: FindManyInput): Promise<Post[]>;

  abstract count(input?: FindManyInput): Promise<number>;

  abstract update(input: UpdatePostInputService): Promise<Post>;

  abstract remove(input: RemovePostInputService): Promise<Post>;

  abstract incrementComments(postId: number): Promise<Post>;

  abstract getCommentsQuantity(postId: number): Promise<number>;
}
