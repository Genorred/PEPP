import { SortOrder } from '../../entities/types/sort-order';

export class FindUserPostsDto {
  userId: number;
  skipPages: number;
  createdAt?: SortOrder;
  rating?: SortOrder;
  topics?: string[];
  subTopics?: string[];
  topicsOrSubTopics?: string[];
}
