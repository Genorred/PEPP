import { Post } from "../../entities/post.entity";
import { SortOrder } from "../../sort-order";

export interface FindManyDto extends Omit<Partial<Post>, "body" | "topics" | "subTopics" | "rating" | "createdAt"> {
  ids?: number[];
  skip?: number;
  take?: number;
  topics?: string[];
  rating?: SortOrder;
  createdAt?: SortOrder;
  subTopics?: string[];
  topicsOrSubTopics?: string[];
}