import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IS_SSR } from "../../constants";
import { OAauthAPI } from "../api/OAuthApi";
import { OAuthLoginRequestData } from "../api/types";
import type { RootState } from "../store";

import { authThunks } from "./auth-slice";

type OAuthState = {
  loading: boolean;
  error: string | null;
};

const getRedirectUri = () => (IS_SSR ? "" : window.location.origin);

const OAUTH_URI_AUTHORIZE = "https://oauth.yandex.ru/authorize?response_type=code";
// Пока получаем id клиента динамически через API яндекса, берем для redirect_uri текущий домен
const REDIRECT_URI = getRedirectUri();

export const initialState: OAuthState = {
  loading: false,
  error: null,
};

export const oAuthThunks = {
  getServiceId: createAsyncThunk("OAUTH/getServiceId", async () => {
    if (IS_SSR) {
      return;
    }

    const { service_id } = await OAauthAPI.getServiceId({
      redirect_uri: REDIRECT_URI,
    });

    window.location.replace(
      `${OAUTH_URI_AUTHORIZE}&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
    );
  }),

  login: createAsyncThunk<
    void,
    OAuthLoginRequestData["code"],
    { rejectValue: OAuthState["error"] }
  >("OAUTH/login", async (code, { dispatch }) => {
    if (IS_SSR) {
      return;
    }

    await OAauthAPI.login({
      code,
      redirect_uri: REDIRECT_URI,
    });

    dispatch(authThunks.me());
  }),
};

export const oAuthSlice = createSlice({
  name: "OAUTH",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Если getServiceId.fulfilled, то происходит редирект на страницу яндекса для авторизации
    builder.addCase(oAuthThunks.getServiceId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(oAuthThunks.getServiceId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || null;
    });
  },
});

export const oAuthSelect = (state: RootState) => state.oauth;
