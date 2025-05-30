import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FindDraftInput {
  @Field(() => Int)
  id: number;
}