import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";
import { FilterState } from "@/widgets/PostsFilter/model/domain";

interface State {
  filters: FilterState;
}

export const initialFiltersState: State = {
  filters: {
    topics: [],
    createdAt: null,
    search: "",
    rating: null
  }
};
export const filtersSlice = createSlice({
  name: "postsFilters",
  initialState: initialFiltersState,
  selectors: {
    filter: (state: State) => state.filters
  },
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    }
  }
}).injectInto(rootReducer);