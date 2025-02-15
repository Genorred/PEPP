import { CreateTopicInput } from "./create-topic.input";
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateTopicInput extends PartialType(CreateTopicInput) {
  @Field(() => Int)
  id: number;
}
