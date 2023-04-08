import { requestUrl, server } from "__tests__/api-mock";
import { mainUser } from "__tests__/fixtures";
import { rest } from "msw";

import { SCHEMA_ERROR_MESSAGE } from "../../../constants";
import { authAPI } from "../authApi";
import { transformUser } from "../transformers";

describe("authAPI", () => {
  it("should authAPI.me return User", async () => {
    server.use(
      rest.get(requestUrl("auth/user"), (_req, res, ctx) =>
        res.once(ctx.status(200), ctx.json(mainUser))
      )
    );

    const result = await authAPI.me();

    expect(result).toEqual(transformUser(mainUser));
  });

  it("should authAPI.me return User if User has nullable fields", async () => {
    const stubUser = {
      ...mainUser,
      avatar: null,
      display_name: null,
      phone: null,
    };
    server.use(
      rest.get(requestUrl("auth/user"), (_req, res, ctx) =>
        res.once(ctx.status(200), ctx.json(stubUser))
      )
    );

    const result = await authAPI.me();

    expect(result).toEqual(transformUser(stubUser));
  });

  it("should throw an error when authAPI.me doesn't return a UserDTO", async () => {
    server.use(
      rest.get(requestUrl("auth/user"), (_req, res, ctx) => res.once(ctx.status(200), ctx.json({})))
    );

    await expect(async () => {
      await authAPI.me();
    }).rejects.toThrow(SCHEMA_ERROR_MESSAGE);
  });
});
