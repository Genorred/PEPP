import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindManyUserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
