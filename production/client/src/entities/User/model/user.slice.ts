import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";

interface User {
  username: string
  email: string
  id: number
  createdAt: any
  img?: string | null
}
type State = {
  user: User & {
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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload && {
        ...action.payload,
        expireDate: Date.now() + 2419200000
      };
    }
  }
}).injectInto(rootReducer);