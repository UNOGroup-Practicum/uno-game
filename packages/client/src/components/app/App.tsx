import { useEffect } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";

import { useDispatch } from "services/hooks";
import { getOAuthRedirectUri, oAuthThunks } from "services/slices/oauth-slice";
import { Theme } from "theme/ThemeContext";
import { useTheme } from "theme/useTheme";
import { toggleFullScreen } from "utils/toggleFullScreen";

import { ForumMessagesListPage } from "pages/ForumPage/ForumMessagesListPage";
import { ForumThemesListPage } from "pages/ForumPage/ForumThemesListPage";
import GamePage from "pages/GamePage";
import GamePreparingPage from "pages/GamePreparingPage";
import { HomePage } from "pages/HomePage/HomePage";
import { LiderboardPage } from "pages/LiderboardPage/LiderboardPage";
import { LoginPage } from "pages/LoginPage/LoginPage";
import { ProfilePage } from "pages/ProfilePage/ProfilePage";
import { RegisterPage } from "pages/RegisterPage/RegisterPage";
import { RulesPage } from "pages/RulesPage/RulesPage";

import { AppFooterWithErrorBoundary } from "components/app-footer/AppFooter";
import { AppHeaderWithErrorBoundary } from "components/app-header/AppHeader";
import { AuthPagesRoute } from "components/auth-pages-route/AuthPagesRoute";
import { ErrorBoundary } from "components/error-boundary/ErrorBoundary";
import { ProtectedRoute } from "components/protected-route/ProtectedRoute";

import { IS_SSR, ROUTES } from "../../constants";

function App() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const location = useLocation();
  const [params] = useSearchParams();
  const oAuthCode = params.get("code");

  useEffect(() => {
    if (IS_SSR || !oAuthCode) {
      return;
    }

    window.history.pushState({}, "", getOAuthRedirectUri());

    dispatch(oAuthThunks.login(oAuthCode));
  }, [oAuthCode, dispatch]);

  useEffect(() => {
    const [oldTheme, newTheme] =
      theme === Theme.DARK ? [Theme.LIGHT, Theme.DARK] : [Theme.DARK, Theme.LIGHT];

    document.body.classList.add("app", newTheme);
    document.body.classList.remove(oldTheme);
  }, [theme]);

  useEffect(() => {
    const onPressKey = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "Enter") {
        toggleFullScreen();
      }
    };
    document.addEventListener("keyup", onPressKey);
    return () => {
      document.removeEventListener("keyup", onPressKey);
    };
  }, []);

  return (
    <>
      {location.pathname !== ROUTES.game.path && <AppHeaderWithErrorBoundary />}

      <ErrorBoundary>
        <Routes>
          <Route path={ROUTES.home.path} element={<HomePage />} />
          <Route path={ROUTES.rules.path} element={<RulesPage />} />

          <Route element={<AuthPagesRoute />}>
            <Route path={ROUTES.signIn.path} element={<LoginPage />} />
            <Route path={ROUTES.signUp.path} element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.profile.path} element={<ProfilePage />} />
            <Route path={ROUTES.leaderboard.path} element={<LiderboardPage />} />
            <Route path={ROUTES.forum.path}>
              <Route index element={<ForumThemesListPage />} />
              <Route path={ROUTES.forumTheme.path} element={<ForumMessagesListPage />} />
            </Route>
            <Route path={ROUTES.gamePreparing.path} element={<GamePreparingPage />} />
            <Route path={ROUTES.game.path} element={<GamePage />} />
          </Route>
        </Routes>
      </ErrorBoundary>

      {location.pathname !== ROUTES.game.path && <AppFooterWithErrorBoundary />}
    </>
  );
}

export default App;
