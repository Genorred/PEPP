export abstract class ClientCacheRepository {
  abstract removePost(post: number): Promise<unknown>
  abstract addPost(post: number): Promise<unknown>
}