import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { RemovePostDto } from "../../../domain/dto/posts/remove-post.dto";

@InputType()
export class RemovePostInput implements RemovePostDto {
  @Field(() => Int)
  id: number;
}