import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/graphql/generated";
import { rootReducer } from "@/shared/lib/redux";

type State = {
  user: Partial<User> | null
};

const initialUserState: State = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  selectors: {
    user: state => state.user
  },
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User> | null>) => {
      state.user = action.payload;
    }
  },
}).injectInto(rootReducer);