import { User } from "@shared/entities/user.entity";
import { RolesT } from "@shared/entities/roles.entity";

export interface JwtPayload {
  username: User['username'];
  sub: User['id']
  role: RolesT
}