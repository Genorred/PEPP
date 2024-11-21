import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePostMutationVariables, User } from "@/shared/api/graphql/generated";
import { rootReducer } from "@/shared/lib/redux";
import { PostKeys } from "@/widgets/Editor/model/model";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { QueryKey } from "@tanstack/react-query";

export type mutatedData = Partial<Pick<CreatePostMutationVariables, 'body' | 'title' | 'topics' | 'subTopics'>>
type State = {
  mutatedData?: mutatedData | null
  initialDataQueryKey?: PostKeys | null
  sourceId?: number | null
  draftId?: number | null
  versionId?: number | null
};

const initialUserState: State = {
  mutatedData: null,
  initialDataQueryKey: null,
  sourceId: null,
  draftId: null,
  versionId: null
};

export const focusedPostSlice = createSlice({
  name: "editPost`",
  initialState: initialUserState,
  selectors: {
    all: state => ({
      mutatedData: state.mutatedData,
      initialDataQueryKey: state.initialDataQueryKey,
      sourceId: state.sourceId,
      draftId: state.draftId,
      versionId: state.versionId
    }),
    queryKey: state => state.initialDataQueryKey
  },
  reducers: {
    set: (state, action: PayloadAction<State>) => {
      state = action.payload;
    },
    setDraftId: (state, action: PayloadAction<number | null>) => {
      state.draftId = action.payload;
    },
    setInitialDataQuery: (state, action: PayloadAction<PostKeys | null>) => {
      state.initialDataQueryKey = action.payload;
    },
    spreadMutatedData: (state, action: PayloadAction<mutatedData>) => {
      state.mutatedData = {...state.mutatedData, ...action.payload};
    }
  }
}).injectInto(rootReducer);