import { mainUser } from "__tests__/fixtures";
import { delay, withoutMetaKey } from "__tests__/utils";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { transformUser } from "services/api/transformers";

import { authSlice, authThunks, initialState } from "../auth-slice";

describe("AUTH slice", () => {
  it("should return the initial state", () => {
    expect(authSlice.reducer(undefined, { type: "_" })).toEqual(initialState);
  });

  it("should handle resetError", () => {
    const state: typeof initialState = {
      ...initialState,
      error: "test error",
    };

    expect(authSlice.reducer(state, authSlice.actions.resetError())).toEqual({
      ...state,
      error: null,
    });
  });

  it("should handle setUser", () => {
    const state: typeof initialState = {
      ...initialState,
      user: null,
    };

    expect(
      authSlice.reducer(state, authSlice.actions.setUser({ name: "Mary", email: "Mary@gmail.com" }))
    ).toEqual({
      ...state,
      user: { name: "Mary", email: "Mary@gmail.com" },
    });
  });

  it("should handle authThunks.me and set user", async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ ...initialState });
    const expectedActions = [
      authThunks.me.pending("requestId", undefined),
      authThunks.me.fulfilled({ ...transformUser(mainUser) }, "requestId", undefined),
    ];

    await store.dispatch(authThunks.me() as never);
    const evaluatedActions = store.getActions();

    expect(withoutMetaKey(evaluatedActions)).toEqual(withoutMetaKey(expectedActions));
  });

  it("should handle authThunks.login and set user", async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ ...initialState });
    const loginRequestData = { login: "valid", password: "valid" };
    const expectedActions = [
      authThunks.login.pending("requestId", loginRequestData),
      authThunks.me.pending("requestId", undefined),
      authThunks.login.fulfilled(undefined, "requestId", loginRequestData),
      authThunks.me.fulfilled({ ...transformUser(mainUser) }, "requestId", undefined),
    ];

    await store.dispatch(authThunks.login(loginRequestData) as never);
    // После логина в authThunks.login срабатывает authThunks.me
    // Задержка позволяет authThunks.me завершиться
    await delay(100);
    const evaluatedActions = store.getActions();

    expect(withoutMetaKey(evaluatedActions)).toEqual(withoutMetaKey(expectedActions));
  });

  it("should handle authThunks.login and set error", async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ ...initialState });
    const loginRequestData = { login: "invalid", password: "invalid" };
    const expectedActions = [
      authThunks.login.pending("requestId", loginRequestData),
      authThunks.login.rejected(null, "requestId", loginRequestData),
    ];

    await store.dispatch(authThunks.login(loginRequestData) as never);
    const evaluatedActions = store.getActions();

    expect(withoutMetaKey(evaluatedActions)).toEqual(withoutMetaKey(expectedActions));
  });

  it("should handle authThunks.logout and reset user", async () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ ...initialState, user: transformUser(mainUser) });
    const expectedActions = [
      authThunks.logout.pending("requestId", undefined),
      authThunks.logout.fulfilled("OK", "requestId", undefined),
    ];

    await store.dispatch(authThunks.logout() as never);
    const evaluatedActions = store.getActions();

    expect(withoutMetaKey(evaluatedActions)).toEqual(withoutMetaKey(expectedActions));
  });
});
