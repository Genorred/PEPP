import { Field, InputType, Int } from "@nestjs/graphql";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class FindPostInput {
  @Field(() => Int)
  id: number;
  @Field()
  isHidden?: boolean
}
export type FindPostInputService = CurrentUserExtendT<FindPostInput>