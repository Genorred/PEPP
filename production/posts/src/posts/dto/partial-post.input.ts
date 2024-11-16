import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreatePostInput, CreatePostInputService } from "./create-post.input";

@InputType()
export class PartialPostInput extends PartialType(CreatePostInputService) {
}