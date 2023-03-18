import { Color } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

export default function loopOnMatchToCardColor(
  gamerCards: TShuffleArrayCards,
  refCardColor: React.MutableRefObject<Color | null>,
  arr: TShuffleArrayCards
) {
  for (let index = 0; index < gamerCards.length; index++) {
    if (gamerCards[index].color === refCardColor.current) {
      arr.push(gamerCards[index]);
    }
  }
}
