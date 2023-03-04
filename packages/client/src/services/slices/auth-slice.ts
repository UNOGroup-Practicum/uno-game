import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "../store";

import { EAuthStatus } from "../../constants";
import { apiHasError } from "../api/apiRequest";
import { authAPI } from "../api/authApi";
import { User } from "../api/types";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  status: EAuthStatus;
};

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: EAuthStatus.pending,
};

const userGet = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    success(state, action: PayloadAction<AuthState["user"]>) {
      state.loading = false;
      state.user = action.payload;
    },
    error(state, action: PayloadAction<AuthState["error"]>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
    status(state, action: PayloadAction<AuthState["status"]>) {
      state.status = action.payload;
    },
  },
});

export const auth = () => async (dispatch: AppDispatch) => {
  dispatch(setRequest());

  const response = await authAPI.me();

  if (apiHasError(response)) {
    dispatch(setError(response.reason));
    dispatch(setStatus(EAuthStatus.no));

    return;
  }

  dispatch(setSuccess(response));
  dispatch(setStatus(EAuthStatus.ok));
};

export const selectAuth = (state: RootState) => state.auth;

export const {
  request: setRequest,
  success: setSuccess,
  error: setError,
  status: setStatus,
} = userGet.actions;

export const authReducer = userGet.reducer;
