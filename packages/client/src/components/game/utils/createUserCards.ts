import { CardType } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";
import createDigitCard from "./createDigitCard";
import createOrderColorCard from "./createOrderColorCard";
import createReverseStrokeCard from "./createReverseStrokeCard";
import createSkipTurnCard from "./createSkipTurnCard";
import createTakeFourCard from "./createTakeFourCard";
import createTakeTwoCard from "./createTakeTwoCard";

export default function createUserCards(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gamersList: { id: string; name: string }[],
  shuffleArrayCards: TShuffleArrayCards
) {
  const userCards: TShuffleArrayCards = [];
  const indexes: number[] = [];
  let rate = 160;

  function fn() {
    const coord = {
      x: canvas.width / 2 - rate,
      y: canvas.height - 140,
    };

    if (userCards.length === 0) {
      for (let index = 0; index < shuffleArrayCards.length; index++) {
        if (shuffleArrayCards[index].owner === gamersList[0].name) {
          userCards.push(shuffleArrayCards[index]);
          indexes.push(index);
          break;
        }
      }
      rate -= 40;
    } else {
      for (let index = 0; index < shuffleArrayCards.length; index++) {
        if (shuffleArrayCards[index].owner === gamersList[0].name && !indexes.includes(index)) {
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

    return userCards;
  }

  return fn;
}
