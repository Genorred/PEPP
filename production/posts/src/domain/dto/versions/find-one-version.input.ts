import { FindByPostInput } from '../../../interfaces/dto/versions/find-by-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class FindOneVersionInput {
  @Field(() => Int)
  id: number;
}
