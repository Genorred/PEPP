import { SortOrder } from "@/shared/api/graphql/graphql";

export interface FilterState {
  createdAt: SortOrder | null;
  rating: SortOrder | null;
  search: string;
  topics: string[];
}