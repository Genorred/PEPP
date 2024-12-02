import { FindAlgorithmPostsInput } from "../../posts/dto/find-algorithm-posts.input";

export interface SearchDto extends FindAlgorithmPostsInput {
  recommendationPostIds?: string[]
}