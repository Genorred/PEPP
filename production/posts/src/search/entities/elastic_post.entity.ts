import { Post } from "../../posts/entities/post.entity";

export interface ElasticPost extends Pick<Post, 'rating' | "description" | "topics" | "subTopics" | "title"> {
  text: string
}
export type ElasticKey = (keyof ElasticPost)
export type ElasticKeys = ElasticKey[];