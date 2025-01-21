import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreatePostInput } from "./create-post.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class RemovePostInput {
  @Field(() => Int)
  id: number;
}

export interface RemovePostInputService extends CurrentUserExtendT<RemovePostInput> {
}
