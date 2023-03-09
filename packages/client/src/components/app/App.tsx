import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import GamePage from "../../pages/GamePage";
import { useDispatch, useSelector } from "../../services/hooks";
import { authThunks, authSelect } from "../../services/slices/auth-slice";
import { useTheme } from "../../theme/useTheme";
import { ROUTES } from "../../constants";
import { HomePage } from "../../pages/HomePage/HomePage";
import { LiderboardPage } from "../../pages/LiderboardPage/LiderboardPage";
import { AppHeader } from "../../components/app-header/AppHeader";
import { AppFooter } from "../../components/app-footer/AppFooter";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { Theme } from "../../theme/ThemeContext";
import { ForumThemesListPage } from "../../pages/ForumPage/ForumThemesListPage";
import { ForumMessagesListPage } from "../../pages/ForumPage/ForumMessagesListPage";
import GamePreparingPage from "../../pages/GamePreparingPage";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { AuthPagesRoute } from "../auth-pages-route/AuthPagesRoute";

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

  return (
    <>
      {location.pathname !== ROUTES.game.path && <AppHeader />}

      <Routes>
        <Route path={ROUTES.home.path} element={<HomePage />} />

        {/* TODO: Route ProfilePage переместить в ProtectedRoute*/}
        <Route path={ROUTES.profile.path} element={<ProfilePage />} />

        <Route element={<AuthPagesRoute />}>
          <Route path={ROUTES.signIn.path} element={<LoginPage />} />
          <Route path={ROUTES.signUp.path} element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.leaderboard.path} element={<LiderboardPage />} />
          <Route path={ROUTES.forum.path}>
            <Route index element={<ForumThemesListPage />} />
            <Route path=":themeId" element={<ForumMessagesListPage />} />
          </Route>
          <Route path={ROUTES.gamePreparing.path} element={<GamePreparingPage />} />
          <Route path={ROUTES.game.path} element={<GamePage />} />
        </Route>
      </Routes>

      {location.pathname !== ROUTES.game.path && <AppFooter />}
    </>
  );
}

export default App;
