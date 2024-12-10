import { Field, InputType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => GraphQLJSONObject)
  body: any;
  @Field(() => Boolean, { nullable: true })
  isPublished?: boolean;
  @Field(() => Boolean, { nullable: true })
  isDraft?: boolean;
  @Field(() => [String], { nullable: true })
  topics?: string[];
  @Field(() => [String], { nullable: true })
  subTopics?: string[];
}

@InputType()
export class CreatePostInputService extends CreatePostInput {
  @Field()
  userId: number;
}