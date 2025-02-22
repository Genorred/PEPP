import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";

const MAX_HEIGHT = -64; // Half of navbar height
const HALF_MAX = -32;

interface State {
  topPosition: number;
  lastScrollTop: number;
  isMobile: boolean;
}

const initialState: State = {
  topPosition: 0,
  lastScrollTop: 0,
  isMobile: false,
};
export const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  selectors: {
    topPosition: state => state.topPosition,
    isScrolling: state => !!state.topPosition,
    isMobile: state => state.isMobile,
  },
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    handleScroll: (state, action: PayloadAction<number>) => {
        if (!state.isMobile) return;

        const scrollTop = action.payload;
        const difference = state.lastScrollTop - scrollTop;

        let newValue = state.topPosition + difference;
        state.topPosition = Math.min(0, Math.max(newValue, MAX_HEIGHT)); // Clamp
        state.lastScrollTop = scrollTop;
    },
    setTopPosition: (state, action: PayloadAction<number>) => {
      state.topPosition = action.payload;
    },
    handleTouchEnd: (state) => {
      if (!state.isMobile) return; // Skip logic if not mobile
      // Snap navbar position after scrolling stops
      state.topPosition = state.topPosition >= HALF_MAX ? 0 : MAX_HEIGHT;
    }

  }
}).injectInto(rootReducer);