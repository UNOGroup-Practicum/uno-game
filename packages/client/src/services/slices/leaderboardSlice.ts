import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { leaderboardAPI } from "services/api/leaderboardApi";
import { GetTeamLeboardData, UserToLeboardData } from "services/api/types";

import { RATING_FIELD_NAME } from "../../constants";
import { RootState } from "../store";

type TState = {
  winsAmount: number;
  gamesAmount: number;
  data: UserToLeboardData[];
};

const initialState: TState = {
  winsAmount: 0,
  gamesAmount: 0,
  data: [],
};

export const getLeaderboardData = createAsyncThunk(
  "leaderboard/getLeaderboardData",
  (_, { getState, dispatch }) => {
    const data: GetTeamLeboardData = {
      ratingFieldName: RATING_FIELD_NAME,
      cursor: 0,
      limit: 1000,
    };

    leaderboardAPI
      .getTeamLeaderboardAll(data)
      .then((res) => {
        const state = getState() as RootState;
        if (res.length > 0) {
          const result = res.map((el) => el.data).sort((a, b) => b.winsAmount - a.winsAmount);
          dispatch(leaderboardSlice.actions.setData(result));
        }
        const foundUser = state.leaderboard.data.find(
          (item) => item.email === state.auth.user?.email
        );
        if (foundUser) {
          dispatch(leaderboardSlice.actions.setWinsAmount(foundUser.winsAmount));
          dispatch(leaderboardSlice.actions.setGamesAmount(foundUser[RATING_FIELD_NAME]));
        } else {
          dispatch(leaderboardSlice.actions.setWinsAmount(0));
          dispatch(leaderboardSlice.actions.setGamesAmount(0));
        }
      })
      .catch((err) => console.log(err));
  }
);

export const postLeaderboardData = createAsyncThunk(
  "leaderboard/postLeaderboardData",
  (status: "win" | "lose", { getState, dispatch }) => {
    const leaderboard = (getState() as RootState).leaderboard;
    const user = (getState() as RootState).auth.user;
    let data: UserToLeboardData;

    if (user) {
      data = {
        name: `${user.firstName} ${user.secondName}`,
        email: user.email,
        avatar: user.avatar,
        winsAmount: status === "win" ? leaderboard.winsAmount + 1 : leaderboard.winsAmount,
        [RATING_FIELD_NAME]: leaderboard.gamesAmount + 1,
      };

      leaderboardAPI
        .addUserToLeaderboard(data)
        .then((res) => {
          if (res === "OK") {
            dispatch(getLeaderboardData());
          }
        })
        .catch((err) => console.log(err));
    }
  }
);

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TState[keyof Pick<TState, "data">]>) => {
      state.data = action.payload;
    },
    setWinsAmount: (state, action: PayloadAction<TState[keyof Pick<TState, "winsAmount">]>) => {
      state.winsAmount = action.payload;
    },
    setGamesAmount: (state, action: PayloadAction<TState[keyof Pick<TState, "gamesAmount">]>) => {
      state.gamesAmount = action.payload;
    },
  },
});

export const leaderboardSelect = (state: RootState) => state.leaderboard;
