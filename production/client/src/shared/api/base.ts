import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

export const clientBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/graphql";
export const apiClient = new GraphQLClient(clientBaseUrl, {
credentials: 'include',
})
export const serverBaseUrl =  "http://gateway:8080/graphql";
export const serverApiClient = new GraphQLClient(serverBaseUrl, {
  credentials: 'include',
})
export const queryClient = new QueryClient({

});
export const baseFetch = (url: string, init?: RequestInit) => {
    return fetch(clientBaseUrl + "/" + url, init).then((response) => response.json());
};