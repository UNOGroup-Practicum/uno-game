import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import GamePage from "../../pages/Game";
import { useTheme } from "../../theme/useTheme";
import { routes } from "../../constants";
import { Theme } from "../../theme/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const [oldTheme, newTheme] =
      theme === Theme.DARK ? [Theme.LIGHT, Theme.DARK] : [Theme.DARK, Theme.LIGHT];

    document.body.classList.add("app", newTheme);
    document.body.classList.remove(oldTheme);
  }, [theme]);

  return (
    <>
      <button onClick={toggleTheme}>Переключить тему</button>

      <Routes>
        <Route path={routes.home.path} element={<div>Вот тут будет жить ваше приложение :)</div>} />
        <Route path={routes["sign-in"].path} />
        <Route path={routes["sign-up"].path} />
        <Route path={routes.profile.path} />
        <Route path={routes.leaderboard.path} />
        <Route path={routes.forum.path} />
        <Route path={routes.game.path} element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
