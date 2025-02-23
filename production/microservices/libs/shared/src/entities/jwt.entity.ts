import { User } from "@_shared/entities/user.entity";
import { RolesT } from "@_shared/entities/roles.entity";

export interface JwtPayload {
  sub: User["id"];
  role: RolesT;
}