import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => Int, { nullable: true })
  rating?: number;
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  postId: number;
  @Field(() => Int)
  postVersion: number;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
