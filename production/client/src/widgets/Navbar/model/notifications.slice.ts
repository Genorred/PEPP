import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/lib/redux";
import { User } from "@/entities/User/model/User";
import { isEmpty } from "lodash";

interface NotificationState {
  userRequests?: number
}
type State = {
  notifications: NotificationState
};

const initialUserState: State = {
  notifications: {}
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialUserState,
  selectors: {
    notifications: state => state.notifications,
    userRequests: state => state.notifications.userRequests,
    areAnyNotifications: state => !isEmpty(state.notifications)
  },
  reducers: {
    setUserRequests: (state, action: PayloadAction<number>) => {
      state.notifications.userRequests = action.payload
    }
  }
}).injectInto(rootReducer);
