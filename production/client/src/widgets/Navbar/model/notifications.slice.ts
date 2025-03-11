import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";

export interface NotificationState {
  userRequests: number;
}

type State = {
  notifications: NotificationState
};

const initialUserState: State = {
  notifications: {
    userRequests: 0,
  }
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialUserState,
  selectors: {
    notifications: state => state.notifications,
    areAnyNotifications: state => !!(state.notifications.userRequests)
  },
  reducers: {
    setUserRequests: (state, action: PayloadAction<number>) => {
      state.notifications.userRequests = action.payload
    },
    decreaseUserRequests: (state) => {
      state.notifications.userRequests = Math.max(state.notifications.userRequests - 1, 0)
    }
  }
}).injectInto(rootReducer);
