import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;
  @Field()
  message: string;
  @Field(() => Int)
  userId: number;
  @Field(() => User)
  user?: User;
  @Field(() => Int, { nullable: true })
  respondedCommentId: number;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  @Field(() => Int)
  likes: number;
  @Field(() => Int)
  dislikes: number;
  @Field(() => Int)
  repliesQuantity: number;
  @Field(() => Post)
  post?: Post;

  @Field(() => Int)
  postId: number;
  // @Field(() => [PostComment])
  // replies?: PostComment[];
  @Field(() => Int, { nullable: true })
  parentId: number;
  @Field(() => Comment, { nullable: true })
  parent?: Comment;
}