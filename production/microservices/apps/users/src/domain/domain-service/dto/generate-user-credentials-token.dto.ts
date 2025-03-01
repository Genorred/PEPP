import { User } from "../../../interfaces/entities/user.entity";

export interface GenerateUserCredentialsTokenDto extends Pick<User, "email" | "username" | "password"> {

}
