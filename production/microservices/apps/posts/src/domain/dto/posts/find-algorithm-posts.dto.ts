import { SortOrder } from "../../entities/types/sort-order";

export class FindAlgorithmPostsDto {
  createdAt?: SortOrder;
  rating?: SortOrder;
  skipPages?: number;
  searchValue?: string;
  topics?: string[];
}
