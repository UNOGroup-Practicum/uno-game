import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../store";

import { authAPI } from "../api/authApi";
import { User } from "../api/types";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authThunks = {
  me: createAsyncThunk<
    AuthState["user"],
    boolean | undefined,
    {
      rejectValue: AuthState["error"];
    }
  >("AUTH/me", async (showError = false, { rejectWithValue }) => {
    try {
      const result = await authAPI.me();

      return result;
    } catch (error) {
      if (showError && error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(null);
    }
  }),

  logout: createAsyncThunk("AUTH/logout", async () => authAPI.logout()),
};

export const authSlice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authThunks.me.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authThunks.me.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(authThunks.me.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload : null;
      state.user = null;
    });

    builder.addCase(authThunks.logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authThunks.logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
    });
    builder.addCase(authThunks.logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || null;
    });
  },
});

export const authSelect = (state: RootState) => state.auth;
