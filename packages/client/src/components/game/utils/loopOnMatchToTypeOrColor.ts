import { TShuffleArrayCards } from "../types/typeAliases";

export default function loopOnMatchToTypeOrColor(
  gamerCards: TShuffleArrayCards,
  cardInHeap: TShuffleArrayCards[0] | undefined,
  arr: TShuffleArrayCards
) {
  for (let index = 0; index < gamerCards.length; index++) {
    if (
      gamerCards[index].type === cardInHeap?.type ||
      gamerCards[index].color === cardInHeap?.color
    ) {
      arr.push(gamerCards[index]);
    }
  }
}
