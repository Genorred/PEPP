import { Field, InputType, Int } from "@nestjs/graphql";
import { CountUserFriendshipsDto } from "../../../domain/dto/input/friendship/count-user-friendships.dto";

@InputType()
export class CountUserFriendshipsInput implements CountUserFriendshipsDto {
  @Field(() => Int)
  userId: number;
  @Field({nullable: true})
  isAccepted?: boolean;
}
