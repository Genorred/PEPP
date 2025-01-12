import { Field, InputType } from "@nestjs/graphql";
import { CreatePostInput } from "./create-post.input";

@InputType()
export class CreateVersionPostInput extends CreatePostInput {
  @Field()
  postId: number;
}

@InputType()
export class CreateVersionPostInputService extends CreateVersionPostInput {
  @Field()
  userId: number;
}
