import { useEffect } from "react";
import styles from "./app.module.scss";
import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import GamePage from "../../pages/Game";
import { routes } from "../../constants";

function App() {
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
    <Routes>
      <Route
        path={routes.home.path}
        element={
          <div className={clsx("app", styles["app-test"])}>
            Вот тут будет жить ваше приложение :)
          </div>
        }
      />
      <Route path={routes["sign-in"].path} />
      <Route path={routes["sign-up"].path} />
      <Route path={routes.profile.path} />
      <Route path={routes.leaderboard.path} />
      <Route path={routes.forum.path} />
      <Route path={routes.game.path} element={<GamePage />} />
    </Routes>
  );
}

export default App;
