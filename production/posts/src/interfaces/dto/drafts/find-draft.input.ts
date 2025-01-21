import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class FindDraftInput {
  @Field(() => Int)
  id: number
}