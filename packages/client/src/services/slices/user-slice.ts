import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { transformUser } from "../api/transformers";
import { userAPI } from "../api/userApi";
import { RootState } from "../store";

import { authSlice } from "./auth-slice";

type UserState = {
  isLoading: boolean;
  error: string | null;
};

export const initialState: UserState = {
  isLoading: false,
  error: null,
};

export const userThunks = {
  changeUserAvatar: createAsyncThunk<void, FormData, { rejectValue: UserState["error"] }>(
    "USER/avatar",
    async (data, { dispatch }) => {
      const result = await userAPI.changeUserAvatar(data);
      const newUser = transformUser(result);
      dispatch(authSlice.actions.setUser(newUser));
    }
  ),
};

export const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userThunks.changeUserAvatar.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userThunks.changeUserAvatar.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(userThunks.changeUserAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

export const userSelect = (state: RootState) => state.user;
