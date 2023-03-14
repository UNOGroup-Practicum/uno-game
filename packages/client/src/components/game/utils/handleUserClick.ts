import { CardStatus } from "../types/enums";
import { TGamersList, TGamersPositions, TShuffleArrayCards } from "../types/typeAliases";

import createCanvasCenter from "./createCanvasCenter";
import createGamerName from "./createGamerName";
import createNextActionAndArrayCardsForMoves from "./createNextActionAndArrayCardsForMoves";
import createUserCardsWithCoordinates from "./createUserCardsWithCoordinates";

export default function handleUserClick(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gamersList: TGamersList,
  shuffleArrayCards: TShuffleArrayCards,
  setShuffleArrayCards: (arg0: TShuffleArrayCards) => void,
  setActiveGamer: (arg0: string) => void,
  gamersPositions: TGamersPositions
) {
  function handleClick(e: { clientX: number; clientY: number }) {
    const element = createUserCardsWithCoordinates(
      canvas,
      ctx,
      gamersList[0].name,
      shuffleArrayCards
    ).find((item) => {
      if (
        e.clientX > item.coord.xLeft &&
        e.clientX < item.coord.xRight &&
        e.clientY > item.coord.yTop &&
        e.clientY < item.coord.yBottom
      ) {
        return true;
      }
    });

    if (element) {
      const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
        shuffleArrayCards as TShuffleArrayCards,
        gamersList[0].name
      );

      const index = nextActionAndArrayCardsForMoves?.cardsForMoves.findIndex(
        (item) => item.id === element.data.id
      );

      if (index !== -1) {
        const copiedShuffleArrayCards = shuffleArrayCards?.map((item) => {
          if (item.status === CardStatus.inHeap) {
            return { ...item, status: CardStatus.inOutside };
          } else if (element.data.id === item.id) {
            return { ...item, status: CardStatus.inHeap };
          } else {
            return item;
          }
        });

        copiedShuffleArrayCards && setShuffleArrayCards(copiedShuffleArrayCards);

        if (gamersPositions) {
          ctx?.clearRect(gamersPositions[0].name[0], gamersPositions[0].name[1] - 20, 120, 25);
          createGamerName(
            ctx as CanvasRenderingContext2D,
            gamersPositions[0].name[0],
            gamersPositions[0].name[1],
            gamersPositions[0].name[2]
          );
        }

        if (copiedShuffleArrayCards) {
          createUserCardsWithCoordinates(
            canvas as HTMLCanvasElement,
            ctx as CanvasRenderingContext2D,
            gamersList[0].name,
            copiedShuffleArrayCards
          );
          createCanvasCenter(
            canvas as HTMLCanvasElement,
            ctx as CanvasRenderingContext2D,
            (gamersPositions as TGamersPositions)[0].cards[1] + 30,
            copiedShuffleArrayCards,
            "right"
          );
        }

        setActiveGamer(gamersList[1].name);
        document.removeEventListener("click", handleClick);
      }
    }
  }
  return handleClick;
}
