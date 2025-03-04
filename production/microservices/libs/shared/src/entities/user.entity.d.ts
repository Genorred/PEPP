import { RolesT } from "./roles.entity";

export declare class User {
  id: number;
  email: string;
  password: string;
  username: string;
  role: RolesT;
  createdAt: Date;
  updatedAt: Date;
  picture?: string;
  google_id?: string;
}
