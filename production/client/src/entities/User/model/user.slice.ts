import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/shared/api/graphql/generated";
import { rootReducer } from "@/shared/lib/redux";
import { refreshTokenLife } from "@_config/auth";

type State = {
  user: Partial<User> & {
    expireDate: number
  } | null
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
      state.user = {
        ...action.payload,
        expireDate: Date.now() + refreshTokenLife
      };
    }
  }
}).injectInto(rootReducer);