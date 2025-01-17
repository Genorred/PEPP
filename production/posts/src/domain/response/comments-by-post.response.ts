import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "../entities/comment.entity";

@ObjectType()
export class CommentsByPost {
  @Field(() => Int)
  totalPages: number;
  @Field(() => [Comment])
  data: Comment[];
}
