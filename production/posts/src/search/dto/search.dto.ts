import { FindAlgorithmPostsInput } from "../../posts/dto/find-algorithm-posts.input";

export interface SearchDto extends FindAlgorithmPostsInput {
  likedPosts?: number[]
  dislikedPosts?: number[]
  recentlyShowedPosts?: number[]
}