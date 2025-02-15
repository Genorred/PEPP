import { InputType, Int, Field } from '@nestjs/graphql';
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class FindByPostInput {
  @Field(() => Int)
  postId: number;
}
