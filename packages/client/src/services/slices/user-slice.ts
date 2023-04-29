import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { PasswordChangeRequest, UpdateUserRequestData } from "../api/types";
import { userAPI } from "../api/userApi";
import { RootState } from "../store";

import { authSlice } from "./auth-slice";

type IsLoadingType = {
  avatar: boolean;
  profile: boolean;
  password: boolean;
};
type ErrorType = {
  avatar: string | null;
  profile: string | null;
  password: string | null;
};
type IsSuccessType = {
  profile: boolean;
  password: boolean;
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
    password: false,
  },
  error: {
    avatar: null,
    profile: null,
    password: null,
  },
  isSuccess: {
    profile: false,
    password: false,
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
  changeUserProfile: createAsyncThunk<
    void,
    UpdateUserRequestData,
    { rejectValue: UserState["error"] }
  >("USER/profile", async (data, { dispatch }) => {
    const newUser = await userAPI.changeUserProfile(data);
    dispatch(authSlice.actions.setUser(newUser));
  }),
  changeUserPassword: createAsyncThunk("USER/password", (data: PasswordChangeRequest) =>
    userAPI.changeUserPassword(data)
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
        password: null,
      };
    },
    resetIsSuccess(state) {
      state.isSuccess = {
        profile: false,
        password: false,
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
    // смена пароля
    builder.addCase(userThunks.changeUserPassword.pending, (state) => {
      state.isLoading.password = true;
      state.error.password = null;
    });
    builder.addCase(userThunks.changeUserPassword.fulfilled, (state) => {
      state.isLoading.password = false;
      state.isSuccess.password = true;
    });
    builder.addCase(userThunks.changeUserPassword.rejected, (state, action) => {
      state.isLoading.password = false;
      state.error.password = action.error.message ? action.error.message : null;
    });
  },
});

export const userSelect = (state: RootState) => state.user;
