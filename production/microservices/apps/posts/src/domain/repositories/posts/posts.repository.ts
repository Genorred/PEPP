import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../dto/comments/create-comment.input";
import { Comment } from "../../entities/comment.entity";
import { GetByPostInput } from "../../dto/comments/get-by-post.input";
import { CommentsByPost } from "../../dto/comments/output/comments-by-post.output";
import { GetByParentCommentInput } from "../../dto/comments/get-by-parent-comment.input";
import { CreatePostDto, CreatePostServiceDto } from "../../dto/posts/create-post.dto";
import { UpdatePostInput } from "../../dto/posts/publish-post.dto";
import { Post } from "../../entities/post.entity";
import { FindManyDto } from "../../dto/posts/find-many.dto";
import { RemovePostInputService } from "../../dto/posts/remove-post.dto";
import { FindPostDto, FindPostInputService } from "../../dto/posts/find-post.dto";
import { UpdatePostInputService } from "../../dto/posts/update-post.dto";

export abstract class PostsRepository {
  abstract create(input: CreatePostServiceDto): Promise<Post>;

  abstract findOne(input: FindPostDto): Promise<Post>;

  abstract findMany(input?: FindManyDto): Promise<Post[]>;

  abstract count(input?: FindManyDto): Promise<number>;

  abstract update(input: UpdatePostInputService): Promise<Post>;

  abstract remove(input: RemovePostInputService): Promise<Post>;

  abstract incrementComments(postId: number): Promise<Post>;

  abstract getCommentsQuantity(postId: number): Promise<number>;
}
