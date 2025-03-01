import { Field, InputType, Int } from "@nestjs/graphql";
import { FindOneUserDto } from "../../../domain/dto/input/users/find-one-user.dto";
import { CountUserFriendshipsDto } from "../../../domain/dto/input/friendship/count-user-friendships.dto";

@InputType()
export class CountUserFriendshipsInput implements CountUserFriendshipsDto {
  @Field(()=> Int)
  userId: number;
}
