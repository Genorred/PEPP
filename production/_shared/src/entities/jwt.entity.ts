import { User } from "@_shared/entities/user.entity";
import { RolesT } from "@_shared/entities/roles.entity";

export interface JwtPayload {
  username: User["username"];
  sub: User["id"];
  role: RolesT;
}