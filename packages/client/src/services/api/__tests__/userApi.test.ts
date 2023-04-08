import { requestUrl, server } from "__tests__/api-mock";
import { mainUser } from "__tests__/fixtures";
import { rest } from "msw";

import { SCHEMA_ERROR_MESSAGE } from "../../../constants";
import { transformUser } from "../transformers";
import { userAPI } from "../userApi";

describe("userAPI", () => {
  it("should userAPI.changeUserAvatar return User", async () => {
    server.use(
      rest.put(requestUrl("user/profile/avatar"), (_req, res, ctx) =>
        res.once(ctx.status(200), ctx.json(mainUser))
      )
    );

    const result = await userAPI.changeUserAvatar(new FormData());

    expect(result).toEqual(transformUser(mainUser));
  });

  it("should userAPI.changeUserProfile return User", async () => {
    const stubUser = {
      ...mainUser,
      display_name: "Вася Василек",
      phone: "89137909090",
    };
    server.use(
      rest.put(requestUrl("user/profile"), (_req, res, ctx) =>
        res.once(ctx.status(200), ctx.json(stubUser))
      )
    );

    const result = await userAPI.changeUserProfile(stubUser);

    expect(result).toEqual(transformUser(stubUser));
  });

  it("should throw an error when userAPI.changeUserAvatar doesn't return a UserDTO", async () => {
    server.use(
      rest.put(requestUrl("user/profile/avatar"), (_req, res, ctx) =>
        res.once(ctx.status(200), ctx.json({}))
      )
    );

    await expect(async () => {
      await userAPI.changeUserAvatar(new FormData());
    }).rejects.toThrow(SCHEMA_ERROR_MESSAGE);
  });

  it("should throw an error when userAPI.changeUserProfile doesn't return a UserDTO", async () => {
    const stubUser = {
      ...mainUser,
      display_name: "Вася Василек",
      phone: "89137909090",
    };
    server.use(
      rest.put(requestUrl("user/profile"), (_req, res, ctx) =>
        res.once(ctx.status(200), ctx.json({}))
      )
    );

    await expect(async () => {
      await userAPI.changeUserProfile(stubUser);
    }).rejects.toThrow(SCHEMA_ERROR_MESSAGE);
  });
});
