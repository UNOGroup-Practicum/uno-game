import { authSlice, initialState } from "../auth-slice";

describe("AUTH reducer", () => {
  it("should return the initial state", () => {
    expect(authSlice.reducer(undefined, { type: "_" })).toEqual(initialState);
  });

  // it("should handle request", () => {
  //   expect(reducer(undefined, slice.setRequest)).toEqual({
  //     ...initialState,
  //     loading: true,
  //     error: false,
  //   });
  // });

  // it("should handle success", () => {
  //   expect(
  //     reducer(
  //       undefined,
  //       slice.setSuccess({ success: true, user: { name: "Mary", email: "Mary@gmail.com" } })
  //     )
  //   ).toEqual({
  //     ...initialState,
  //     loading: false,
  //     user: { name: "Mary", email: "Mary@gmail.com" },
  //   });
  // });

  // it("should handle status", () => {
  //   const initialState: typeof initialState = {
  //     ...initialState,
  //     status: EAuthStatus.pending,
  //   };

  //   expect(reducer(initialState, slice.setStatus(EAuthStatus.ok))).toEqual({
  //     ...initialState,
  //     status: EAuthStatus.ok,
  //   });
  // });

  // it("should handle error", () => {
  //   expect(reducer(undefined, slice.setError("Test error"))).toEqual({
  //     ...initialState,
  //     user: null,
  //     loading: false,
  //     error: "Test error",
  //   });
  // });
});
