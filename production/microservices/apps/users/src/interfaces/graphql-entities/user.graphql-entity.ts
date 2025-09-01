import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Roles } from '.prisma/client';
import { User as SharedUser } from '@_shared/entities/user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User implements SharedUser {
  @Field((type) => Int)
  id: number;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  username: string;
  @Field({ nullable: true })
  occupation?: string;
  @Field()
  role: Roles;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  img?: string;
  @Field()
  google_id?: string;
  // @Field((type) => [Post])
  // posts: Post[];
}
