import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindAllUsersInput {
  @Field()
  token: string;
}
