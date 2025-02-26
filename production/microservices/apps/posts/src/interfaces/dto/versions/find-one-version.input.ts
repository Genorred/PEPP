import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { FindOneVersionDto } from "../../../domain/dto/versions/find-one-version.dto";

@InputType()
export class FindOneVersionInput implements FindOneVersionDto {
  @Field(() => Int)
  id: number;
}
