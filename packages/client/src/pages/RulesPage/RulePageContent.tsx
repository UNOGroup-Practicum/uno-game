import { Box, Grid, Typography } from "@mui/material";
import clsx from "clsx";

import { Picture } from "components/picture/Picture";

import unoActionCardDrawWebp from "assets/images-rules/uno-action-draw2.png?format=webp&quality=75&source&imagetools";
import unoActionCardDraw from "assets/images-rules/uno-action-draw2.png?quality=75&imagetools";
import unoActionCardReverseWebp from "assets/images-rules/uno-action-reverse.png?format=webp&quality=75&source&imagetools";
import unoActionCardReverse from "assets/images-rules/uno-action-reverse.png?quality=75&imagetools";
import unoActionCardSkip from "assets/images-rules/uno-action-skip.png?quality=75&imagetools";
import unoActionCardSkipWebp from "assets/images-rules/uno-action-skip.png?quality=75&imagetools?format=webp&quality=75&source&imagetools";
import unoCards from "assets/images-rules/uno-cards.png?quality=75&imagetools";
import unoCardsWebp from "assets/images-rules/uno-cards.png?quality=75&imagetools?format=webp&quality=75&source&imagetools";
import unoWildCardDraw from "assets/images-rules/uno-wild-draw4.png?quality=75&imagetools";
import unoWildCardDrawWebp from "assets/images-rules/uno-wild-draw4.png?quality=75&imagetools?format=webp&quality=75&source&imagetools";
import unoWildCardWild from "assets/images-rules/uno-wild-wild.png?quality=75&imagetools";
import unoWildCardWildWebp from "assets/images-rules/uno-wild-wild.png?quality=75&imagetools?format=webp&quality=75&source&imagetools";

import styles from "./RulesPage.module.scss";

