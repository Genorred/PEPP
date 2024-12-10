import { Field, InputType, Int, registerEnumType } from "@nestjs/graphql";

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

registerEnumType(SortOrder, {
  name: "SortOrder"
});

@InputType()
export class FindAlgorithmPostsInput {
  @Field(() => SortOrder, { nullable: true })
  createdAt?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  rating?: SortOrder;
  @Field(() => Int, { nullable: true })
  page?: number;
  @Field({ nullable: true })
  searchValue?: string;
  @Field(() => [String], { nullable: true })
  topics?: string[];
}
