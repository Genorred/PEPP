import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateDraftInput } from "./create-draft.input";

@InputType()
export class UpdateDraftInput extends PartialType(CreateDraftInput) {
  @Field(() => Int)
  id: number;
}
export type UpdateDraftInputService = CurrentUserExtendT<UpdateDraftInput>;
