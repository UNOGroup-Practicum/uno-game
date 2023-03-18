import { CardStatus } from "../types/enums";
import { TGamersList, TGamersPositions, TShuffleArrayCards } from "../types/typeAliases";

import createUserCardsWithCoordinates from "./createUserCardsWithCoordinates";
import setCardsAmountForGamer from "./setCardsAmountForGamer";

export default function handleActionTakeOneCard(
  refCountTakeOneCard: React.MutableRefObject<number>,
  shuffleArrayCards: TShuffleArrayCards,
  gamersList: TGamersList,
  setShuffleArrayCards: React.Dispatch<React.SetStateAction<TShuffleArrayCards | null>>,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gamerName: string,
  setActiveGamer: React.Dispatch<React.SetStateAction<string | null>>,
  gamersPositions: TGamersPositions
) {
  if (refCountTakeOneCard.current === 0) {
    const timer = setTimeout(() => {
      const copyShuffleArrayCards = [];
      let flag = false;

      for (let index = 0; index < shuffleArrayCards.length; index++) {
        if (
          shuffleArrayCards[index].owner !== gamersList[0].name &&
          shuffleArrayCards[index].owner !== gamersList[1].name &&
          shuffleArrayCards[index].status === CardStatus.inDeck &&
          !flag
        ) {
          copyShuffleArrayCards.push({
            ...shuffleArrayCards[index],
            owner: gamerName,
            status: CardStatus.inHands,
          });
          flag = true;
        } else {
          copyShuffleArrayCards.push(shuffleArrayCards[index]);
        }
      }

      setShuffleArrayCards(copyShuffleArrayCards);

      if (gamerName === gamersList[0].name) {
        createUserCardsWithCoordinates(canvas, ctx, gamersList[0].name, copyShuffleArrayCards);
      } else if (gamerName === gamersList[1].name) {
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
      }

      setActiveGamer(gamerName);

      refCountTakeOneCard.current++;

      clearTimeout(timer);
    }, 2000);
  } else {
    if (gamerName === gamersList[0].name) {
      setActiveGamer(gamersList[1].name);
    } else if (gamerName === gamersList[1].name) {
      setActiveGamer(gamersList[0].name);
    }

    refCountTakeOneCard.current = 0;
  }
}
