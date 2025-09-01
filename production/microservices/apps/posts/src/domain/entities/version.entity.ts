import { Directive, Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Version extends OmitType(Post, ['isHidden']) {
  @Field(() => Int)
  postId: number;
}
