import { Post } from "./post.entity";
import { ObjectType } from "@nestjs/graphql";

export type SearchPost = Pick<Post, "title" | "createdAt" | "description"> & {
  topics: string[]
  subTopics: string[]
}

export type SearchPostKey = (keyof SearchPost)
export type SearchPostKeys = SearchPostKey[];