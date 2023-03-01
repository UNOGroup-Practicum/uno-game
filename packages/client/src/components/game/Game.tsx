import { memo, useEffect, useRef } from "react";
import styles from "./Game.module.scss";
import { CardType } from "./types/enums";
import { TShuffleArrayCards } from "./types/typeAliases";
import createBackSideCard from "./utils/createBackSideCard";
import createShuffleArrayCards from "./utils/createShuffleArrayCards";
import setCardsAmountForGamer from "./utils/setCardsAmountForGamer";
import createGamersPositions from "./utils/createGamersPositions";
import generateCardsDistribution from "./utils/generateCardsDistribution";
import createTakeFourCard from "./utils/createTakeFourCard";
import createOrderColorCard from "./utils/createOrderColorCard";
import createDigitCard from "./utils/createDigitCard";
import createReverseStrokeCard from "./utils/createReverseStrokeCard";
import createSkipTurnCard from "./utils/createSkipTurnCard";
import createTakeTwoCard from "./utils/createTakeTwoCard";

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

    const userCards: TShuffleArrayCards = [];
    const indexes: number[] = [];
    let rate = 160;

    function setUserCardsDuringCardsDistribution(
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      gamersList: { id: string; name: string }[],
      shuffleArrayCards: TShuffleArrayCards
    ) {
      const coord = {
        x: canvas.width / 2 - rate,
        y: canvas.height - 140,
      };
      if (userCards.length === 0) {
        for (let index = 0; index < shuffleArrayCards.length; index++) {
          if (shuffleArrayCards[index].owner.toLowerCase() === gamersList[0].name.toLowerCase()) {
            userCards.push(shuffleArrayCards[index]);
            indexes.push(index);
            break;
          }
        }
        rate -= 40;
      } else {
        for (let index = 0; index < shuffleArrayCards.length; index++) {
          if (
            shuffleArrayCards[index].owner.toLowerCase() === gamersList[0].name.toLowerCase() &&
            !indexes.includes(index)
          ) {
            userCards.push(shuffleArrayCards[index]);
            indexes.push(index);
            break;
          }
        }
        rate -= 40;
      }
      (userCards as TShuffleArrayCards).forEach((element) => {
        if (isFinite(Number(element.type))) {
          createDigitCard(ctx, coord.x, coord.y, element.type, element.color as string);
        } else {
          if (element.type === CardType.skipTurn) {
            createSkipTurnCard(ctx, coord.x, coord.y, element.color as string);
          } else if (element.type === CardType.reverseStroke) {
            createReverseStrokeCard(ctx, coord.x, coord.y, element.color as string);
          } else if (element.type === CardType.takeTwo) {
            createTakeTwoCard(ctx, coord.x, coord.y, element.color as string);
          } else if (element.type === CardType.orderColor) {
            createOrderColorCard(ctx, coord.x, coord.y);
          } else if (element.type === CardType.takeFour) {
            createTakeFourCard(ctx, coord.x, coord.y);
          }
        }
      });
    }

    const generator = generateCardsDistribution(0, gamersPositions.length);
    let cardsCounter1 = 1;
    let cardsCounter2 = 1;
    function cardsDistribution(xEndPoint: number, yEndPoint: number) {
      const rate = (canvas.height / 2 - 60 - 160) / 30;
      let xSteper = 0;
      let ySteper = 0;
      function fn() {
        ctx.clearRect(0, 155, canvas.width, canvas.height - 330);
        xSteper +=
          ((canvas.width / 2 - 40 - xEndPoint) / (canvas.height / 2 - 90 - yEndPoint)) * rate;
        ySteper += 1 * rate;
        createBackSideCard(ctx, canvas.width / 2 - 40, canvas.height / 2 - 60);
        if (yEndPoint < canvas.height / 2) {
          createBackSideCard(
            ctx,
            canvas.width / 2 - 40 - xSteper,
            canvas.height / 2 - 60 - ySteper
          );
          if (yEndPoint + ySteper < canvas.height / 2 - 95) {
            requestAnimationFrame(fn);
          } else {
            ctx.clearRect(0, yEndPoint + 30, canvas.width, canvas.height - 330);
            createBackSideCard(ctx, canvas.width / 2 - 40, canvas.height / 2 - 60);
            const idx = generator.next().value as number;
            if (typeof idx !== "undefined") {
              cardsDistribution(gamersPositions[idx].cards[0], gamersPositions[idx].cards[1]);
            }
            if (typeof idx === "undefined") {
              setCardsAmountForGamer(
                ctx,
                gamersPositions[gamersPositions.length - 1].cards[0],
                gamersPositions[gamersPositions.length - 1].cards[1],
                cardsCounter2.toString()
              );
              ctx.clearRect(0, yEndPoint + 30, canvas.width, canvas.height - 330);
              createBackSideCard(ctx, canvas.width / 2 - 40, canvas.height / 2 - 60);
            }
            if (idx === 0) {
              setCardsAmountForGamer(
                ctx,
                gamersPositions[gamersPositions.length - 1].cards[0],
                gamersPositions[gamersPositions.length - 1].cards[1],
                cardsCounter2.toString()
              );
            } else {
              if (idx !== undefined) {
                setCardsAmountForGamer(
                  ctx,
                  gamersPositions[idx - 1].cards[0],
                  gamersPositions[idx - 1].cards[1],
                  cardsCounter2.toString()
                );
              }
            }
            cardsCounter1++;
            if (cardsCounter1 === gamersPositions.length) {
              cardsCounter2++;
              cardsCounter1 = 1;
            }
          }
        } else {
          createBackSideCard(
            ctx,
            canvas.width / 2 - 40 - xSteper,
            canvas.height / 2 - 60 + ySteper
          );
          if (canvas.height / 2 + 180 + ySteper < yEndPoint) {
            requestAnimationFrame(fn);
          } else {
            ctx.clearRect(0, canvas.height / 2, canvas.width, canvas.height / 2 - 175);
            createBackSideCard(ctx, canvas.width / 2 - 40, canvas.height / 2 - 60);
            const idx = generator.next().value as number;
            cardsDistribution(gamersPositions[idx].cards[0], gamersPositions[idx].cards[1]);
            setUserCardsDuringCardsDistribution(canvas, ctx, gamersList, shuffleArrayCards);
          }
        }
      }
      fn();
    }
    cardsDistribution(gamersPositions[0].cards[0], gamersPositions[0].cards[1]);
  }, []);

  return <canvas ref={ref} className={styles.canvas} />;
}

export default memo(Game);
