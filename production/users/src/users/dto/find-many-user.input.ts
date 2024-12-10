import { InputType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class FindManyUserInput extends PartialType(CreateUserInput) {
}
