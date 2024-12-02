import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class FindAlgorithmPostsInput {
  @Field({ nullable: true })
  createdAtDesc?: boolean
  @Field({ nullable: true })
  ratingDesc?: boolean
  @Field(() => Int, { nullable: true })
  page?: number;
  @Field({ nullable: true })
  searchValue?: string;
  @Field(() => [String], {nullable: true})
  topics?: string[]
  @Field(() => [String], {nullable: true})
  subTopics?: string[]
}
