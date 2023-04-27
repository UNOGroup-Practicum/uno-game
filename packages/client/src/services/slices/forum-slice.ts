import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  ForumState,
  RequestMessage,
  RequestReaction,
  RequestTheme,
} from "pages/ForumPage/types/types";

import { forumAPI } from "../api/forumApi";
import { RootState } from "../store";

import { FulfilledAction, PendingAction, RejectedAction } from "./types";

export const initialState: ForumState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  themes: [],
  currentMessages: [],
};

export const forumThunks = {
  // темы
  getThemes: createAsyncThunk("FORUM/themes", async (_, { dispatch }) => {
    const newThemes = await forumAPI.getThemes();
    dispatch(forumSlice.actions.setForumThemes(newThemes));
  }),
  postTheme: createAsyncThunk<void, RequestTheme, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (data, { dispatch }) => {
      const newThemes = await forumAPI.postThemes(data);
      dispatch(forumSlice.actions.setForumThemes(newThemes));
    }
  ),
  deleteTheme: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (themeId, { dispatch }) => {
      const newThemes = await forumAPI.deleteTheme(themeId);
      dispatch(forumSlice.actions.setForumThemes(newThemes));
    }
  ),
  // сообщения
  getMessages: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/messages",
    async (themeId, { dispatch }) => {
      const newMessages = await forumAPI.getMessages(themeId);
      dispatch(forumSlice.actions.setForumCurrentMessages(newMessages));
    }
  ),
  postMessage: createAsyncThunk<void, RequestMessage, { rejectValue: ForumState["error"] }>(
    "FORUM/messages",
    async (data, { dispatch }) => {
      const newMessages = await forumAPI.postMessage(data);
      dispatch(forumSlice.actions.setForumCurrentMessages(newMessages));
    }
  ),
  // реакции
  getReactions: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/reactions",
    async (message_id, { dispatch }) => {
      const newReactions = await forumAPI.getReactions(message_id);
      dispatch(forumSlice.actions.setForumThemes(newReactions));
    }
  ),
  postReaction: createAsyncThunk<void, RequestReaction, { rejectValue: ForumState["error"] }>(
    "FORUM/reactions",
    async (data, { dispatch }) => {
      const newThemes = await forumAPI.postReaction(data);
      dispatch(forumSlice.actions.setForumThemes(newThemes));
    }
  ),
  deleteReaction: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/reactions",
    async (themeId, { dispatch }) => {
      const newThemes = await forumAPI.deleteTheme(themeId);
      dispatch(forumSlice.actions.setForumThemes(newThemes));
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
    setForumThemes(state, action) {
      state.themes = action.payload;
    },
    setForumCurrentMessages(state, action) {
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
