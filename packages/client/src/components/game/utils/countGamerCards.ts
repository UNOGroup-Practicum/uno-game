import { CardStatus } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

export default function countGamerCards(
  gamerName: string,
  shuffleArrayCards: TShuffleArrayCards
): number {
  const gamerCards = shuffleArrayCards.reduce(
    (acc: TShuffleArrayCards, item) =>
      gamerName === item.owner && item.status === CardStatus.inHands ? acc.concat(item) : acc,
    []
  );
  return gamerCards.length;
}
