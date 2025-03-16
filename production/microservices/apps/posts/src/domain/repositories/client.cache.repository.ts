export abstract class ClientCacheRepository {
  abstract revalidatePost(postId: number, postUserId: number): Promise<unknown>
}