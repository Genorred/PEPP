import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class FindAllPostsInput {
  @Field()
  token: string;
  @Field({ nullable: true })
  isArchived?: boolean
}