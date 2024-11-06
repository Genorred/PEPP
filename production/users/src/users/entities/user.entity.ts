import { ObjectType, Field, Int, Directive, ID } from "@nestjs/graphql";
import { Roles } from ".prisma/client";
import { User as SharedUser } from "@shared/entities/user.entity"


@ObjectType()
@Directive('@key(fields: "id")')
export class User implements SharedUser{
  @Field((type) => ID)
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
