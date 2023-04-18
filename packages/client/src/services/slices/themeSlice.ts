import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme } from "theme/ThemeContext";

import { RootState } from "../store";

type TState = {
  theme: Theme;
};

const initialState: TState = {
  theme: Theme.DARK,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TState[keyof Pick<TState, "theme">]>) => {
      state.theme = action.payload;
    },
  },
});

export const themeSelect = (state: RootState) => state.theme;
