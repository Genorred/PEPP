import { Field, InputType, Int } from "@nestjs/graphql";
import { FindOneUserDto } from "../../../../domain/dto/input/users/find-one-user.dto";

@InputType()
export class FindOneUserInput implements FindOneUserDto {
  @Field({ nullable: true })
  username?: string;
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field({ nullable: true })
  email?: string;
}
