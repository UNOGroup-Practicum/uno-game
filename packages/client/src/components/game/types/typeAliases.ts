import { CardStatus, Color } from "./enums";

export type TShuffleArrayCards = {
  id: number;
  owner: string;
  type:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "orderColor"
    | "skipTurn"
    | "takeTwoCards"
    | "takeFourCards"
    | "reverseStroke";
  color?: Color;
  value: number;
  status: CardStatus;
}[];

export type TCardsDistribution = {
  (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    generator: Generator,
    gamersPositions: TGamersPositions,
    shuffleArrayCards: TShuffleArrayCards,
    createUserCardsDuringCardsDistribution: () => void,
    setShuffleArrayCards: React.Dispatch<React.SetStateAction<TShuffleArrayCards | null>>,
    setIsButtonExitDisplayed: React.Dispatch<React.SetStateAction<boolean>>,
    xEndPoint: number,
    yEndPoint: number
  ): void;
  cardsCounter1: number | undefined;
  cardsCounter2: number | undefined;
};

export type TGamersList = { id: string; name: string }[];

export type TGamersPositions = {
  name: [number, number, string];
  image: [number, number];
  cards: [number, number, string];
}[];

export type TUserCards = {
  data: TShuffleArrayCards[0];
  coord: {
    xLeft: number;
    xRight: number;
    yTop: number;
    yBottom: number;
  };
}[];
