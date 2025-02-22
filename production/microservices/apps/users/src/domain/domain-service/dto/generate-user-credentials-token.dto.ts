import { User } from "../../entities/user.entity";

export interface GenerateUserCredentialsTokenDto extends Pick<User, "email" | "username" | "password"> {

}
