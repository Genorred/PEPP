import { Field, InputType, Int } from "@nestjs/graphql";
import { FindUserFriendsDto } from "../../../../application/dto/friendships/find-user-friends.dto";

@InputType()
export class FindUserFriendshipsInput implements FindUserFriendsDto {
  @Field(() => Int)
  userId: number;
  @Field(() => Int, { nullable: true })
  cursorId?: number;
}
