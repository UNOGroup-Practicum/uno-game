import React from "react";
import { Container, Button, Grid, Paper, Card, CardContent, Typography } from "@mui/material";

import { useTheme } from "theme/useTheme";
import { Theme } from "theme/ThemeContext";

import { Picture } from "components/picture/Picture";

import promoBg from "assets/images/promo_bg.jpg?quality=75&imagetools";
import promoBgWebp from "assets/images/promo_bg.jpg?format=webp&quality=75&source&imagetools";
import advantage1 from "assets/images/advantage-1.png?quality=75&imagetools";
import advantage1Webp from "assets/images/advantage-1.png?format=webp&quality=75&source&imagetools";
import advantage2 from "assets/images/advantage-2.png?quality=75&imagetools";
import advantage2Webp from "assets/images/advantage-2.png?format=webp&quality=75&source&imagetools";
import advantage3 from "assets/images/advantage-3.png?quality=75&imagetools";
import advantage3Webp from "assets/images/advantage-3.png?format=webp&quality=75&source&imagetools";
import advantage4 from "assets/images/advantage-4.png?quality=75&imagetools";
import advantage4Webp from "assets/images/advantage-4.png?format=webp&quality=75&source&imagetools";
import advantage5 from "assets/images/advantage-5.png?quality=75&imagetools";
import advantage5Webp from "assets/images/advantage-5.png?format=webp&quality=75&source&imagetools";

import { routes } from "../../constants";

import styles from "./HomePage.module.scss";

const AdvantagesItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Todo: добавить стили для светлой темы
  const { theme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          background: "rgba(8,31,58,.3)",
          boxShadow: isDark
            ? "0 0 1px 0 rgb(255 255 255 / 40%)"
            : "0 0 1px 0 rgb(255 255 255 / 40%)",
          textAlign: "center",
          height: "100%",
        }}
      >
        {children}
      </Card>
    </Grid>
  );
};

export const HomePage = () => {
  return (
    <>
      <section className={styles.promo}>
        <div className={styles.promo__bg}>
          <Picture webp={promoBgWebp}>
            <img src={promoBg} alt="Карты на столе" />
          </Picture>
        </div>
        <Container maxWidth="md">
          <div className={styles.promo__body}>
            <h1 className={styles.promo__title}>
              Присоединяйтесь к игре, завоевавшей симпатии 200 миллионов игроков по всему миру
            </h1>
            <Button
              variant="contained"
              href={routes["game-preparing"].path}
              color="success"
              size="large"
            >
              Играть сейчас
            </Button>
          </div>
        </Container>
      </section>

      <div className={styles.intro}>
        <Container maxWidth="md">
          <Grid container spacing={3} justifyContent={"center"}>
            <Grid item sm={10}>
              <Paper>
                <div className={styles.intro__body}>
                  <p>Моменто, синьоры!</p>
                  <p>
                    Играйте в «УНО» онлайн, с правилами на русском, удобным геймплеем и понятным
                    значением карт!
                  </p>

                  <p>
                    Играйте для удовольствия или соревнуйтесь за звание лучшего игрока! Погрузитесь
                    в мир острых ощущений и побед. Докажите, что вы настоящий победитель.
                  </p>

                  <p>Играйте, общайтесь и получайте незабываемый опыт.</p>

                  <p>Приятной игры!</p>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

      <section className={styles.advantages}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" marginBottom={3}>
            Почему Уно?
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <AdvantagesItem>
              <CardContent>
                <Picture webp={advantage1Webp}>
                  <img
                    src={advantage1}
                    height="140"
                    alt="Удобный интерфейс"
                    className={styles.advantage__img}
                  />
                </Picture>

                <Typography
                  mb={2}
                  variant="caption"
                  component="div"
                  sx={{ textTransform: "uppercase" }}
                >
                  Удобный интерфейс
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Простой и привлекательный интерфейс позволит вам моментально погрузиться с головой
                  в игру.
                </Typography>
              </CardContent>
            </AdvantagesItem>

            <AdvantagesItem>
              <CardContent>
                <Picture webp={advantage4Webp}>
                  <img
                    src={advantage4}
                    height="140"
                    alt="Удобный интерфейс"
                    className={styles.advantage__img}
                  />
                </Picture>

                <Typography
                  mb={2}
                  variant="caption"
                  component="div"
                  sx={{ textTransform: "uppercase" }}
                >
                  Это бесплатно
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Просто создайте аккаунт и начните играть — никаких подписок и платежей
                </Typography>
              </CardContent>
            </AdvantagesItem>

            <AdvantagesItem>
              <CardContent>
                <Picture webp={advantage3Webp}>
                  <img
                    src={advantage3}
                    height="140"
                    alt="Удобный интерфейс"
                    className={styles.advantage__img}
                  />
                </Picture>

                <Typography
                  mb={2}
                  variant="caption"
                  component="div"
                  sx={{ textTransform: "uppercase" }}
                >
                  Играйте где угодно
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Вы можете играть на любом устройстве, где есть браузер — хоть на компьютере из
                  дома, хоть на телефоне, пока едете в метро
                </Typography>
              </CardContent>
            </AdvantagesItem>

            <AdvantagesItem>
              <CardContent>
                <Picture webp={advantage2Webp}>
                  <img
                    src={advantage2}
                    height="140"
                    alt="Удобный интерфейс"
                    className={styles.advantage__img}
                  />
                </Picture>

                <Typography
                  mb={2}
                  variant="caption"
                  component="div"
                  sx={{ textTransform: "uppercase" }}
                >
                  Общайтесь с другими игроками
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Пользуйтесь удобным форумом и системой сообщений, обсуждайте сыгранные партии и
                  делитесь с друзьями своими эмоциями.
                </Typography>
              </CardContent>
            </AdvantagesItem>

            <AdvantagesItem>
              <CardContent>
                <Picture webp={advantage5Webp}>
                  <img
                    src={advantage5}
                    height="140"
                    alt="Удобный интерфейс"
                    className={styles.advantage__img}
                  />
                </Picture>

                <Typography
                  mb={2}
                  variant="caption"
                  component="div"
                  sx={{ textTransform: "uppercase" }}
                >
                  Игра, проверенная временем
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Представлена в 1971 году, "Уно" завоевала симпатии двухсот миллионов игроков и
                  продолжает набирать обороты!
                </Typography>
              </CardContent>
            </AdvantagesItem>
          </Grid>
        </Container>
      </section>
    </>
  );
};
