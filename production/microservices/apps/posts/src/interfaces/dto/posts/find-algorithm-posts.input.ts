import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { FindAlgorithmPostsDto } from '../../../domain/dto/posts/find-algorithm-posts.dto';
import { SortOrder } from '../../../domain/entities/types/sort-order';

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class FindAlgorithmPostsInput implements FindAlgorithmPostsDto {
  @Field(() => SortOrder, { nullable: true })
  createdAt?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  rating?: SortOrder;
  @Field(() => Int, { nullable: true })
  skipPages?: number;
  @Field({ nullable: true })
  searchValue?: string;
  @Field(() => [String], { nullable: true })
  topics?: string[];
}
