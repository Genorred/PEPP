import { SortOrder } from "@/shared/api/graphql/graphql";

export interface FilterState {
  createdAt: SortOrder | "none";
  rating: SortOrder | "none";
  search: string;
  topics: string[];
}