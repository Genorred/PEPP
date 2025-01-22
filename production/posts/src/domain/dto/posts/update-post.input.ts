import { CreatePostInput } from "./create-post.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: number;
  version?: number
}
export type UpdatePostInputService = CurrentUserExtendT<UpdatePostInput>;
