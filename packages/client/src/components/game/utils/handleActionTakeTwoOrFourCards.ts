import { CardStatus } from "../types/enums";
import { TGamersList, TGamersPositions, TShuffleArrayCards } from "../types/typeAliases";

import createUserCardsWithCoordinates from "./createUserCardsWithCoordinates";
import setCardsAmountForGamer from "./setCardsAmountForGamer";

export default function handleActionTakeTwoOrFourCards(
  amountCards: 2 | 4,
  shuffleArrayCards: TShuffleArrayCards,
  gamersList: TGamersList,
  setShuffleArrayCards: React.Dispatch<React.SetStateAction<TShuffleArrayCards | null>>,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  setActiveGamer: React.Dispatch<React.SetStateAction<string | null>>,
  gamerName: string,
  gamersPositions: TGamersPositions
) {
  const timer = setTimeout(() => {
    const copyShuffleArrayCards = [];
    let flag = 0;

    for (let index = 0; index < shuffleArrayCards.length; index++) {
      if (
        shuffleArrayCards[index].owner !== gamersList[0].name &&
        shuffleArrayCards[index].owner !== gamersList[1].name &&
        shuffleArrayCards[index].status === CardStatus.inDeck &&
        flag !== amountCards
      ) {
        copyShuffleArrayCards.push({
          ...shuffleArrayCards[index],
          owner: gamerName,
          status: CardStatus.inHands,
        });
        flag++;
      } else {
        copyShuffleArrayCards.push(shuffleArrayCards[index]);
      }
    }

    setShuffleArrayCards(copyShuffleArrayCards);

    if (gamerName === gamersList[1].name) {
      const countRobotCards = copyShuffleArrayCards.reduce(
        (acc, item) =>
          item.owner === gamersList[1].name && item.status === CardStatus.inHands
            ? (acc += 1)
            : acc,
        0
      );

      setCardsAmountForGamer(
        ctx,
        gamersPositions[1].cards[0],
        gamersPositions[1].cards[1],
        countRobotCards.toString()
      );

      setActiveGamer(gamersList[0].name);
    } else if (gamerName === gamersList[0].name) {
      createUserCardsWithCoordinates(
        canvas as HTMLCanvasElement,
        ctx as CanvasRenderingContext2D,
        gamersList[0].name,
        copyShuffleArrayCards
      );

      setActiveGamer(gamersList[1].name);
    }

    clearTimeout(timer);
  }, 2000);
}
