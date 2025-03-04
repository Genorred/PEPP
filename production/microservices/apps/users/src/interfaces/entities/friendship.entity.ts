import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Directive("@key(fields: \"id\")")
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
