import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateFriendshipInput {
  @Field(() => Int)
  receiverId: number;
}
