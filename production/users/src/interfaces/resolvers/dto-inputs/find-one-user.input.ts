import { Field, InputType } from "@nestjs/graphql";
import { FindOneUserDto } from "../../../domain/dto/input/users/find-one-user.dto";

@InputType()
export class FindOneUserInput implements FindOneUserDto {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;
}
