import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { forumAPI } from "../api/forumApi";
import {
  ForumState,
  RequestMessage,
  RequestReaction,
  RequestTheme,
  TUserService,
} from "../api/types";
import { RootState } from "../store";

import { FulfilledAction, PendingAction, RejectedAction } from "./types";

export const initialState: ForumState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  themes: [],
  currentMessages: [],
  currentReactions: [],
};

export const forumThunks = {
  // темы
  getThemes: createAsyncThunk("FORUM/themes", async (_, { extra, dispatch }) => {
    const service: TUserService = extra as TUserService;
    const newThemes = await service.getForumThemes();

    dispatch(forumSlice.actions.setThemes(newThemes));
  }),
  postTheme: createAsyncThunk<void, string, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (title, { dispatch, getState }) => {
      const state = getState() as RootState;
      const user_id = state.auth.user?.id as number;
      const newThemes = await forumAPI.postThemes({ title, user_id });
      dispatch(forumSlice.actions.setThemes(newThemes));
    }
  ),
  deleteTheme: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (themeId, { dispatch }) => {
      const newThemes = await forumAPI.deleteTheme(themeId);
      dispatch(forumSlice.actions.setThemes(newThemes));
    }
  ),
  // сообщения
  getMessages: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/messages",
    async (themeId, { dispatch }) => {
      const newData = await forumAPI.getMessages(themeId);
      const newMessages = newData.messages;
      const newReactions = newData.reactions;
      dispatch(forumSlice.actions.setMessages(newMessages));
      dispatch(forumSlice.actions.setReactions(newReactions));
    }
  ),
  postMessage: createAsyncThunk<void, RequestMessage, { rejectValue: ForumState["error"] }>(
    "FORUM/messages",
    async (data, { dispatch }) => {
      const newMessages = await forumAPI.postMessage(data);
      dispatch(forumSlice.actions.setMessages(newMessages));
    }
  ),
  // реакции
  getReactions: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/reactions",
    async (theme_id, { dispatch }) => {
      const newReactions = await forumAPI.getReactions(theme_id);
      dispatch(forumSlice.actions.setReactions(newReactions));
    }
  ),
  postReaction: createAsyncThunk<void, RequestReaction, { rejectValue: ForumState["error"] }>(
    "FORUM/reactions",
    async (data, { dispatch }) => {
      const newReactions = await forumAPI.postReaction(data);
      dispatch(forumSlice.actions.setReactions(newReactions));
    }
  ),
  deleteReaction: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/reactions",
    async (reaction_id, { dispatch }) => {
      const newReactions = await forumAPI.deleteReactions(reaction_id);
      dispatch(forumSlice.actions.setReactions(newReactions));
    }
  ),
};

export const forumSlice = createSlice({
  name: "FORUM",
  initialState,

  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetIsSuccess(state) {
      state.isSuccess = false;
    },
    setThemes(state, action) {
      state.themes = action.payload;
    },
    setMessages(state, action) {
      state.currentMessages = action.payload;
    },
    setReactions(state, action) {
      state.currentReactions = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message ? action.error.message : null;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const forumSelect = (state: RootState) => state.forum;
