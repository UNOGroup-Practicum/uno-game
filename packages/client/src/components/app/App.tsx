import { useEffect } from "react";
import styles from "./app.module.scss";
import clsx from "clsx";

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
    <div className={clsx("app", styles["app-test"])}>Вот тут будет жить ваше приложение :)</div>
  );
}

export default App;
