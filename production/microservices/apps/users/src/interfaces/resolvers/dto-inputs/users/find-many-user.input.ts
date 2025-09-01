import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindManyUserInput {
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  google_id?: string;
  @Field({ nullable: true })
  img?: string;
  @Field({ nullable: true })
  username?: string;
}
