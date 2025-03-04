import { Field, InputType, Int } from "@nestjs/graphql";
import { SortOrder } from "../../../domain/sort-order";
import { FindUserPostsDto } from "../../../domain/dto/posts/find-user-posts.dto";

@InputType()
export class FindUserPostsInput implements FindUserPostsDto {
  @Field(() => Int)
  userId: number;
  @Field(() => Int, { nullable: true })
  skipPages: number;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  rating?: SortOrder;
  @Field(() => [String], { nullable: true })
  topics?: string[];
  @Field(() => [String], { nullable: true })
  subTopics?: string[];
  @Field(() => [String], { nullable: true })
  topicsOrSubTopics?: string[];
}