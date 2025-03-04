import { Field, InputType, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { CreateVersionUseCaseDto } from "../../../application/dto/create-version-use-case.dto";

@InputType()
export class CreateVersionInput implements Omit<CreateVersionUseCaseDto, "userId"> {
  @Field({ nullable: true })
  title?: string;
  // @Field()
  // description?: string;
  @Field(() => GraphQLJSONObject)
  body: any;
  @Field(() => Int)
  postId: number;
  @Field(() => [String], { nullable: true })
  topics?: string[];
  @Field(() => [String], { nullable: true })
  subTopics?: string[];
}