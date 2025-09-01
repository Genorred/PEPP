import React, { PropsWithChildren } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { configureStore, createSlice, Slice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "@/shared/lib/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/shared/api/queryClient";

const anySlice = createSlice({
  name: "any",
  initialState: {},
  selectors: {},
  reducers: {}
}).injectInto(rootReducer);

interface ExtendedRenderOptions<SlicesT extends [Slice]> extends Omit<RenderOptions, "queries"> {
  slices?: SlicesT;
  preloadedState?: {
    [SliceItem in SlicesT[number] as SliceItem["name"]]: ReturnType<SliceItem["getInitialState"]>
  };
}

export function setupStore(preloadedState?: Record<string, any>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

export function renderWithProviders<SlicesT extends [Slice]>(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions<SlicesT> = {}
) {
  const {
    preloadedState = {},
    ...renderOptions
  } = extendedRenderOptions;

  const store = setupStore(preloadedState);
  const queryClient = new QueryClient({
    defaultOptions: {

    }
  });

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );
  };


  return {
    store,
    wrapper: Wrapper,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}