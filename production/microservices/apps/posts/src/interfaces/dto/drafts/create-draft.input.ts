import { Field, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";

@InputType()
export class CreateDraftInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => GraphQLJSONObject)
  body: any;
  @Field(() => [String], { nullable: true })
  topics?: string[];
  @Field(() => [String], { nullable: true })
  subTopics?: string[];
  @Field(() => Int, { nullable: true })
  postId?: number;
}

export type CreateDraftInputService = CurrentUserExtendT<CreateDraftInput>
