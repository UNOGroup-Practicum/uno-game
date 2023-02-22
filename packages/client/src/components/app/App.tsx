import { useEffect } from "react";
import styles from "./app.module.scss";
import clsx from "clsx";
import { Route, Routes } from "react-router-dom";
import GamePage from "../../pages/Game";

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
        path="/"
        element={
          <div className={clsx("app", styles["app-test"])}>
            Вот тут будет жить ваше приложение :)
          </div>
        }
      />
      <Route path="/sign-in" />
      <Route path="/sign-up" />
      <Route path="/profile" />
      <Route path="/leaderboard" />
      <Route path="/forum" />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
}

export default App;
