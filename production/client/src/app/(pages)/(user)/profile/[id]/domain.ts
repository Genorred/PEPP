import { SortOrder } from "@/shared/api/graphql/graphql";

export interface UserFilterState {
  createdAt: SortOrder | null;
  rating: SortOrder | null;
  topics: string[];
  subTopics: string[];
  topicsAndSubTopics: string[];
}