import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FindAllPostsInput {
  @Field()
  token: string;
  @Field({ nullable: true })
  isArchived?: boolean;
}