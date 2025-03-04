import { ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "../../../interfaces/entities/user.entity";

@ObjectType()
export class UserResponse extends OmitType(User, ["password"]) {

}