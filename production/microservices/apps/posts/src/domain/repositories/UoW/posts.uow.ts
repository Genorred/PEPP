import { PostsRepository } from "../posts/posts.repository";
import { VersionsRepository } from "../versions/versions.repository";

export abstract class PostsUow {
  abstract run<T>(callback: (repos: {
    postsRepository: PostsRepository,
    versionsRepository: VersionsRepository,
  }) => Promise<T>): Promise<T>;
}