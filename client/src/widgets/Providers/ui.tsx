"use client";

import React, { PropsWithChildren } from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";

const Providers = ( {children}: PropsWithChildren) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;