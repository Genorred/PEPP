import { Field, InputType, Int } from '@nestjs/graphql';
import { CurrentUserExtendT } from '@_shared/auth-guard/CurrentUserExtendT';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  description?: string;
  @Field(() => GraphQLJSONObject, { nullable: true })
  body?: any;
  @Field(() => [String], { nullable: true })
  topics?: string[];
  @Field(() => [String], { nullable: true })
  subTopics?: string[];
  @Field(() => Int)
  id: number;
}

export type UpdatePostInputService = CurrentUserExtendT<UpdatePostInput>;
