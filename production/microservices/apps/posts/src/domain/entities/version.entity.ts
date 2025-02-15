import { Directive, Field, Int, ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "./user.entity";
import JSON from "graphql-type-json";
import { Topic } from "./topic.entity";
import { Post } from "./post.entity";

@ObjectType()
@Directive("@key(fields: \"id\")")
export class Version extends OmitType(Post, ["isHidden"]) {
  @Field(() => Int)
  postId: number;
}
