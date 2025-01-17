import { ObjectType, OmitType } from "@nestjs/graphql";
import { User } from "../../entities/user.entity";

@ObjectType()
export class UserResponse extends  OmitType(User, ['password']){

}