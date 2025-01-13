import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../entities/post.entity";

@ObjectType()
export class Recommendations {
  @Field(() => Int)
  totalPages: number;
  @Field(() => [Post])
  data: Post[];
}
