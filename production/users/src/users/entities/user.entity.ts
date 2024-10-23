import { ObjectType, Field, Int, Directive, ID } from "@nestjs/graphql";
import { RolesT } from "src/auth/entities/roles.model";
import { User as UserPrisma, Roles } from ".prisma/client";


@ObjectType()
@Directive("@key(fields: \"id\")")
@Directive("@extends")
export class User {
  @Field((type) => ID)
  @Directive("@external")
  id: number;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
  @Field()
  role: Roles;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  @Field()
  picture?: string
  @Field()
  google_id?: string
  // @Field((type) => [Post])
  // posts: Post[];
}
