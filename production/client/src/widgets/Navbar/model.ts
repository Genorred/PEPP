import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";

const MAX_HEIGHT = -64; // Half of navbar height
const HALF_MAX = -32;

interface State {
  scroll: number;
  lastScrollTop: number;
  isMobile: boolean;
  scrollTimeout: NodeJS.Timeout
}

const initialState: State = {
  scroll: 0,
  lastScrollTop: 0,
  isMobile: false,
  scrollTimeout:
};
const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  selectors: {
    scroll: state => state.scroll
  },
  reducers: {
    setScroll: (state, action: PayloadAction<State>) => {
      const { scroll } = action.payload;
      if (state.isMobile) return;
      const scrollTop = document.documentElement.scrollTop;
      const difference = state.lastScrollTop - scrollTop;
      let newValue = state.scroll + difference;
      state.scroll = Math.min(0, Math.max(newValue, MAX_HEIGHT)); // Clamp between 0 and MAX_HEIGHT
    },

  }
}).injectInto(rootReducer);