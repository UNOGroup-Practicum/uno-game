import { CardStatus, Color } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

type TCreateNextActionAndArrayCardsForMoves = {
  (
    shuffleArrayCards: TShuffleArrayCards,
    gamerName: string,
    cardColor: Color | null,
    setCardColor: React.Dispatch<React.SetStateAction<Color | null>>
  ):
    | {
        action:
          | "move"
          | "skipTurn"
          | "reverseStroke"
          | "takeOneCard"
          | "takeTwoCards"
          | "takeFourCards"
          | "selectCardColorForTakeFourCards"
          | "orderColor"
          | "selectCardColorForOrderColor";
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
  gamerName,
  cardColor,
  setCardColor
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
      createNextActionAndArrayCardsForMoves.counter++;
      return { action: cardInHeap?.type, cardsForMoves: [] };
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
  } else if (cardInHeap?.type === "takeFourCards" && cardInHeap.owner !== gamerName) {
    if (createNextActionAndArrayCardsForMoves.counter === 0) {
      createNextActionAndArrayCardsForMoves.counter++;
      return { action: "selectCardColorForTakeFourCards", cardsForMoves: [] };
    } else {
      if (cardColor) {
        for (let index = 0; index < gamerCards.length; index++) {
          if (gamerCards[index].type === "takeTwoCards" && gamerCards[index].color === cardColor) {
            arr.push(gamerCards[index]);
          }
        }

        if (arr.length) {
          createNextActionAndArrayCardsForMoves.counter = 0;
          setCardColor(null);
          return { action: "move", cardsForMoves: arr };
        } else {
          return { action: "takeFourCards", cardsForMoves: [] };
        }
      } else {
        for (let index = 0; index < gamerCards.length; index++) {
          if (gamerCards[index].type === "takeTwoCards" && gamerCards[index].color === cardColor) {
            arr.push(gamerCards[index]);
          }
        }

        if (arr.length) {
          createNextActionAndArrayCardsForMoves.counter = 0;
          setCardColor(null);
          return { action: "move", cardsForMoves: arr };
        } else {
          return { action: "takeOneCard", cardsForMoves: [] };
        }
      }
    }
  } else if (cardInHeap?.type === "takeFourCards" && cardInHeap.owner === gamerName && cardColor) {
    for (let index = 0; index < gamerCards.length; index++) {
      if (
        gamerCards[index].color === cardColor ||
        gamerCards[index].type === "orderColor" ||
        gamerCards[index].type === "takeFourCards"
      ) {
        arr.push(gamerCards[index]);
      }
    }

    if (arr.length) {
      createNextActionAndArrayCardsForMoves.counter = 0;
      if (cardInHeap.owner === "Robot") {
        const timer = setTimeout(() => {
          setCardColor(null);
          clearTimeout(timer);
        }, 2000);
      }
      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "takeOneCard", cardsForMoves: [] };
    }
  } else if (cardInHeap?.type === "orderColor" && cardInHeap.owner !== gamerName) {
    if (createNextActionAndArrayCardsForMoves.counter === 0) {
      createNextActionAndArrayCardsForMoves.counter++;
      return { action: "selectCardColorForOrderColor", cardsForMoves: [] };
    } else {
      for (let index = 0; index < gamerCards.length; index++) {
        if (gamerCards[index].color === cardColor) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        createNextActionAndArrayCardsForMoves.counter = 0;
        setCardColor(null);
        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  } else if (cardInHeap?.type === "orderColor" && cardInHeap.owner === gamerName && cardColor) {
    for (let index = 0; index < gamerCards.length; index++) {
      if (
        gamerCards[index].color === cardColor ||
        gamerCards[index].type === "orderColor" ||
        gamerCards[index].type === "takeFourCards"
      ) {
        arr.push(gamerCards[index]);
      }
    }

    if (arr.length) {
      createNextActionAndArrayCardsForMoves.counter = 0;
      if (cardInHeap.owner === "Robot") {
        const timer = setTimeout(() => {
          setCardColor(null);
          clearTimeout(timer);
        }, 2000);
      }
      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "takeOneCard", cardsForMoves: [] };
    }
  }
};

export default createNextActionAndArrayCardsForMoves;
