import { Field, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { UpdateDraftDto } from "../../../domain/dto/drafts/update-draft.dto";

@InputType()
export class UpdateDraftInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => GraphQLJSONObject, { nullable: true })
  body?: any;
  @Field(() => [String], { nullable: true })
  topics?: string[];
  @Field(() => [String], { nullable: true })
  subTopics?: string[];
  @Field(() => Int)
  id: number;
}
