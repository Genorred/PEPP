import { Directive, Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { Post } from './post.entity';
import { Topic } from './topic.entity';
import JSON from 'graphql-type-json';
import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Draft extends OmitType(Post, [
  'rating',
  'commentsQuantity',
  'reviewsQuantity',
  'isHidden',
]) {
  @Field(() => Int)
  id: number;
  @Field()
  version: number;
  @Field(() => Int, { nullable: true })
  minutes?: number;
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  img?: string;
  @Field(() => [Topic], { nullable: true })
  topics?: Topic[];
  @Field(() => [Topic], { nullable: true })
  subTopics?: Topic[];
  @Field(() => [JSON])
  body: any[];
  @Field(() => Int)
  userId: number;
  @Field(() => User)
  user?: User;
  @Field(() => Int)
  postId: number;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
