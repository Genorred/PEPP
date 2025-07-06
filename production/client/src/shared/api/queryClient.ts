import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // onError,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
    mutations: {
      // onError
    }
  }
});