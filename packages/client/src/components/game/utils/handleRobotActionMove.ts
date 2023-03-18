import { CardStatus } from "../types/enums";
import { TGamersList, TGamersPositions, TShuffleArrayCards } from "../types/typeAliases";

import createCanvasCenter from "./createCanvasCenter";
import setCardsAmountForGamer from "./setCardsAmountForGamer";

export default function handleRobotActionMove(
  shuffleArrayCards: TShuffleArrayCards,
  nextActionAndArrayCardsForMoves: any,
  setShuffleArrayCards: React.Dispatch<React.SetStateAction<TShuffleArrayCards | null>>,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gamersPositions: TGamersPositions,
  setActiveGamer: React.Dispatch<React.SetStateAction<string | null>>,
  refCountTakeOneCard: React.MutableRefObject<number>,
  gamersList: TGamersList
) {
  const timer = setTimeout(() => {
    const copiedShuffleArrayCards = shuffleArrayCards?.map((item) => {
      if (item.status === CardStatus.inHeap) {
        return { ...item, status: CardStatus.inOutside };
      } else if (nextActionAndArrayCardsForMoves.cardsForMoves[0].id === item.id) {
        return { ...item, status: CardStatus.inHeap };
      } else {
        return item;
      }
    });

    setShuffleArrayCards(copiedShuffleArrayCards);

    const countRobotCards = copiedShuffleArrayCards.reduce(
      (acc, item) =>
        item.owner === gamersList[1].name && item.status === CardStatus.inHands ? (acc += 1) : acc,
      0
    );

    setCardsAmountForGamer(
      ctx,
      gamersPositions[1].cards[0],
      gamersPositions[1].cards[1],
      countRobotCards.toString()
    );

    createCanvasCenter(canvas, ctx, gamersPositions[0].cards[1] + 30, copiedShuffleArrayCards);

    setActiveGamer(gamersList[0].name);

    refCountTakeOneCard.current = 0;

    clearTimeout(timer);
  }, 2000);
}
