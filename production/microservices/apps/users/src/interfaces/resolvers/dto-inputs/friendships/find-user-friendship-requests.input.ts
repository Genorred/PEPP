import { Field, InputType, Int } from "@nestjs/graphql";
import { FindUserFriendsDto } from "../../../application/dto/find-user-friends.dto";

@InputType()
export class FindUserFriendshipRequestsInput {
  @Field(() => Int, { nullable: true })
  cursorId?: number;
}
