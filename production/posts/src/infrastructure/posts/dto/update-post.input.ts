import { CreatePostInput, CreatePostInputService } from "./create-post.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdatePostInputService extends PartialType(CreatePostInputService) {
  @Field(() => Int)
  id: number;
}
