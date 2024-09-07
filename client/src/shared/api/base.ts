import {QueryClient} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const queryClient = new QueryClient();
export const baseFetch = (url: string, init?: RequestInit) => {
    return fetch(baseUrl + "/" + url, init).then((response) => response.json());
};