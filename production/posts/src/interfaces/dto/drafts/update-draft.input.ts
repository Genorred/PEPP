import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateDraftInput } from "../../../domain/dto/drafts/create-draft.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class UpdateDraftInput extends PartialType(CreateDraftInput) {
  @Field(() => Int)
  id: number;
}
