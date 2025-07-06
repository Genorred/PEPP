import React, { PropsWithChildren } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { configureStore, createSlice, Slice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "@/shared/lib/redux";

const anySlice = createSlice({
  name: "any",
  initialState: {},
  selectors: {},
  reducers: {}
}).injectInto(rootReducer);

interface ExtendedRenderOptions<SlicesT extends [Slice]> extends Omit<RenderOptions, "queries"> {
  slices?: SlicesT
  preloadedState?: {
    [SliceItem in SlicesT[number] as SliceItem['name']]: ReturnType<SliceItem['getInitialState']>
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

  const store = setupStore(preloadedState)

  const Wrapper = ({ children }: PropsWithChildren) => {
      return <Provider store={store}>{children}</Provider>
  };


  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}