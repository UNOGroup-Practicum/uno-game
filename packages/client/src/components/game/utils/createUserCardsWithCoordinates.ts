import { CardStatus, CardType } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";
import createDigitCard from "./createDigitCard";
import createOrderColorCard from "./createOrderColorCard";
import createReverseStrokeCard from "./createReverseStrokeCard";
import createSkipTurnCard from "./createSkipTurnCard";
import createTakeFourCard from "./createTakeFourCard";
import createTakeTwoCard from "./createTakeTwoCard";

export default function createUserCardsWithCoordinates(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  userName: string,
  shuffleArrayCards: TShuffleArrayCards
) {
  const amountUserCards = shuffleArrayCards.reduce(
    (acc, item) =>
      userName === item.owner && item.status === CardStatus.inHands ? (acc += 1) : acc,
    0
  );

  let rate = 40 * amountUserCards;

  const userCards: {
    data: TShuffleArrayCards[0];
    coord: { xLeft: number; xRight: number; yTop: number; yBottom: number };
  }[] = [];

  const coord = {
    x: canvas.width / 2,
    y: canvas.height - 140,
  };

  ctx.clearRect(0, coord.y, canvas.width, 120);

  for (let index = 0; index < shuffleArrayCards.length; index++) {
    if (
      shuffleArrayCards[index].owner === userName &&
      shuffleArrayCards[index].status === CardStatus.inHands &&
      userCards.length < amountUserCards - 1
    ) {
      userCards.push({
        data: { ...shuffleArrayCards[index] },
        coord: {
          xLeft: coord.x - (rate / 2 + 20),
          xRight: coord.x - (rate / 2 - 20),
          yTop: coord.y,
          yBottom: coord.y + 120,
        },
      });
      coord.x = coord.x + 20;
      rate -= 40;
    } else if (
      shuffleArrayCards[index].owner === userName &&
      shuffleArrayCards[index].status === CardStatus.inHands &&
      userCards.length === amountUserCards - 1
    ) {
      userCards.push({
        data: { ...shuffleArrayCards[index] },
        coord: {
          xLeft: coord.x - (rate / 2 + 20),
          xRight: coord.x - (rate / 2 - 60),
          yTop: coord.y,
          yBottom: coord.y + 120,
        },
      });
      break;
    }
  }

  userCards.forEach((element) => {
    if (isFinite(Number(element.data.type))) {
      createDigitCard(
        ctx,
        element.coord.xLeft,
        element.coord.yTop,
        element.data.type,
        element.data.color as string
      );
    } else {
      if (element.data.type === CardType.skipTurn) {
        createSkipTurnCard(
          ctx,
          element.coord.xLeft,
          element.coord.yTop,
          element.data.color as string
        );
      } else if (element.data.type === CardType.reverseStroke) {
        createReverseStrokeCard(
          ctx,
          element.coord.xLeft,
          element.coord.yTop,
          element.data.color as string
        );
      } else if (element.data.type === CardType.takeTwo) {
        createTakeTwoCard(
          ctx,
          element.coord.xLeft,
          element.coord.yTop,
          element.data.color as string
        );
      } else if (element.data.type === CardType.orderColor) {
        createOrderColorCard(ctx, element.coord.xLeft, element.coord.yTop);
      } else if (element.data.type === CardType.takeFour) {
        createTakeFourCard(ctx, element.coord.xLeft, element.coord.yTop);
      }
    }
  });

  return userCards;
}
