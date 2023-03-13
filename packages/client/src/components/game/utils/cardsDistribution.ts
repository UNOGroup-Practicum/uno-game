import { CardStatus } from "../types/enums";
import { TCardsDistribution } from "../types/typeAliases";

import createBackSideCard from "./createBackSideCard";
import createDigitCard from "./createDigitCard";
import setCardsAmountForGamer from "./setCardsAmountForGamer";

const cardsDistribution: TCardsDistribution = (
  canvas,
  ctx,
  generator,
  gamersPositions,
  shuffleArrayCards,
  createUserCardsDuringCardsDistribution,
  setShuffleArrayCards,
  xEndPoint,
  yEndPoint
) => {
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
          cardsDistribution(
            canvas,
            ctx,
            generator,
            gamersPositions,
            shuffleArrayCards,
            createUserCardsDuringCardsDistribution,
            setShuffleArrayCards,
            gamersPositions[idx].cards[0],
            gamersPositions[idx].cards[1]
          );
        }

        if (typeof idx === "undefined") {
          setCardsAmountForGamer(
            ctx,
            gamersPositions[gamersPositions.length - 1].cards[0],
            gamersPositions[gamersPositions.length - 1].cards[1],
            (cardsDistribution.cardsCounter2 as number).toString()
          );
          ctx.clearRect(0, yEndPoint + 30, canvas.width, canvas.height - 330);
          createBackSideCard(ctx, point.x - 100, point.yMinus60);
          //createUNOButton(ctx, canvas.width / 2 + 140, canvas.height / 2 - 20);
          //createRightDirection(ctx, canvas.width / 2 - 200, canvas.height / 2 - 60);

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
              shuffleArrayCards[index].status = CardStatus.inHeap;
              break;
            }
          }
          setShuffleArrayCards(shuffleArrayCards);
          delete cardsDistribution.cardsCounter1;
          delete cardsDistribution.cardsCounter2;
        }

        if (idx === 0) {
          setCardsAmountForGamer(
            ctx,
            gamersPositions[gamersPositions.length - 1].cards[0],
            gamersPositions[gamersPositions.length - 1].cards[1],
            (cardsDistribution.cardsCounter2 as number).toString()
          );
        } else {
          if (idx !== undefined) {
            setCardsAmountForGamer(
              ctx,
              gamersPositions[idx - 1].cards[0],
              gamersPositions[idx - 1].cards[1],
              (cardsDistribution.cardsCounter2 as number).toString()
            );
          }
        }

        (cardsDistribution.cardsCounter1 as number)++;

        if (cardsDistribution.cardsCounter1 === gamersPositions.length) {
          (cardsDistribution.cardsCounter2 as number)++;
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
        cardsDistribution(
          canvas,
          ctx,
          generator,
          gamersPositions,
          shuffleArrayCards,
          createUserCardsDuringCardsDistribution,
          setShuffleArrayCards,
          gamersPositions[idx].cards[0],
          gamersPositions[idx].cards[1]
        );
        createUserCardsDuringCardsDistribution();
      }
    }
  }

  fn();
};

export default cardsDistribution;
