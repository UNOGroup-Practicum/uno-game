import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  MessageType,
  RequestMessage,
  RequestTheme,
  ThemeType,
} from "../../pages/ForumPage/types/types";
import { forumAPI } from "../api/forumApi";
import { AsyncThunkConfig } from "../api/types";
import { RootState } from "../store";

type ForumState = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  themes: ThemeType[];
  currentMessages: MessageType[];
};

export const initialState: ForumState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  themes: [],
  currentMessages: [],
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, AsyncThunkConfig>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
interface RejectedAction extends ReturnType<GenericAsyncThunk["rejected"]> {
  error: {
    message: string;
  };
}

export const forumThunks = {
  // TODO: исправить типизацию - убрать true
  getForumThemes: createAsyncThunk("FORUM/themes", async (_, { dispatch }) => {
    const newThemes = await forumAPI.getForumThemes();
    dispatch(forumSlice.actions.setForumThemes(newThemes));
  }),
  postForumTheme: createAsyncThunk<void, RequestTheme, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (data, { dispatch }) => {
      const newThemes = await forumAPI.postForumThemes(data);
      dispatch(forumSlice.actions.setForumThemes(newThemes));
    }
  ),
  deleteForumTheme: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (themeId, { dispatch }) => {
      const newThemes = await forumAPI.deleteForumTheme(themeId);
      dispatch(forumSlice.actions.setForumThemes(newThemes));
    }
  ),
  getForumCurrentMessages: createAsyncThunk<void, number, { rejectValue: ForumState["error"] }>(
    "FORUM/messages",
    async (themeId, { dispatch }) => {
      const newMessages = await forumAPI.getForumThemeMessages(themeId);
      dispatch(forumSlice.actions.setForumCurrentMessages(newMessages));
    }
  ),
  postForumThemeMessage: createAsyncThunk<
    void,
    RequestMessage,
    { rejectValue: ForumState["error"] }
  >("FORUM/themes", async (data, { dispatch }) => {
    const newMessages = await forumAPI.postForumThemeMessage(data);
    dispatch(forumSlice.actions.setForumCurrentMessages(newMessages));
  }),
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

    // получение тем
    // builder.addCase(forumThunks.getForumThemes.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });
    // builder.addCase(forumThunks.getForumThemes.fulfilled, (state) => {
    //   state.isLoading = false;
    // });
    // builder.addCase(forumThunks.getForumThemes.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message ? action.error.message : null;
    // });

    // создание темы
    // builder.addCase(forumThunks.postForumTheme.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });
    // builder.addCase(forumThunks.putForumThemes.fulfilled, (state) => {
    //   state.isLoading = false;
    // });
    // builder.addCase(forumThunks.putForumThemes.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message ? action.error.message : null;
    // });
  },
});

export const forumSelect = (state: RootState) => state.forum;