export const renderContent = () => (
  <>
    <Typography variant="h2" component="h1" align="center" marginBottom={3}>
      Правила игры UNO
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} className={styles.text__block}>
          <Typography variant="h4" component="h1" align="center" marginBottom={3}>
            Раздача карт
          </Typography>
          <br />
          <p>
            В начале игры каждому раздаётся по 7 карт (в тёмную). Остальные карты кладутся рубашкой
            вверх – это колода «Прикуп». Верхняя карта из колоды «Прикуп» переворачивается, кладётся
            рядом и становится первой картой колоды «Сброс».
          </p>
          <br />
          <Typography variant="h4" component="h1" align="center" marginBottom={3}>
            Игра
          </Typography>
          <br />
          <p>
            Игра начинается «по часовой стрелке». Во время своего хода игрок имеет право выложить
            одну карту на колоду «Сброс» по следующим правилам:
            <br />
            - или карта должна быть того же цвета <br />
            - или карта должна иметь ту же цифру, или ту же картинку (быть активной картой) <br />
            - или карта должна быть чёрной активной картой <br />
            При отсутствии подходящий карты игрок берёт одну карту из колоды «Прикуп» (в тёмную).
            Если карта удовлетворяет указанным выше условиям – игрок может выложить карту на колоду
            «Сброс», если не удовлетворяет – игрок оставляет карту себе, и ход переходит к
            следующему игроку. Выигрывает тот игрок кто скинет все карты.
          </p>
        </Grid>
      </Grid>
    </Box>
    <Typography variant="h3" component="h1" align="center" marginBottom={3}>
      Разновидности карт
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        {/* Цифровые карты UNO */}
        <Grid item xs={5}>
          <div className={styles.image}>
            <Picture webp={unoCardsWebp}>
              <img src={unoCards} alt="Цифровые карты" />
            </Picture>
          </div>
        </Grid>
        <Grid item xs={7} className={clsx(styles.text__block, styles.text__block_small)}>
          <p>
            <strong>Цифровые карты UNO</strong>. Каждая цифра 4-х цветов. Все цифры (кроме 0) в
            двойном количестве.
          </p>
        </Grid>
        {/* Пропусти ход */}
        <Grid item xs={5}>
          <div className={styles.image}>
            <Picture webp={unoActionCardSkipWebp}>
              <img src={unoActionCardSkip} alt="Пропусти ход" />
            </Picture>
          </div>
        </Grid>
        <Grid item xs={7} className={clsx(styles.text__block, styles.text__block_small)}>
          <p>
            <strong>«Пропусти ход»</strong> – следующий игрок пропускает свой ход. Игрок может
            «спастись» от действия этой карты только выложив точно такую же карту (тот же цвет, та
            же картинка), то есть, выполнив Вмешательство.
          </p>
        </Grid>

        {/* Возьми две */}
        <Grid item xs={5}>
          <div className={styles.image}>
            <Picture webp={unoActionCardDrawWebp}>
              <img src={unoActionCardDraw} alt="Возьми две" />
            </Picture>
          </div>
        </Grid>
        <Grid item xs={7} className={clsx(styles.text__block, styles.text__block_small)}>
          <p>
            <strong>«Возьми две»</strong> – следующий игрок берёт из колоды «Прикуп» две карты (в
            тёмную) и пропускает свой ход. Игрок может «спастись» от действия этой карты выложив
            свою карту «Возьми две» (цвет может быть любой). Действия карт «Возьми две» не
            суммируются, и последний игрок, на котором закончилась «цепочка» выкладывания карт
            «Возьми две», берёт из колоды «Прикуп» всего две карты и пропускает свой ход.
          </p>
        </Grid>

        {/* Наоборот */}
        <Grid item xs={5}>
          <div className={styles.image}>
            <Picture webp={unoActionCardReverseWebp}>
              <img src={unoActionCardReverse} alt="Наоборот" />
            </Picture>
          </div>
        </Grid>
        <Grid item xs={7} className={clsx(styles.text__block, styles.text__block_small)}>
          <p>
            <strong>«Наоборот»</strong> – направление хода меняется на противоположное. Например,
            было «по часовой стрелке», после выкладывания карты «Наоборот» будет «против часовой
            стрелки». При выкладывании нескольких карт «Наоборот» их действия суммируются. Например,
            две карты «Наоборот» не оказывают никакого воздействия – ход продолжается в том же
            направлении что и раньше, три карты «Наоборот» меняют направление хода на
            противоположное и т.д.
          </p>
        </Grid>

        {/* Закажи цвет */}
        <Grid item xs={9} className={clsx(styles.text__block)}>
          <p>
            <strong>«Закажи цвет»</strong> – позволяет поменять игроку текущий цвет (на любой, в том
            числе и на текущий цвет). Следующий игрок должен положить любую карту заданного цвета.
            Для того чтобы выложить карту «Закажи цвет» игроку не требуется никаких специальных
            условий, в отличие от следующей карты «Закажи цвет и возьми четыре»...
          </p>
        </Grid>
        <Grid item xs={3} className={clsx(styles.image__block)}>
          <div className={styles.image}>
            <Picture webp={unoWildCardWildWebp}>
              <img src={unoWildCardWild} alt="Закажи цвет" />
            </Picture>
          </div>
        </Grid>
        {/* Закажи цвет и возьми четыре */}
        <Grid item xs={9} className={clsx(styles.text__block)}>
          <p>
            <strong>«Закажи цвет и возьми четыре»</strong> – может быть выложена игроком только в
            свой ход и только в том случае, если у игрока (игрок-1) отсутствует текущий цвет (причём
            текущая цифра/активные карты/чёрная активная карта «Закажи цвет» могут и присутствовать
            – это не важно, главное отсутствие текущего цвета). Одновременно с выкладыванием этой
            карты необходимо заказать цвет (может быть любой, в том числе и текущий цвет). Следующий
            игрок (игрок-2) берёт из колоды «Прикуп» четыре карты (в тёмную) и пропускает ход.
            Игрок-2 может «спастись» от действия этой карты только выложив карту «Возьми две» нового
            заказанного цвета (далее всё идёт как обычно со стандартным действием карты «Возьми
            две»).
          </p>
        </Grid>
        <Grid item xs={3} className={clsx(styles.image__block)}>
          <div className={clsx(styles.image)}>
            <Picture webp={unoWildCardDrawWebp}>
              <img
                src={unoWildCardDraw}
                alt="Закажи цвет и возьми четыре"
                className={clsx(styles.image__big)}
              />
            </Picture>
          </div>
        </Grid>
      </Grid>
    </Box>
  </>
);
