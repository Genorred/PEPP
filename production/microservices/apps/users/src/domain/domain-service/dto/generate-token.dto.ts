import { User } from "../../entities/user.entity";

export interface GenerateTokenDto extends Pick<User, "id" | "username" | "role"> {

}