import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class RemoveFriendshipInput {
  @Field(() => Int)
  anotherUserId: number;
}
