import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authAPI } from "../api/authApi";
import { LoginRequestData, RegisterRequestData, User } from "../api/types";
import type { RootState } from "../store";

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

const thunkMe = createAsyncThunk<
  AuthState["user"],
  boolean | undefined,
  { rejectValue: AuthState["error"] }
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
});

export const authThunks = {
  me: thunkMe,

  logout: createAsyncThunk("AUTH/logout", async () => authAPI.logout()),

  login: createAsyncThunk<void, LoginRequestData, { rejectValue: AuthState["error"] }>(
    "AUTH/login",
    async (data, { dispatch }) => {
      await authAPI.login(data);
      dispatch(thunkMe());
    }
  ),

  register: createAsyncThunk<void, RegisterRequestData, { rejectValue: AuthState["error"] }>(
    "AUTH/register",
    async (data, { dispatch }) => {
      await authAPI.register(data);
      dispatch(thunkMe());
    }
  ),
};

export const authSlice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
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

    // Если login.fulfilled, то запускается authThunks.me - в нем завершение запроса
    builder.addCase(authThunks.login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authThunks.login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || null;
    });

    // Если register.fulfilled, то запускается authThunks.me - в нем завершение запроса
    builder.addCase(authThunks.register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authThunks.register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || null;
    });
  },
});

export const authSelect = (state: RootState) => state.auth;
