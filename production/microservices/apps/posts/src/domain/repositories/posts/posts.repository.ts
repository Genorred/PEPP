import { CreatePostServiceDto } from "../../dto/posts/create-post.dto";
import { Post } from "../../entities/post.entity";
import { FindManyDto } from "../../dto/posts/find-many.dto";
import { RemovePostDto } from "../../dto/posts/remove-post.dto";
import { FindPostDto } from "../../dto/posts/find-post.dto";
import { UpdatePostInputService } from "../../dto/posts/update-post.dto";
import { CountCommentsByPostDto } from "../../dto/comments/count-comments-by-post.dto";

export abstract class PostsRepository {
  abstract create(input: CreatePostServiceDto): Promise<Post>;

  abstract findOne(input: FindPostDto): Promise<Post>;

  abstract findMany(input?: FindManyDto): Promise<Post[]>;

  abstract count(input?: FindManyDto): Promise<number>;

  abstract update(input: UpdatePostInputService): Promise<Post>;

  abstract remove(input: RemovePostDto): Promise<Post>;

  abstract incrementComments(postId: number): Promise<Post>;

  abstract getCommentsQuantity(countComments: CountCommentsByPostDto): Promise<number>;
}
