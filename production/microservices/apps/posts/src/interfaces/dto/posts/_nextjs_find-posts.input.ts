import { Field, InputType } from '@nestjs/graphql';
import { FindAllPostsDto } from '../../../domain/dto/posts/_nextjs_find-posts.dto';

@InputType()
export class FindAllPostsInput implements FindAllPostsDto {
  @Field()
  token: string;
}
