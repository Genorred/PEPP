import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Roles } from ".prisma/client";
import { User as SharedUser } from "@_shared/entities/user.entity";


@ObjectType()
@Directive('@key(fields: "id")')
export class Friendship {
  @Field(() => Int)
  id: number;
  @Field()
  isAccepted: boolean;

  @Field(() => Int)
  senderId: number;
  @Field(() => Int)
  receiverId: number;
  @Field(() => Int)
  currentUserId: number;
  @Field()
  createdAt: Date;
}
