import { useGetFetchQuery } from "@/shared/api/useGetFetchQuery";
import { DraftQuery, PostQuery } from "@/shared/api/graphql/graphql";
import { PostKeys } from "@/features/Editor/model/model";

type QueryResult<K extends PostKeys> = K extends "post" ? PostQuery[K] : DraftQuery["draft"]
export const useFetchPostQuery = <K extends PostKeys | null>(queryKey?: K) => {
  const data = useGetFetchQuery(queryKey ?? []);
  if (!queryKey) return null;
  return data[queryKey[0]] as QueryResult<NonNullable<K>>;
};