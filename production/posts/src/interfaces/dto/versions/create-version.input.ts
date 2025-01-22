import { CreateVersionInput } from "../../../domain/dto/versions/create-version.input";
import { Field, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class GqlCreateVersionInput {
  @Field({nullable: true})
  title?: string;
  // @Field()
  // description?: string;
  @Field(() => GraphQLJSONObject)
  body: any;
  @Field(() => Int)
  postId: number
}