import { rest } from "msw";
import { setupServer } from "msw/node";

import { LoginRequestData } from "services/api/types";

import { mainUser } from "./fixtures";

export const requestUrl = (endPoint: string) => `${process.env.API_ENDPOINT}/${endPoint}`;

const handlers = [
  rest.get(requestUrl("auth/user"), (_req, res, ctx) =>
    res(ctx.delay(10), ctx.status(200), ctx.json(mainUser))
  ),

  rest.post(requestUrl("auth/signin"), async (_req, res, ctx) => {
    const { login } = (await _req.json()) as LoginRequestData;

    return login === "valid"
      ? res(ctx.delay(10), ctx.status(200), ctx.text("OK"))
      : res(ctx.delay(10), ctx.status(401), ctx.json({ reason: "Login or password is incorrect" }));
  }),

  rest.post(requestUrl("auth/logout"), (_req, res, ctx) =>
    res(ctx.delay(10), ctx.status(200), ctx.text("OK"))
  ),
];

export const server = setupServer(...handlers);
