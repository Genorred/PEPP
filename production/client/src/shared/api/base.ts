import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/graphql";
export const graphqlClient = new GraphQLClient(baseUrl, {
credentials: 'include',
})
export const queryClient = new QueryClient({

});
export const baseFetch = (url: string, init?: RequestInit) => {
    return fetch(baseUrl + "/" + url, init).then((response) => response.json());
};