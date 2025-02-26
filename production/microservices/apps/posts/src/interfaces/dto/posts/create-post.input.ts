import { Field, InputType } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreatePostDto } from "../../../domain/dto/posts/create-post.dto";

@InputType()
export class CreatePostInput implements CreatePostDto{
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
  @Field( { nullable: true } )
  isHidden?: boolean;
}