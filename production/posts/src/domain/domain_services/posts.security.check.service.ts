import { ForbiddenException } from "@nestjs/common";
import { Post } from "../entities/post.entity";

export class PostsSecurityCheckService {
  ifShouldBeForbidden(post: Post, userId: number) {
    if (post.isHidden) {
      if (post.userId !== userId) {
        throw new ForbiddenException('Post has been hidden');
      }
    }
  }
}