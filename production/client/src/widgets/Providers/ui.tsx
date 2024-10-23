"use client";

import React, { PropsWithChildren } from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Providers = ( {children}: PropsWithChildren) => {
  console.log(process.env.NEXT_PUBLIC_CLIENT_ID)
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID as string}>
        {children}
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default Providers;