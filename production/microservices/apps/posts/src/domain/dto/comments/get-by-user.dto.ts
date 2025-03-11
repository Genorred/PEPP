import { SortOrder } from "../../entities/types/sort-order";

export class GetByUserDto {
  userId: number;
  isNotReply?: boolean;
  sortByDate?: SortOrder
  sortByPopularity?: SortOrder
  skipPages?: number;
}