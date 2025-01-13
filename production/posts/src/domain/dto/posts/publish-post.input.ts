import { Field, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { CreatePostInput } from "./create-post.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class PublishPostInput extends CreatePostInput {
  @Field(() => Int)
  id: number;
}