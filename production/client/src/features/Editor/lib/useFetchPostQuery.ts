import { useGetFetchQuery } from "@/shared/api/useGetFetchQuery";
import { DraftQuery, PostQuery } from "@/shared/api/graphql/graphql";
import { PostKeys } from "@/features/Editor/model/model";

type QueryResult<K extends PostKeys> = K extends "post" ? PostQuery[K] : DraftQuery["draft"]
export const useFetchPostQuery = <K extends PostKeys | null>(queryKey?: K) => {
  if (!queryKey) {
    return;
  }
  type KeysType = (typeof queryKey[0])

  const data = useGetFetchQuery(queryKey);
  return data[queryKey[0]] as QueryResult<NonNullable<K>>;
};