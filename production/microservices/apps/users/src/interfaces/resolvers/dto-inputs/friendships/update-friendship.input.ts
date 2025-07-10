import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateFriendshipInput {
  @Field(() => Int)
  requestId: number;
}
