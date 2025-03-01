import { Field, InputType, Int } from "@nestjs/graphql";
import { FindOneUserDto } from "../../../domain/dto/input/users/find-one-user.dto";
import { FindUserFriendshipsDto } from "../../../domain/dto/input/friendship/find-user-friendships.dto";
import { FindUserFriendsDto } from "../../../application/dto/find-user-friends.dto";

@InputType()
export class FindUserFriendshipsInput implements FindUserFriendsDto {
  @Field(() => Int)
  userId: number
  @Field(() => Int, { nullable: true })
  cursorId?: number
}
