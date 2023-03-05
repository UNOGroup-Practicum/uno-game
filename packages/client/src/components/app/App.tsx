import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { authThunks, authSelect } from "../../services/slices/auth-slice";
import GamePage from "../../pages/Game";
import { useTheme } from "../../theme/useTheme";
import { routes } from "../../constants";
import { HomePage } from "../../pages/HomePage/HomePage";
import { LiderboardPage } from "../../pages/LiderboardPage/LiderboardPage";
import { AppHeader } from "../../components/app-header/AppHeader";
import { AppFooter } from "../../components/app-footer/AppFooter";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ForumPage } from "../../pages/ForumPage/ForumPage";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";
import { Theme } from "../../theme/ThemeContext";

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
      {location.pathname !== routes.game.path && <AppHeader />}

      <Routes>
        <Route path={routes.home.path} element={<HomePage />} />
        <Route path={routes["sign-in"].path} element={<LoginPage />} />
        <Route path={routes["sign-up"].path} element={<RegisterPage />} />
        <Route path={routes.profile.path} element={<ProfilePage />} />
        <Route path={routes.leaderboard.path} element={<LiderboardPage />} />
        <Route path={routes.forum.path} element={<ForumPage />} />
        <Route path={routes.game.path} element={<GamePage />} />
      </Routes>

      {location.pathname !== routes.game.path && <AppFooter />}
    </>
  );
}

export default App;
