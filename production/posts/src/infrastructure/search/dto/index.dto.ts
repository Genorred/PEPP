import { Post } from "../../../domain/entities/post.entity";
import { CreatePostInput } from "../../posts/dto/create-post.input";

export type IndexDto = Pick<Post, "id" | "description" | "topics"
  | "subTopics" | "title" | "createdAt">