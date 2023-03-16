import { useEffect, useState } from "react";
import { Container } from "@mui/material";

import styles from "./RulesPage.module.scss";
import { renderContent } from "./RulePageContent";

export const RulesPage = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handlerScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handlerScroll);
    return () => window.removeEventListener("scroll", handlerScroll);
  }, []);

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <section className={styles.parallax}>
          <div
            className={styles.parallax__top}
            style={{ transform: `translateY(-${offsetY * 0.2}px)` }}
          />
          <div
            className={styles.parallax__bottom}
            style={{ transform: `translateY(-${offsetY * 0.6}px)` }}
          />
          <div>{renderContent()}</div>
        </section>
      </Container>
    </div>
  );
};
