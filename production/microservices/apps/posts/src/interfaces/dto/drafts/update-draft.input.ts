import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateDraftInput } from "../../../domain/dto/drafts/create-draft.input";

@InputType()
export class UpdateDraftInput extends PartialType(CreateDraftInput) {
  @Field(() => Int)
  id: number;
}
