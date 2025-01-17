import { Field, InputType } from "@nestjs/graphql";
import { CreatePostInput } from "./create-post.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class CreateVersionPostInput extends CreatePostInput {
  @Field()
  postId: number;
}

@InputType()
export class CreateVersionPostInputService extends CurrentUserExtendT(CreateVersionPostInput) {
  @Field()
  userId: number;
}
