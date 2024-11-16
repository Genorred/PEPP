import { CreatePostInput, CreatePostInputService } from "./create-post.input";
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

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
