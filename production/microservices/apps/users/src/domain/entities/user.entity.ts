import { User as SharedUser } from "@_shared/entities/user.entity";
import { RolesT } from "@_shared/entities/roles.entity";
export class UserEntity implements SharedUser {
  id: number;
  email: string;
  password: string;
  username: string;
  occupation?: string;
  role: RolesT;
  createdAt: Date;
  updatedAt: Date;
  img?: string;
  google_id?: string;
}
