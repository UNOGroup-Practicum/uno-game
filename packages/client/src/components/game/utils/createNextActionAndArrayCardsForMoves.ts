import { CardStatus, Color } from "../types/enums";
import { TGamersList, TShuffleArrayCards } from "../types/typeAliases";

import defineCardColorByRobot from "./defineCardColorByRobot";
import loopOnMatchToCardColor from "./loopOnMatchToCardColor";
import loopOnMatchToTakeTwoCardsAndCardColor from "./loopOnMatchToTakeTwoCardsAndCardColor";
import loopOnMatchToTypeOrColor from "./loopOnMatchToTypeOrColor";

type TCreateNextActionAndArrayCardsForMoves = {
  (
    shuffleArrayCards: TShuffleArrayCards,
    gamerName: string,
    refCountTakeTwoCards: React.MutableRefObject<number>,
    refCountSkipTurn: React.MutableRefObject<number>,
    refCountTakeFourCards: React.MutableRefObject<number>,
    setCardColor: React.Dispatch<React.SetStateAction<Color | null>>,
    gamersList: TGamersList,
    refCardColor: React.MutableRefObject<Color | null>,
    setIsModalCardColorOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refCountOrderColor: React.MutableRefObject<number>
  ):
    | {
        action:
          | "move"
          | "skipTurn"
          | "reverseStroke"
          | "takeOneCard"
          | "takeTwoCards"
          | "takeFourCards"
          | "orderColor"
          | "selectCardColorForTakeFourCards"
          | "selectCardColorForOrderColor";
        cardsForMoves: TShuffleArrayCards;
      }
    | undefined;
};

const createNextActionAndArrayCardsForMoves: TCreateNextActionAndArrayCardsForMoves = (
  shuffleArrayCards,
  gamerName,
  refCountTakeTwoCards,
  refCountSkipTurn,
  refCountTakeFourCards,
  setCardColor,
  gamersList,
  refCardColor,
  setIsModalCardColorOpen,
  refCountOrderColor
) => {
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
      if (cardInHeap?.owner === gamersList[1].name) {
        refCardColor.current = null;
        setCardColor(null);
      }

      return { action: "move", cardsForMoves: arr };
    } else {
      return { action: "takeOneCard", cardsForMoves: [] };
    }
  } else if (cardInHeap?.type === "skipTurn" || cardInHeap?.type === "reverseStroke") {
    if (cardInHeap.owner !== gamerName && refCountSkipTurn.current === 0) {
      refCountSkipTurn.current++;

      return { action: "skipTurn", cardsForMoves: [] };
    } else if (
      (cardInHeap.owner !== gamerName && refCountSkipTurn.current !== 0) ||
      cardInHeap.owner === gamerName
    ) {
      loopOnMatchToTypeOrColor(gamerCards, cardInHeap, arr);

      if (arr.length) {
        refCountSkipTurn.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  } else if (cardInHeap?.type === "takeTwoCards") {
    if (cardInHeap.owner !== gamerName && refCountTakeTwoCards.current === 0) {
      for (let index = 0; index < gamerCards.length; index++) {
        if (gamerCards[index].type === cardInHeap?.type) {
          arr.push(gamerCards[index]);
        }
      }

      if (arr.length) {
        refCountTakeTwoCards.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        refCountTakeTwoCards.current++;

        return { action: "takeTwoCards", cardsForMoves: [] };
      }
    } else if (
      (cardInHeap.owner !== gamerName && refCountTakeTwoCards.current !== 0) ||
      cardInHeap.owner === gamerName
    ) {
      loopOnMatchToTypeOrColor(gamerCards, cardInHeap, arr);

      if (arr.length) {
        refCountTakeTwoCards.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        refCountTakeTwoCards.current++;

        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  } else if (cardInHeap?.type === "takeFourCards") {
    if (cardInHeap.owner === gamersList[1].name && refCountTakeFourCards.current === 0) {
      defineCardColorByRobot(shuffleArrayCards, gamersList, refCardColor, setCardColor);

      loopOnMatchToTakeTwoCardsAndCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountTakeFourCards.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        refCountTakeFourCards.current = 1;

        return { action: "takeFourCards", cardsForMoves: [] };
      }
    } else if (cardInHeap.owner === gamersList[1].name && refCountTakeFourCards.current === 1) {
      loopOnMatchToCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountTakeFourCards.current = 0;

        const timer = setTimeout(() => {
          refCardColor.current = null;
          setCardColor(null);
          clearTimeout(timer);
        }, 2000);

        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap.owner === gamersList[0].name && refCountTakeFourCards.current === 0) {
      refCountTakeFourCards.current = 2;

      setIsModalCardColorOpen(true);

      return { action: "selectCardColorForTakeFourCards", cardsForMoves: [] };
    } else if (cardInHeap.owner === gamersList[0].name && refCountTakeFourCards.current === 2) {
      loopOnMatchToTakeTwoCardsAndCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountTakeFourCards.current = 0;

        const timer = setTimeout(() => {
          refCardColor.current = null;
          setCardColor(null);
          clearTimeout(timer);
        }, 2000);

        return { action: "move", cardsForMoves: arr };
      } else {
        refCountTakeFourCards.current = 3;

        return { action: "takeFourCards", cardsForMoves: [] };
      }
    } else if (cardInHeap.owner === gamersList[0].name && refCountTakeFourCards.current === 3) {
      loopOnMatchToCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountTakeFourCards.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  } else if (cardInHeap?.type === "orderColor") {
    if (cardInHeap.owner === gamersList[1].name && refCountOrderColor.current === 0) {
      defineCardColorByRobot(shuffleArrayCards, gamersList, refCardColor, setCardColor);

      loopOnMatchToCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountOrderColor.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        refCountOrderColor.current = 1;

        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap.owner === gamersList[1].name && refCountOrderColor.current === 1) {
      loopOnMatchToCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountOrderColor.current = 0;

        const timer = setTimeout(() => {
          refCardColor.current = null;
          setCardColor(null);
          clearTimeout(timer);
        }, 2000);

        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap.owner === gamersList[0].name && refCountOrderColor.current === 0) {
      refCountOrderColor.current = 2;

      setIsModalCardColorOpen(true);

      return { action: "selectCardColorForOrderColor", cardsForMoves: [] };
    } else if (cardInHeap.owner === gamersList[0].name && refCountOrderColor.current === 2) {
      loopOnMatchToCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountOrderColor.current = 0;

        const timer = setTimeout(() => {
          refCardColor.current = null;
          setCardColor(null);
          clearTimeout(timer);
        }, 2000);

        return { action: "move", cardsForMoves: arr };
      } else {
        refCountOrderColor.current = 3;

        return { action: "takeOneCard", cardsForMoves: [] };
      }
    } else if (cardInHeap.owner === gamersList[0].name && refCountOrderColor.current === 3) {
      loopOnMatchToCardColor(gamerCards, refCardColor, arr);

      if (arr.length) {
        refCountOrderColor.current = 0;

        return { action: "move", cardsForMoves: arr };
      } else {
        return { action: "takeOneCard", cardsForMoves: [] };
      }
    }
  }
};

export default createNextActionAndArrayCardsForMoves;
