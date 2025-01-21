import { CreatePostInput } from "./create-post.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;
}
export type UpdatePostInputService = CurrentUserExtendT<UpdatePostInput>;
