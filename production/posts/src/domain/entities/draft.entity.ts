import { Directive, ObjectType, OmitType } from "@nestjs/graphql";
import { Post } from "./post.entity";

@ObjectType()
@Directive("@key(fields: \"id\")")
export class Draft extends OmitType(Post, [
  "rating", "commentsQuantity", "reviewsQuantity"
]) {

}
