import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";
import { UserCommentsFilterState } from "./types";

interface State {
  filters: UserCommentsFilterState;
}

export const initialUserFiltersState: State = {
  filters: {
    createdAt: null,
    popularity: null,
    showReplies: false
  }
};
export const userCommentsFiltersSlice = createSlice({
  name: "userCommentsFilters",
  initialState: initialUserFiltersState,
  selectors: {
    filter: (state: State) => state.filters
  },
  reducers: {
    setFilters: (state, action: PayloadAction<UserCommentsFilterState>) => {
      state.filters = action.payload;
    }
  }
}).injectInto(rootReducer);