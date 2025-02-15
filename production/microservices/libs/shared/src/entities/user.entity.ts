import { RolesT } from "./roles.entity";

export class User {
  id: number;
  email: string;
  password: string;
  username: string;
  role: RolesT;
  createdAt: Date;
  updatedAt: Date;

  picture?: string;
  google_id?: string;
  // @Field((type) => [Post])
  // posts: Post[];
}
