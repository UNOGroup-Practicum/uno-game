import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { userAPI } from "../api/userApi";
import { RootState } from "../store";

import { authSlice } from "./auth-slice";

type IsLoadingType = {
  avatar: boolean;
  profile: boolean;
};
type ErrorType = {
  avatar: string | null;
  profile: string | null;
};
type IsSuccessType = {
  profile: boolean;
};
type UserState = {
  isLoading: IsLoadingType;
  error: ErrorType;
  isSuccess: IsSuccessType;
};

export const initialState: UserState = {
  isLoading: {
    avatar: false,
    profile: false,
  },
  error: {
    avatar: null,
    profile: null,
  },
  isSuccess: {
    profile: false,
  },
};

export const userThunks = {
  changeUserAvatar: createAsyncThunk<void, FormData, { rejectValue: UserState["error"] }>(
    "USER/avatar",
    async (data, { dispatch }) => {
      const newUser = await userAPI.changeUserAvatar(data);
      dispatch(authSlice.actions.setUser(newUser));
    }
  ),
  changeUserProfile: createAsyncThunk<void, FormData, { rejectValue: UserState["error"] }>(
    "USER/profile",
    async (data, { dispatch }) => {
      const newUser = await userAPI.changeUserProfile(data);
      dispatch(authSlice.actions.setUser(newUser));
    }
  ),
};

export const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    resetError(state) {
      state.error = {
        avatar: null,
        profile: null,
      };
    },
    resetIsSuccess(state) {
      state.isSuccess = {
        profile: false,
      };
    },
  },
  extraReducers: (builder) => {
    // смена аватарки
    builder.addCase(userThunks.changeUserAvatar.pending, (state) => {
      state.isLoading.avatar = true;
      state.error.avatar = null;
    });
    builder.addCase(userThunks.changeUserAvatar.fulfilled, (state) => {
      state.isLoading.avatar = false;
    });
    builder.addCase(userThunks.changeUserAvatar.rejected, (state, action) => {
      state.isLoading.avatar = false;
      state.error.avatar = action.error.message ? action.error.message : null;
    });
    // редактирование профиля
    builder.addCase(userThunks.changeUserProfile.pending, (state) => {
      state.isLoading.profile = true;
      state.error.profile = null;
    });
    builder.addCase(userThunks.changeUserProfile.fulfilled, (state) => {
      state.isLoading.profile = false;
      state.isSuccess.profile = true;
    });
    builder.addCase(userThunks.changeUserProfile.rejected, (state, action) => {
      state.isLoading.profile = false;
      state.error.profile = action.error.message ? action.error.message : null;
    });
  },
});

export const userSelect = (state: RootState) => state.user;
