import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "../../../domain/entities/comment.entity";

@ObjectType()
export class CommentsByPost {
  @Field(() => Int)
  totalPages: number;
  @Field(() => [Comment])
  data: Comment[];
}
