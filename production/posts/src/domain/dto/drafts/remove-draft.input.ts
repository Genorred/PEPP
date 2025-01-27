import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class RemoveDraftInput {
  @Field(() => Int)
  id: number;
}

export interface RemovePostInputService extends CurrentUserExtendT<RemoveDraftInput> {
}
