import { Field, InputType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

@InputType()
export class CreateVersionPostInput extends CreatePostInput {
  @Field()
  postId: number;
}
