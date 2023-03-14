import { CardStatus } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

type TCreateNextActionAndArrayCardsForMoves = {
  (shuffleArrayCards: TShuffleArrayCards, gamerName: string):
    | {
        action:
          | "move"
          | "skipTurn"
          | "reverseStroke"
          | "takeOneCard"
          | "takeTwoCards"
          | "takeFourCards"
          | "orderColor";
        cardsForMoves: TShuffleArrayCards;
      }
    | undefined;
  counter: number | undefined;
};

function loopAndPush(
  gamerCards: TShuffleArrayCards,
  cardInHeap: TShuffleArrayCards[0],
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

const createNextActionAndArrayCardsForMoves: TCreateNextActionAndArrayCardsForMoves = (
  shuffleArrayCards,
  gamerName
) => {
  if (!createNextActionAndArrayCardsForMoves.counter) {
    createNextActionAndArrayCardsForMoves.counter = 0;
  }

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
        gamerCards[index].type === "takeFourCards"
      ) {
        arr.push(gamerCards[index]);
      }
    }

    if (arr.length) {
      createNextActionAndArrayCardsForMoves.counter = 0;
      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "takeOneCard", cardsForMoves: [] };
    }
  } else if (
    (cardInHeap?.type === "skipTurn" || cardInHeap?.type === "reverseStroke") &&
    cardInHeap.owner !== gamerName
  ) {
    if (createNextActionAndArrayCardsForMoves.counter === 0) {
      const obj = { action: cardInHeap?.type, cardsForMoves: [] };
      createNextActionAndArrayCardsForMoves.counter++;
      return obj;
    } else {
      loopAndPush(gamerCards, cardInHeap, arr);

      if (arr.length) {
        createNextActionAndArrayCardsForMoves.counter = 0;
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  } else if (
    (cardInHeap?.type === "skipTurn" || cardInHeap?.type === "reverseStroke") &&
    cardInHeap.owner === gamerName
  ) {
    loopAndPush(gamerCards, cardInHeap, arr);

    if (arr.length) {
      createNextActionAndArrayCardsForMoves.counter = 0;
      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "takeOneCard", cardsForMoves: [] };
    }
  } else if (cardInHeap?.type === "takeTwoCards" && cardInHeap.owner === gamerName) {
    loopAndPush(gamerCards, cardInHeap, arr);

    if (arr.length) {
      createNextActionAndArrayCardsForMoves.counter = 0;
      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "takeOneCard", cardsForMoves: [] };
    }
  } else if (cardInHeap?.type === "takeTwoCards" && cardInHeap.owner !== gamerName) {
    if (createNextActionAndArrayCardsForMoves.counter === 0) {
      for (let index = 0; index < gamerCards.length; index++) {
        if (gamerCards[index].type === cardInHeap?.type) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        createNextActionAndArrayCardsForMoves.counter = 0;
        return { action: "move", cardsForMoves: arr };
      } else {
        createNextActionAndArrayCardsForMoves.counter++;
        return { action: "takeTwoCards", cardsForMoves: [] };
      }
    } else {
      loopAndPush(gamerCards, cardInHeap, arr);

      if (arr.length) {
        createNextActionAndArrayCardsForMoves.counter = 0;
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  } else if (
    (cardInHeap?.type === "takeFourCards" || cardInHeap?.type === "orderColor") &&
    cardInHeap.owner === gamerName
  ) {
    for (let index = 0; index < gamerCards.length; index++) {
      arr.push(gamerCards[index]);
    }

    if (arr.length) {
      createNextActionAndArrayCardsForMoves.counter = 0;
      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "skipTurn", cardsForMoves: [] };
    }
  } else if (cardInHeap?.type === "takeFourCards" && cardInHeap.owner !== gamerName) {
    return { action: "takeFourCards", cardsForMoves: [] };
  } else if (cardInHeap?.type === "orderColor" && cardInHeap.owner !== gamerName) {
    return { action: "skipTurn", cardsForMoves: [] };
  }
};

export default createNextActionAndArrayCardsForMoves;
