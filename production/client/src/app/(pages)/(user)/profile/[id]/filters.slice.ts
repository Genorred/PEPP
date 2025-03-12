import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";
import { UserFilterState } from "./domain";

interface State {
  filters: UserFilterState;
}

export const initialUserFiltersState: State = {
  filters: {
    topics: [],
    subTopics: [],
    topicsAndSubTopics: [],
    createdAt: null,
    rating: null
  }
};
export const userFiltersSlice = createSlice({
  name: "userPostsFilters",
  initialState: initialUserFiltersState,
  selectors: {
    filter: (state: State) => state.filters
  },
  reducers: {
    setFilters: (state, action: PayloadAction<UserFilterState>) => {
      state.filters = action.payload;
    }
  }
}).injectInto(rootReducer);