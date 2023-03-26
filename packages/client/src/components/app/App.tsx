import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "services/hooks";
import { authSelect, authThunks } from "services/slices/auth-slice";
import { Theme } from "theme/ThemeContext";
import { useTheme } from "theme/useTheme";

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

import { ROUTES } from "../../constants";

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;

  webkitExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
}

interface ExtendedHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelect);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(authThunks.me());
    }
  }, [dispatch]);

  useEffect(() => {
    const [oldTheme, newTheme] =
      theme === Theme.DARK ? [Theme.LIGHT, Theme.DARK] : [Theme.DARK, Theme.LIGHT];

    document.body.classList.add("app", newTheme);
    document.body.classList.remove(oldTheme);
  }, [theme]);

  /**
   * реализация Fullscreen API
   */
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

  function toggleFullScreen() {
    const htmlDocument: ExtendedDocument = document;
    const elem: ExtendedHTMLElement = document.documentElement;

    const isFullscreenOff = Boolean(
      (htmlDocument.fullscreenElement !== undefined && htmlDocument.fullscreenElement === null) ||
        (htmlDocument.webkitFullscreenElement !== undefined &&
          !htmlDocument.webkitFullscreenElement) ||
        (htmlDocument.mozFullScreenElement !== undefined && !htmlDocument.mozFullScreenElement) ||
        (htmlDocument.msFullscreenElement !== undefined &&
          htmlDocument.msFullscreenElement === null)
    );

    const activateFullscreen = () => {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    };
    const deactivateFullscreen = () => {
      if (htmlDocument.exitFullscreen) {
        htmlDocument.exitFullscreen().then();
      } else if (htmlDocument.webkitExitFullscreen) {
        htmlDocument.webkitExitFullscreen();
      } else if (htmlDocument.mozCancelFullScreen) {
        htmlDocument.mozCancelFullScreen();
      } else if (htmlDocument.msExitFullscreen) {
        htmlDocument.msExitFullscreen();
      }
    };

    if (isFullscreenOff) {
      activateFullscreen();
    } else {
      deactivateFullscreen();
    }
  }

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
              <Route path=":themeId" element={<ForumMessagesListPage />} />
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
