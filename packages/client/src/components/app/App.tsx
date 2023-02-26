import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <div className={`app ${theme}`}>
      <AppHeader />

      <Routes>
        <Route path={routes.home.path} element={<HomePage />} />
        <Route path={routes["sign-in"].path} element={<LoginPage />} />
        <Route path={routes["sign-up"].path} element={<RegisterPage />} />
        <Route path={routes.profile.path} element={<ProfilePage />} />
        <Route path={routes.leaderboard.path} element={<LiderboardPage />} />
        <Route path={routes.forum.path} element={<ForumPage />}>
          <Route path=":themeId" element={<ForumPage />} />
        </Route>
        <Route path={routes.game.path} element={<GamePage />} />
      </Routes>
      <AppFooter />
    </div>
  );
}

export default App;
