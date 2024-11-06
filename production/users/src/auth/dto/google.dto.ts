import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GoogleInput {
  @Field()
  username: string;
  @Field()
  google_id: string;
  @Field()
  email: string;
  @Field({nullable: true})
  picture?: string
}
