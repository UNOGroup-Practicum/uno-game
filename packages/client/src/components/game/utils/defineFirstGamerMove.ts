import { Color } from "../types/enums";
import { TGamersList, TShuffleArrayCards } from "../types/typeAliases";

import createNextActionAndArrayCardsForMoves from "./createNextActionAndArrayCardsForMoves";

export default function defineFirstGamerMove(
  shuffleArrayCards: TShuffleArrayCards,
  gamersList: TGamersList,
  cardColor: Color | null,
  setCardColor: React.Dispatch<React.SetStateAction<Color | null>>
) {
  let name: string | null = null;

  let flag = true;

  while (flag) {
    for (let index = 0; index < gamersList.length; index++) {
      const nextActionAndArrayCardsForMoves = createNextActionAndArrayCardsForMoves(
        shuffleArrayCards,
        gamersList[index].name,
        cardColor,
        setCardColor
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
