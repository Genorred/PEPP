import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";

export const extraArgument = {
    // router,
};

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }),
});