import { ClientError, GraphQLClient } from "graphql-request";
import { toast } from "sonner";

export const clientBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/graphql";
export const apiClient = new GraphQLClient(clientBaseUrl, {
  credentials: "include"
});

export function fetcher<TData, TVariables extends {
  [key: string]: any
}>(query: string, variables?: TVariables, requestHeaders?: RequestInit["headers"]) {
  return async () => {
    return await apiClient.request<TData>({
      document: query,
      variables,
      requestHeaders
    });
  };
}

export const serverBaseUrl = process.env.SERVER_API_BASE_URL || "http://gateway:8080/graphql";
export const serverApiClient = new GraphQLClient(serverBaseUrl, {
  credentials: "include",
  cache: "force-cache"
});
// const onError = (error: unknown) => {
//   console.log("xd");
//   if (error instanceof ClientError) {
//     error.response.errors?.forEach(error => {
//       toast.error(error.message);
//     });
//   } else if (error instanceof Error) {
//     toast.error(error.message);
//   }
// };
// export const baseFetch = (url: string, init?: RequestInit) => {
//   return fetch(clientBaseUrl + "/" + url, init).then((response) => response.json());
// };