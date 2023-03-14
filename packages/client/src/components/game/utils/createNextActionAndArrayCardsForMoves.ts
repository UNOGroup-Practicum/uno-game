import { CardStatus } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

export default function createNextActionAndArrayCardsForMoves(
  shuffleArrayCards: TShuffleArrayCards,
  gamerName: string
):
  | {
      action:
        | "move"
        | "skip"
        | "reverse"
        | "takeOneCard"
        | "takeTwoCards"
        | "takeFourCards"
        | "orderColor";
      cardsForMoves: TShuffleArrayCards;
    }
  | undefined {
  if (shuffleArrayCards) {
    const cardInHeap = shuffleArrayCards.find((item) => item.status === CardStatus.inHeap);
    const gamerCards = shuffleArrayCards.reduce(
      (acc: TShuffleArrayCards, item) =>
        gamerName === item.owner && item.status === CardStatus.inHands ? acc.concat(item) : acc,
      []
    );

    const arr: TShuffleArrayCards = [];

    if (isFinite(Number(cardInHeap?.type))) {
      for (let index = 0; index < gamerCards.length; index++) {
        if (
          gamerCards[index].type === cardInHeap?.type ||
          cardInHeap?.color === gamerCards[index].color ||
          gamerCards[index].type === "orderColor" ||
          gamerCards[index].type === "takeFour"
        ) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap?.type === "skipTurn" && cardInHeap.owner !== gamerName) {
      return { action: "skip", cardsForMoves: [] };
    } else if (cardInHeap?.type === "skipTurn" && cardInHeap.owner === gamerName) {
      for (let index = 0; index < gamerCards.length; index++) {
        if (
          gamerCards[index].type === "skipTurn" ||
          gamerCards[index].color === cardInHeap?.color
        ) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap?.type === "reverseStroke" && cardInHeap.owner !== gamerName) {
      return { action: "reverse", cardsForMoves: [] };
    } else if (cardInHeap?.type === "reverseStroke" && cardInHeap.owner === gamerName) {
      for (let index = 0; index < gamerCards.length; index++) {
        if (
          gamerCards[index].type === "reverseStroke" ||
          gamerCards[index].color === cardInHeap?.color
        ) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap?.type === "takeTwo" && cardInHeap.owner === gamerName) {
      for (let index = 0; index < gamerCards.length; index++) {
        if (
          gamerCards[index].type === cardInHeap?.type ||
          gamerCards[index].color === cardInHeap?.color
        ) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeTwoCards", cardsForMoves: [] };
      }
    } else if (cardInHeap?.type === "takeTwo" && cardInHeap.owner !== gamerName) {
      return { action: "takeTwoCards", cardsForMoves: [] };
    } else if (cardInHeap?.type === "takeFour" && cardInHeap.owner !== gamerName) {
      return { action: "takeFourCards", cardsForMoves: [] };
    } else if (cardInHeap?.type === "takeFour" && cardInHeap.owner === gamerName) {
      for (let index = 0; index < gamerCards.length; index++) {
        arr.push(gamerCards[index]);
      }

      if (arr.length) {
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "skip", cardsForMoves: [] };
      }
    } else if (cardInHeap?.type === "orderColor" && cardInHeap.owner !== gamerName) {
      return { action: "skip", cardsForMoves: [] };
    } else if (cardInHeap?.type === "orderColor" && cardInHeap.owner === gamerName) {
      for (let index = 0; index < gamerCards.length; index++) {
        arr.push(gamerCards[index]);
      }

      if (arr.length) {
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "skip", cardsForMoves: [] };
      }
    }
  }
}
