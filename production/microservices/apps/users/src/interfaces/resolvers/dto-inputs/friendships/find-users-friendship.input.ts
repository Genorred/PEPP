import { Field, InputType, Int } from "@nestjs/graphql";
import { FindUsersFriendshipDto } from "../../../../domain/dto/input/friendship/find-users-friendship.dto";

@InputType()
export class FindUsersFriendshipInput implements FindUsersFriendshipDto {
  @Field(() => Int)
  userId1: number;
  @Field(() => Int, { nullable: true })
  userId2?: number;
}
