"use client";
import React, { PropsWithChildren } from "react";
import { persistor, store } from "@/app/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/base";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const ClientProviders = ({ children }: PropsWithChildren) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}>
              <ReactQueryDevtools />
              {children}
            </GoogleOAuthProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
};