import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FindUserFriendshipRequestsInput {
  @Field(() => Int, { nullable: true })
  cursorId?: number;
}
