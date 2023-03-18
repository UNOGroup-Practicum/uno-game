import { CardStatus, CardType } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

import createBackSideCard from "./createBackSideCard";
import createDigitCard from "./createDigitCard";
import createOrderColorCard from "./createOrderColorCard";
import createReverseStrokeCard from "./createReverseStrokeCard";
import createSkipTurnCard from "./createSkipTurnCard";
import createTakeFourCard from "./createTakeFourCard";
import createTakeTwoCard from "./createTakeTwoCard";

export default function createCanvasCenter(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  yEndPoint: number,
  shuffleArrayCards: TShuffleArrayCards
) {
  const point = {
    x: canvas.width / 2,
    xMinus40: canvas.width / 2 - 40,
    y: canvas.height / 2,
    yMinus60: canvas.height / 2 - 60,
  };

  ctx.clearRect(0, yEndPoint + 30, canvas.width, canvas.height - 330);

  const amountCardsinDeck = shuffleArrayCards.reduce(
    (acc, item) => (item.status === CardStatus.inDeck ? (acc += 1) : acc),
    0
  );

  if (amountCardsinDeck) {
    createBackSideCard(ctx, point.x - 100, point.yMinus60);
  } else {
    ctx.clearRect(point.x - 100, point.yMinus60 - 2, 80, 124);
  }

  for (let index = 0; index < shuffleArrayCards.length; index++) {
    if (shuffleArrayCards[index].status === CardStatus.inHeap) {
      if (isFinite(Number(shuffleArrayCards[index].type))) {
        createDigitCard(
          ctx,
          point.x + 20,
          point.yMinus60,
          shuffleArrayCards[index].type,
          shuffleArrayCards[index].color as string
        );
      } else {
        if (shuffleArrayCards[index].type === CardType.skipTurn) {
          createSkipTurnCard(
            ctx,
            point.x + 20,
            point.yMinus60,
            shuffleArrayCards[index].color as string
          );
        } else if (shuffleArrayCards[index].type === CardType.reverseStroke) {
          createReverseStrokeCard(
            ctx,
            point.x + 20,
            point.yMinus60,
            shuffleArrayCards[index].color as string
          );
        } else if (shuffleArrayCards[index].type === CardType.takeTwo) {
          createTakeTwoCard(
            ctx,
            point.x + 20,
            point.yMinus60,
            shuffleArrayCards[index].color as string
          );
        } else if (shuffleArrayCards[index].type === CardType.orderColor) {
          createOrderColorCard(ctx, point.x + 20, point.yMinus60);
        } else if (shuffleArrayCards[index].type === CardType.takeFour) {
          createTakeFourCard(ctx, point.x + 20, point.yMinus60);
        }
      }
    }
  }
}
