import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FindPostInput {
  @Field(() => Int)
  id: number;
  @Field(() => Int, { nullable: true })
  version?: number;
}