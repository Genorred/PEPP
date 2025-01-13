import { Post } from "./post.entity";
import { ObjectType, PickType } from "@nestjs/graphql";

@ObjectType()
export class SearchPost extends PickType(Post, ["createdAt", "rating", "description", "topics", "subTopics", "title"]) {
}

export type SearchPostKey = (keyof SearchPost)
export type SearchPostKeys = SearchPostKey[];