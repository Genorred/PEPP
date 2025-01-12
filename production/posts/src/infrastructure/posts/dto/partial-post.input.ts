import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreatePostInputService } from "./create-post.input";

@InputType()
export class PartialPostInput extends PartialType(CreatePostInputService) {
  @Field()
  isArchived?: boolean;
}