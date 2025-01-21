import { ForbiddenException } from "@nestjs/common";
import { Post } from "../entities/post.entity";

export class VersionIsHiddenService {
  isHidden(post: Post) {
    if (post.isHidden) {
      throw new ForbiddenException("Post has been hidden");
    }
  }
}