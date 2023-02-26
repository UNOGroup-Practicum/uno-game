import { Container } from "@mui/material";
import clsx from "clsx";
import styles from "./RulesPage.module.scss";
import unoLogoRules from "../../assets/images-rules/uno-logo-rules.png";
import unoPlay from "../../assets/images-rules/uno-play.png";
import unoGeneral from "../../assets/images-rules/uno-general.png";

import unoCards from "../../assets/images-rules/uno-cards.png";
import unoActionCardDraw from "../../assets/images-rules/uno-action-draw2.png";
import unoActionCardReverse from "../../assets/images-rules/uno-action-reverse.png";
import unoActionCardSkip from "../../assets/images-rules/uno-action-skip.png";
import unoWildCardWild from "../../assets/images-rules/uno-wild-wild.png";

import unoWildCardDraw from "../../assets/images-rules/uno-wild-draw4.png";

export const RulesPage = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <h1>Игра UNO – легко научиться, весело играть!</h1>

        <section>
          <div className={clsx(styles.content, styles.content__end)}>
            <div className={clsx(styles.image, styles.image__main)}>
              <img src={unoLogoRules} alt="" />
            </div>
            <div className={styles.text}>
              <h3>Что это за игра?</h3>
              <br />
              <p>
                «Уно» — это одна из самых известных и увлекательных карточных игр. Когда вы хотите
                отлично провести время в компании или же скоротать время в путешествии, «Уно» станет
                лучшим вариантом для крупной компании: обычные карточные игры становятся
                неинтересными при игре уже впятером, а вот «Уно» вполне нормально и динамично
                играется, даже если участвует десять человек.
              </p>
              <br />
              <h3>Задача</h3>
              <br />
              <p>
                Первым скинуть свои карты. На этом данный тур заканчивается и идёт подсчёт очков по
                оставшимся на руках картам
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className={clsx(styles.content, styles.content__start)}>
            <div className={styles.text}>
              <h3>В чём суть игры?</h3>
              <br />
              <p>
                У вас есть колода карт, из которой раздаётся по 7 каждому из игроков. Затем на стол
                кладётся ещё одна карта, с которой и начинается игра. Задача — сбросить все свои
                карты. В свой ход вы имеете право выкладывать на стол карту, которая по значению
                (картинке) или цвету совпадает с верхней на игровом столе (как в «американском
                дураке» или «101»).
                <br />
                Есть и специальные карты, которые создают различные эффекты. Когда у вас на руке
                остаётся только одна карта, нужно обязательно крикнуть «Уно» — если же это крикнут
                ваши соперники, то вы будете вынуждены взять ещё карт.
              </p>
            </div>
            <div className={styles.image}>
              <img src={unoGeneral} alt="" />
            </div>
          </div>
        </section>
        <h2>Правила игры UNO</h2>
        <section>
          <div className={clsx(styles.content, styles.content__full)}>
            <div className={styles.text}>
              <h3>Раздача карт</h3>
              <br />
              <p>
                В начале игры каждому раздаётся по 7 карт (в тёмную). Остальные карты кладутся
                рубашкой вверх – это колода «Прикуп». Верхняя карта из колоды «Прикуп»
                переворачивается, кладётся рядом и становится первой картой колоды «Сброс».
              </p>
              <br />
              <h3>Игра</h3>
              <br />
              <p>
                Игра начинается «по часовой стрелке». Во время своего хода игрок имеет право
                выложить одну карту на колоду «Сброс» по следующим правилам: Или карта должна быть
                того же цвета. Или карта должна иметь ту же цифру, или ту же картинку (быть активной
                картой), или быть чёрной активной картой. При отсутствии подходящий карты игрок
                берёт одну карту из колоды «Прикуп» (в тёмную). Если карта удовлетворяет указанным
                выше условиям – игрок может выложить карту на колоду «Сброс», если не удовлетворяет
                – игрок оставляет карту себе, говорит «Пас» и ход переходит к следующему игроку.
                Игра продолжается до тех пор, пока кто-то один из игроков не скинет все карты. После
                этого происходит подсчёт очков по оставшимся на руках картам (стоимость карт
                приведена в разделе Разновидности карт, выигравших определяют по итогам нескольких
                туров – пункт Выигрыш).
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className={clsx(styles.content, styles.content__start)}>
            <div className={styles.image}>
              <img src={unoPlay} alt="" />
            </div>
            <div className={styles.text}>
              <h3>Какие карты в колоде?</h3>
              <br />
              <p>
                В «Уно» 108 карт, из которых по 19 относятся к каждому из цветов (зелёный, желтый,
                синий, красный), карты 1-9 по два экземпляра, 24 карты эффектов с цветом и 8
                универсальных карт (своеобразных «джокеров»).
              </p>
            </div>
          </div>
        </section>
        <h2>Разновидности карт</h2>
        <section>
          <div className={clsx(styles.content, styles.content__start)}>
            <div className={styles.text}>
              <p>
                <strong>Цифровые карты UNO</strong>. Стоимость по номиналу – от 0 до 9 очков. Каждая
                цифра 4-х цветов. Все цифры (кроме 0) в двойном количестве.
              </p>
            </div>
            <div className={styles.image}>
              <img src={unoCards} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className={clsx(styles.content, styles.content__start)}>
            <div className={styles.text}>
              <p>
                <strong>«Пропусти ход»</strong> – следующий игрок пропускает свой ход. Игрок может
                «спастись» от действия этой карты только выложив точно такую же карту (тот же цвет,
                та же картинка), то есть, выполнив Вмешательство.
              </p>
            </div>
            <div className={styles.image}>
              <img src={unoActionCardSkip} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className={clsx(styles.content, styles.content__start)}>
            <div className={styles.text}>
              <p>
                <strong>«Возьми две»</strong> – следующий игрок берёт из колоды «Прикуп» две карты
                (в тёмную) и пропускает свой ход. Игрок может «спастись» от действия этой карты
                выложив свою карту «Возьми две» (цвет может быть любой). Действия карт «Возьми две»
                не суммируются, и последний игрок, на котором закончилась «цепочка» выкладывания
                карт «Возьми две», берёт из колоды «Прикуп» всего две карты и пропускает свой ход.
              </p>
            </div>
            <div className={styles.image}>
              <img src={unoActionCardDraw} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className={clsx(styles.content, styles.content__start)}>
            <div className={styles.text}>
              <p>
                <strong>«Наоборот»</strong> – направление хода меняется на противоположное.
                Например, было «по часовой стрелке», после выкладывания карты «Наоборот» будет
                «против часовой стрелки». При выкладывании нескольких карт «Наоборот» их действия
                суммируются. Например, две карты «Наоборот» не оказывают никакого воздействия – ход
                продолжается в том же направлении что и раньше, три карты «Наоборот» меняют
                направление хода на противоположное и т.д.
              </p>
            </div>
            <div className={styles.image}>
              <img src={unoActionCardReverse} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className={clsx(styles.content, styles.content__end)}>
            <div className={clsx(styles.text, styles.text_large)}>
              <p>
                <strong>«Закажи цвет»</strong> – позволяет поменять игроку текущий цвет (на любой, в
                том числе и на текущий цвет). Следующий игрок должен положить любую карту заданного
                цвета. Для того чтобы выложить карту «Закажи цвет» игроку не требуется никаких
                специальных условий, в отличие от следующей карты «Закажи цвет и возьми четыре»...
              </p>
            </div>
            <div className={clsx(styles.image, styles.image__tall)}>
              <img src={unoWildCardWild} alt="" />
            </div>
          </div>
        </section>

        <section>
          <div className={clsx(styles.content, styles.content__end)}>
            <div className={clsx(styles.text, styles.text_large)}>
              <p>
                <strong>«Закажи цвет и возьми четыре»</strong> – может быть выложена игроком только
                в свой ход и только в том случае, если у игрока (игрок-1) отсутствует текущий цвет
                (причём текущая цифра/активные карты/чёрная активная карта «Закажи цвет» могут и
                присутствовать – это не важно, главное отсутствие текущего цвета). Одновременно с
                выкладыванием этой карты необходимо заказать цвет (может быть любой, в том числе и
                текущий цвет). Следующий игрок (игрок-2) берёт из колоды «Прикуп» четыре карты (в
                тёмную) и пропускает ход. Игрок-2 может «спастись» от действия этой карты только
                выложив карту «Возьми две» нового заказанного цвета (далее всё идёт как обычно со
                стандартным действием карты «Возьми две»).
              </p>
            </div>
            <div className={clsx(styles.image, styles.image__tall)}>
              <img src={unoWildCardDraw} alt="" />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
