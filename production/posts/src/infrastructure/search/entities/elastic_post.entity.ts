import { Post } from "../../../domain/entities/post.entity";
import { ObjectType, PickType } from "@nestjs/graphql";

@ObjectType()
export class ElasticPost extends PickType(Post, ["createdAt", "rating", "description", "topics", "subTopics", "title"]) {
}

export type ElasticKey = (keyof ElasticPost)
export type ElasticKeys = ElasticKey[];