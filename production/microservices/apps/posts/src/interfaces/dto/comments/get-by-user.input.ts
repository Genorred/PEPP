import { Field, InputType, Int } from "@nestjs/graphql";
import { GetByUserDto } from "../../../domain/dto/comments/get-by-user.dto";
import { SortOrder } from "src/domain/sort-order";

@InputType()
export class GetByUserInput implements GetByUserDto {
  @Field(() => Int)
  userId: number;
  @Field(() => Int, { nullable: true })
  skipPages?: number;
  @Field({ nullable: true })
  isNotReply?: boolean;
  @Field(() => SortOrder, { nullable: true })
  sortByDate?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  sortByPopularity?: SortOrder;
}