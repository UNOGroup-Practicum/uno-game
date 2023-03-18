import { CardStatus, Color } from "../types/enums";
import {
  TGamersList,
  TGamersPositions,
  TShuffleArrayCards,
  TUserCards,
} from "../types/typeAliases";

import createCanvasCenter from "./createCanvasCenter";
import createGamerName from "./createGamerName";
import createUserCardsWithCoordinates from "./createUserCardsWithCoordinates";

export default function handleUserClick(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gamersList: TGamersList,
  shuffleArrayCards: TShuffleArrayCards,
  setShuffleArrayCards: (arg0: TShuffleArrayCards) => void,
  setActiveGamer: (arg0: string) => void,
  gamersPositions: TGamersPositions,
  cardsWithCoordinates: TUserCards,
  cardsForMoves: TShuffleArrayCards,
  refCardColor: React.MutableRefObject<Color | null>,
  setCardColor: React.Dispatch<React.SetStateAction<Color | null>>
) {
  function handleClick(e: { clientX: number; clientY: number }) {
    const card = cardsWithCoordinates.find((item) => {
      if (
        e.clientX > item.coord.xLeft &&
        e.clientX < item.coord.xRight &&
        e.clientY > item.coord.yTop &&
        e.clientY < item.coord.yBottom
      ) {
        return true;
      }
    });

    const index = cardsForMoves.findIndex((item) => item.id === card?.data.id);

    if (index !== -1) {
      const copyShuffleArrayCards = shuffleArrayCards?.map((item) => {
        if (item.status === CardStatus.inHeap) {
          return { ...item, status: CardStatus.inOutside };
        } else if (card?.data.id === item.id) {
          return { ...item, status: CardStatus.inHeap };
        } else {
          return item;
        }
      });

      setShuffleArrayCards(copyShuffleArrayCards);

      if (gamersPositions) {
        ctx?.clearRect(gamersPositions[0].name[0], gamersPositions[0].name[1] - 20, 120, 25);
        createGamerName(
          ctx as CanvasRenderingContext2D,
          gamersPositions[0].name[0],
          gamersPositions[0].name[1],
          gamersPositions[0].name[2]
        );
      }

      createUserCardsWithCoordinates(
        canvas as HTMLCanvasElement,
        ctx as CanvasRenderingContext2D,
        gamersList[0].name,
        copyShuffleArrayCards
      );

      createCanvasCenter(
        canvas as HTMLCanvasElement,
        ctx as CanvasRenderingContext2D,
        (gamersPositions as TGamersPositions)[0].cards[1] + 30,
        copyShuffleArrayCards
      );

      setActiveGamer(gamersList[1].name);

      refCardColor.current = null;

      setCardColor(null);

      document.removeEventListener("click", handleClick);
    }
  }
  return handleClick;
}
