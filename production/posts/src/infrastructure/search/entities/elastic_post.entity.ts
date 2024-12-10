import { Post } from "../../../domain/entities/post.entity";

export interface ElasticPost extends Pick<Post,'createdAt' | 'rating' | "description" | "topics" | "subTopics" | "title"> {
}
export type ElasticKey = (keyof ElasticPost)
export type ElasticKeys = ElasticKey[];