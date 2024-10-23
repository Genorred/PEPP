import { User } from "../../users/entities/user.entity";

export type RolesT = User['role']
export enum Meta {
  Roles = 'ROLES',
}
