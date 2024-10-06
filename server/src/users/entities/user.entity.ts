import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: number
  @Field()
  email: string
  @Field()
  password: string
  @Field()
  username: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
