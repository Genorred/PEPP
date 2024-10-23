import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string
  @Field({nullable: true})
  password?: string
  @Field({nullable: true})
  google_id?: string
  @Field({nullable: true})
  picture?: string
  @Field()
  username: string;
}
