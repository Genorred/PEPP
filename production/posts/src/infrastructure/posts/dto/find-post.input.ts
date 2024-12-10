import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class FindPostInput {
  @Field(() => Int)
  id: number;
  @Field(() => Int, { nullable: true })
  version?: number
}