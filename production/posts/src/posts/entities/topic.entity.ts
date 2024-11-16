import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Topic {
  @Field(() => Int)
  title: string;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
