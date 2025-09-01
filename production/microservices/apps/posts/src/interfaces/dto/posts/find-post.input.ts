import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPostDto } from '../../../domain/dto/posts/find-post.dto';

@InputType()
export class FindPostInput implements FindPostDto {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  isHidden?: boolean;
}
