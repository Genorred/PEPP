import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FindUserPostsInput {
  @Field(() => Int)
  userId: number;
  @Field(() => Int, { nullable: true })
  skipPages: number;
}