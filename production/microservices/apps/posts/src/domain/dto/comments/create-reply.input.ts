import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateReplyInput {
  @Field(() => Int)
  postId: number;
  @Field()
  message: string;
  @Field(() => Int)
  parentId: number;
  @Field(() => Int, { nullable: true })
  respondedCommentId?: number;
}

