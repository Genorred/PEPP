import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { FindManyUserInput } from "../../../../interfaces/resolvers/dto-inputs/find-many-user.input";

@InputType()
export class UpdateUserDto extends FindManyUserInput {
  @Field(() => Int)
  id: number;
}
