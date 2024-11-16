import { ObjectType, Field, Int, ID, Directive } from "@nestjs/graphql";
import { User } from "./user.entity";
import JSON from "graphql-type-json";
import { Topic } from "./topic.entity";

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => Int)
  id: number;
  @Field()
  version: number
  @Field({nullable: true})
  postId?: number
  @Field()
  isArchived: boolean;
  @Field(() => Int, { nullable: true })
  minutes?: number;
  @Field()
  title: string
  @Field({ nullable: true })
  description?: string
  @Field(() => Int, {nullable: true})
  rating?: number
  @Field({ nullable: true })
  img?: string
  @Field(() => Int, {nullable: true})
  commentsQuantity?: number
  @Field(() => Int, {nullable: true})
  reviewsQuantity?: number
  @Field(() => [Topic], {nullable: true})
  topics?: Topic[]
  @Field(() => [Topic], {nullable: true})
  subTopics?: Topic[]
  @Field(() => [JSON])
  body: any[]
  @Field(() => Int)
  userId: number;
  @Field(() => Boolean)
  published: boolean

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  @Field(() => User)
  user?: User;
}
