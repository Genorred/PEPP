import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../../../domain/entities/post.entity";

@ObjectType()
export class Recommendations {
  @Field(() => Int)
  totalCount: number;
  @Field(() => [Post])
  posts: Post[];
}
