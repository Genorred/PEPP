import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class GetByPostInput {
  @Field(() => Int)
  postId: number;
  @Field(() => Int, { nullable: true })
  skipPages?: number;
}