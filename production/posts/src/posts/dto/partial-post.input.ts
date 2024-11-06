import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreatePostInput } from "./create-post.input";

@InputType()
export class PartialPostInput extends PartialType(CreatePostInput) {
}