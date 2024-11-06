import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class CreatePostInput {
  @Field(() => Int)
  userId: number
  @Field(() => GraphQLJSONObject)
  body: any
  @Field(() => Boolean, { nullable: true})
  published: boolean
}
