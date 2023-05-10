import { AsyncThunk } from "@reduxjs/toolkit";

import { AsyncThunkConfig } from "../api/types";

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, AsyncThunkConfig>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
export interface RejectedAction extends ReturnType<GenericAsyncThunk["rejected"]> {
  error: {
    message: string;
  };
}
