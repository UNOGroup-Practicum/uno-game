import { requestUrl, server } from "__tests__/api-mock";
import { mainUser } from "__tests__/fixtures";
import { renderWithRouter } from "__tests__/utils";
import { screen } from "@testing-library/react";
import { rest } from "msw";

import { initialState as authInitialState } from "services/slices/auth-slice";

import { ROUTES } from "../../constants";

import App from "./App";

describe("Components/App", () => {
  it("should render HomePage", async () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId("page-home")).toBeDefined();
  });

  it("should go to the LoginPage", async () => {
    server.use(
      rest.get(requestUrl("auth/user"), (_req, res, ctx) =>
        res.once(ctx.status(401), ctx.json({ reason: "Cookie is not valid" }))
      )
    );
    const { user } = renderWithRouter(<App />, {
      preloadedState: { auth: { ...authInitialState } },
    });

    await user.click(screen.getByText("Вход"));

    expect(screen.getByTestId("page-login")).toBeDefined();
  });

  it("should go to the RegisterPage from LoginPage", async () => {
    server.use(
      rest.get(requestUrl("auth/user"), (_req, res, ctx) =>
        res.once(ctx.status(401), ctx.json({ reason: "Cookie is not valid" }))
      )
    );
    const { user } = renderWithRouter(<App />, {
      route: ROUTES.signIn.path,
      preloadedState: { auth: { ...authInitialState } },
    });

    await user.click(screen.getByText("Нет аккаунта?"));

    expect(screen.getByTestId("page-register")).toBeDefined();
  });

  it("should go to the RulesPage", async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByText("Правила"));

    expect(screen.getByTestId("page-rules")).toBeDefined();
  });

  it("should go to the ForumPage", async () => {
    const { user } = renderWithRouter(<App />, {
      preloadedState: { auth: { ...authInitialState, user: mainUser } },
    });

    await user.click(screen.getByText("Форум"));

    expect(screen.getByTestId("page-forum-main")).toBeDefined();
  });

  it("should go to the LeaderboardPage", async () => {
    const { user } = renderWithRouter(<App />, {
      preloadedState: { auth: { ...authInitialState, user: mainUser } },
    });

    await user.click(screen.getByTestId("button-name"));
    await user.click(screen.getByText("Лидербоард"));

    expect(screen.getByTestId("page-leaderboard")).toBeDefined();
  });

  it("should go to the ProfilePage", async () => {
    const { user } = renderWithRouter(<App />, {
      preloadedState: { auth: { ...authInitialState, user: mainUser } },
    });

    await user.click(screen.getByTestId("button-name"));
    await user.click(screen.getByText("Профиль"));

    expect(screen.getByTestId("page-profile")).toBeDefined();
  });
});
