import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersI } from "./domain";
import { rootReducer } from "@/shared/lib/redux";

const initialUsersState: FiltersI  = {
    topics: {},
    isDateDirDesc: null,
    title: ''
};
export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    selectors: {
        topics: (state: FiltersI)  => state.topics,
        title: (state: FiltersI)  => state.title,
        isDateDirDesc: (state: FiltersI)  => state.isDateDirDesc,
    },
    reducers: {
        setIsDateDirDesc: (state, action: PayloadAction< boolean >) => {
            state.isDateDirDesc = action.payload
        },
        setTitle: (state, action: PayloadAction< string >) => {
            state.title = action.payload
        },
        removeTopic: (state, action: PayloadAction< number >) => {
            delete state.topics[action.payload]
        },
        addTopic: (state, action: PayloadAction< number >) => {
            state.topics[action.payload] = true
        },
        resetAll: (state) => {
            state = initialUsersState;
        },
    },
}).injectInto(rootReducer);