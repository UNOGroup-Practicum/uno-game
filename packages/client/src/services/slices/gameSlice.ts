import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TState = {
  gameVariant: "solo" | "withFriends" | null;
};

const initialState: TState = {
  gameVariant: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameVariant: (state, action: PayloadAction<TState[keyof Pick<TState, "gameVariant">]>) => {
      state.gameVariant = action.payload;
    },
  },
});

export const { setGameVariant } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
