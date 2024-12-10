import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FindOneUserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;
}
