import { User } from "../../../interfaces/entities/user.entity";

export interface GenerateTokenDto extends Pick<User, "id" | "role"> {

}