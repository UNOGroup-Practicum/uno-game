import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RequestTheme, Theme } from "../../pages/ForumPage/types/types";
import { forumAPI } from "../api/forumApi";
import { RootState } from "../store";

type ForumState = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  themes: Theme[];
};

export const initialState: ForumState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  themes: [],
};

export const forumThunks = {
  // TODO: исправить типизацию - убрать true
  getForumThemes: createAsyncThunk<void, true, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (data, { dispatch }) => {
      const newForumThemes = await forumAPI.getForumThemes();
      dispatch(forumSlice.actions.setForumThemes(newForumThemes));
    }
  ),
  putForumThemes: createAsyncThunk<void, RequestTheme, { rejectValue: ForumState["error"] }>(
    "FORUM/themes",
    async (data, { dispatch }) => {
      const newForumThemes = await forumAPI.putForumThemes(data);
      // TODO: запись в state должна делаться здесь или в extraReducers после fulfilled?
      dispatch(forumSlice.actions.setForumThemes(newForumThemes));
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
  },
  extraReducers: (builder) => {
    // TODO: нельзя ли объединить одинаковые действия?
    // получение тем
    builder.addCase(forumThunks.getForumThemes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forumThunks.getForumThemes.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forumThunks.getForumThemes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : null;
    });
    // получение тем
    // builder.addCase(forumThunks.putForumThemes.pending, (state) => {
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
