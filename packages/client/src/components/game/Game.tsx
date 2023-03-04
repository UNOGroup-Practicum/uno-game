import { memo, useEffect, useRef } from "react";
import styles from "./Game.module.scss";
import createBackSideCard from "./utils/createBackSideCard";
import createShuffleArrayCards from "./utils/createShuffleArrayCards";
import setCardsAmountForGamer from "./utils/setCardsAmountForGamer";
import createGamersPositions from "./utils/createGamersPositions";
import generateCardsDistribution from "./utils/generateCardsDistribution";
import createUserCards from "./utils/createUserCards";
import { TCardsDistribution } from "./types/typeAliases";
import createDigitCard from "./utils/createDigitCard";
import { CardStatus } from "./types/enums";
import createUNOButton from "./utils/createUNOButton";

function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const gamersList = [
      { id: "0", name: "User A" },
      { id: "1", name: "James" },
      { id: "2", name: "David" },
      { id: "3", name: "Matthew" },
      { id: "4", name: "Danny" },
      { id: "5", name: "Steven" },
      { id: "6", name: "George" },
      { id: "7", name: "Jose" },
      { id: "8", name: "Paul" },
      { id: "9", name: "Donald" },
    ];

    const shuffleArrayCards = createShuffleArrayCards(gamersList);

    const gamersPositions = createGamersPositions(canvas, ctx, gamersList);

    const createUserCardsDuringCardsDistribution = createUserCards(
      canvas,
      ctx,
      gamersList,
      shuffleArrayCards
    );

    const generator = generateCardsDistribution(0, gamersPositions.length);

    const cardsDistribution: TCardsDistribution = (xEndPoint: number, yEndPoint: number) => {
      if (!cardsDistribution.cardsCounter1) {
        cardsDistribution.cardsCounter1 = 1;
      }

      if (!cardsDistribution.cardsCounter2) {
        cardsDistribution.cardsCounter2 = 1;
      }

      const point = {
        x: canvas.width / 2,
        xMinus40: canvas.width / 2 - 40,
        y: canvas.height / 2,
        yMinus60: canvas.height / 2 - 60,
      };

      const rate = (point.yMinus60 - 160) / 30;
      let xSteper = 0;
      let ySteper = 0;

      function fn() {
        ctx.clearRect(0, 155, canvas.width, canvas.height - 330);
        xSteper += ((point.xMinus40 - xEndPoint) / (point.y - 90 - yEndPoint)) * rate;
        ySteper += 1 * rate;
        createBackSideCard(ctx, point.xMinus40, point.yMinus60);

        if (yEndPoint < point.y) {
          createBackSideCard(ctx, point.xMinus40 - xSteper, point.yMinus60 - ySteper);

          if (yEndPoint + ySteper < point.y - 95) {
            requestAnimationFrame(fn);
          } else {
            ctx.clearRect(0, yEndPoint + 30, canvas.width, canvas.height - 330);
            createBackSideCard(ctx, point.xMinus40, point.yMinus60);
            const idx = generator.next().value as number;

            if (typeof idx !== "undefined") {
              cardsDistribution(gamersPositions[idx].cards[0], gamersPositions[idx].cards[1]);
            }

            if (typeof idx === "undefined") {
              setCardsAmountForGamer(
                ctx,
                gamersPositions[gamersPositions.length - 1].cards[0],
                gamersPositions[gamersPositions.length - 1].cards[1],
                cardsDistribution.cardsCounter2.toString()
              );
              ctx.clearRect(0, yEndPoint + 30, canvas.width, canvas.height - 330);
              createBackSideCard(ctx, point.x - 100, point.yMinus60);
              createUNOButton(ctx, canvas.width / 2 + 140, canvas.height / 2 - 20);

              for (let index = 0; index < shuffleArrayCards.length; index++) {
                if (
                  shuffleArrayCards[index].status === CardStatus.inDeck &&
                  isFinite(Number(shuffleArrayCards[index].type))
                ) {
                  createDigitCard(
                    ctx,
                    point.x + 20,
                    point.yMinus60,
                    shuffleArrayCards[index].type,
                    shuffleArrayCards[index].color as string
                  );
                  shuffleArrayCards[index].status = CardStatus.inOutside;
                  break;
                }
              }
            }

            if (idx === 0) {
              setCardsAmountForGamer(
                ctx,
                gamersPositions[gamersPositions.length - 1].cards[0],
                gamersPositions[gamersPositions.length - 1].cards[1],
                cardsDistribution.cardsCounter2.toString()
              );
            } else {
              if (idx !== undefined) {
                setCardsAmountForGamer(
                  ctx,
                  gamersPositions[idx - 1].cards[0],
                  gamersPositions[idx - 1].cards[1],
                  cardsDistribution.cardsCounter2.toString()
                );
              }
            }

            cardsDistribution.cardsCounter1++;

            if (cardsDistribution.cardsCounter1 === gamersPositions.length) {
              cardsDistribution.cardsCounter2++;
              cardsDistribution.cardsCounter1 = 1;
            }
          }
        } else {
          createBackSideCard(ctx, point.xMinus40 - xSteper, point.yMinus60 + ySteper);

          if (point.y + 180 + ySteper < yEndPoint) {
            requestAnimationFrame(fn);
          } else {
            ctx.clearRect(0, point.y, canvas.width, point.y - 175);
            createBackSideCard(ctx, point.xMinus40, point.yMinus60);
            const idx = generator.next().value as number;
            cardsDistribution(gamersPositions[idx].cards[0], gamersPositions[idx].cards[1]);
            createUserCardsDuringCardsDistribution();
          }
        }
      }

      fn();
    };

    cardsDistribution(gamersPositions[0].cards[0], gamersPositions[0].cards[1]);
  }, []);

  return <canvas ref={ref} className={styles.canvas} />;
}

export default memo(Game);
