import { Color } from "../types/enums";
import { TGamersList, TShuffleArrayCards } from "../types/typeAliases";

import createNextActionAndArrayCardsForMoves from "./createNextActionAndArrayCardsForMoves";

export default function defineFirstGamerMove(
  shuffleArrayCards: TShuffleArrayCards,
  gamersList: TGamersList,
  refCountTakeTwoCards: React.MutableRefObject<number>,
  refCountSkipTurn: React.MutableRefObject<number>,
  refCountTakeFourCards: React.MutableRefObject<number>,
  setCardColor: React.Dispatch<React.SetStateAction<Color | null>>,
  refCardColor: React.MutableRefObject<Color | null>,
  setIsModalCardColorOpen: React.Dispatch<React.SetStateAction<boolean>>,
  refCountOrderColor: React.MutableRefObject<number>
) {
  let name: string | null = null;

  let flag = true;

  while (flag) {
    for (let index = 0; index < gamersList.length; index++) {
      const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
        shuffleArrayCards,
        gamersList[index].name,
        refCountTakeTwoCards,
        refCountSkipTurn,
        refCountTakeFourCards,
        setCardColor,
        gamersList,
        refCardColor,
        setIsModalCardColorOpen,
        refCountOrderColor
      );

      if (nextActionAndArrayCardsForMoves?.action === "move") {
        name = gamersList[index].name;
        flag = false;
        break;
      }
    }

    return name;
  }
}
