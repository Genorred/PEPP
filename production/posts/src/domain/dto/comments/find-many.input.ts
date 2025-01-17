export class FindManyInput {
  postId?: number;
  skipPages?: number;
  parentId?: number;
  take: number;
  likes?: "asc" | 'desc'
  repliesQuantity?: "asc" | 'desc'
  dislikes?: "asc" | 'desc'
}
