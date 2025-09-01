import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Topic {
  @Field()
  title: string;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
