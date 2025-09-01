import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindByPostInput {
  @Field(() => Int)
  postId: number;
}
