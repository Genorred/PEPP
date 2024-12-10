import { InputType, Int, Field, OmitType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { CreatePostInput } from "./create-post.input";

@InputType()
export class CreateVersionPostInput extends CreatePostInput{
  @Field()
  postId: number
}

@InputType()
export class CreateVersionPostInputService extends CreateVersionPostInput {
  @Field()
  userId: number
}
