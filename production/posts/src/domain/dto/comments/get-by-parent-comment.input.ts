import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class GetByParentCommentInput {
  @Field(() => Int)
  parentId: number;
  @Field(() => Int, { nullable: true })
  skipPages?: number;
}
