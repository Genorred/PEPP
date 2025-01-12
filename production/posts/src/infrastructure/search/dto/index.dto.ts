import { Post } from "../../../domain/entities/post.entity";

export type IndexDto = Pick<Post, "id" | "description" | "topics"
  | "subTopics" | "title" | "createdAt">