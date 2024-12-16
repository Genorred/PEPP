import { QueryClient } from "@tanstack/react-query";
import { ClientError, GraphQLClient } from "graphql-request";
import { hosts } from "@_config/hosts";
import { toast } from "sonner";
import { getGraphqlErrors } from "@/shared/api/getGraphqlErrors";

export const clientBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/graphql";
export const apiClient = new GraphQLClient(clientBaseUrl, {
  credentials: "include"
});

// export const fetchWithAmplify = <TData, TVariables>(query: string, variables?: TVariables, options?: RequestInit["headers"]): (() => Promise<TData>) => {
//   return async () => {
//     const result = await (api.graphql({
//       query,
//       variables: variables || {},
//       authmode: "amazon_cognito_user_pools"
//     }) as unknown as promise<graphqlresult<tdata>>);
//
//     if (result.errors) {
//       const message = result.errors ? result.errors[0].message : "graphql fetching error";
//       throw new error(message);
//     }
//
//     return result.data!;
//   };
// };

export function fetcher<TData, TVariables extends {
  [key: string]: any
}>(query: string, variables?: TVariables, requestHeaders?: RequestInit["headers"]) {
  return async () => {
    return await apiClient.request<TData>({
      document: query,
      variables,
      requestHeaders
    });
    //
    // // @ts-ignore
    // if (result?.errors) {
    //   // @ts-ignore
    //   const message = result.errors ? result.errors[0].message : "graphql fetching error";
    // }
    // console.log('result', result);
    // return result

    // return apiClient.request<TData>({
    //   document: query,
    //   variables,
    //   requestHeaders
    // });
  };
}

export const serverBaseUrl = `http://${hosts.gateway}:8080/graphql`;
export const serverApiClient = new GraphQLClient(serverBaseUrl, {
  credentials: "include"
});
const onError = (error: unknown) => {
  console.log("xd");
  if (error instanceof ClientError) {
    error.response.errors?.forEach(error => {
      toast.error(error.message);
    });
  } else if (error instanceof Error) {
    toast.error(error.message);
  }
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
    mutations: {
      onError
    }
  }
});
export const baseFetch = (url: string, init?: RequestInit) => {
  return fetch(clientBaseUrl + "/" + url, init).then((response) => response.json());
};