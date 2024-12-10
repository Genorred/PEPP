import { Post } from "./post.entity";
import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive("@key(fields: \"id\")")
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => [Post])
  posts?: Post[];
}
