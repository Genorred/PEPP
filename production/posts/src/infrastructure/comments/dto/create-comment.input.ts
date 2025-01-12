import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  postId: number;
  @Field()
  message: string
  @Field(() => Int, { nullable: true})
  parentId?: number
  @Field(() => Int, { nullable: true})
  respondedCommentId?: number
}

