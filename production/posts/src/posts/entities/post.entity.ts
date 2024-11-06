import { ObjectType, Field, Int, ID, Directive } from "@nestjs/graphql";
import { User } from "./user.entity";
import JSON from "graphql-type-json";

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => ID)
  id: number;
  @Field(() => [JSON])
  body: any[]
  @Field(() => ID)
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
