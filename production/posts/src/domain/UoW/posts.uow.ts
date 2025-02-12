import { PostsRepository } from "../repositories/posts/posts.repository";
import { VersionsRepository } from "../repositories/versions/versions.repository";

export abstract class PostsUow {
  abstract run<T>(callback: (repos: {
    postsRepository: PostsRepository,
    versionsRepository: VersionsRepository,
  }) => Promise<T>): Promise<T>;
}