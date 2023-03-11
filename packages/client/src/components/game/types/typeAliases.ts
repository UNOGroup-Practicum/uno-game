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
    | "takeTwo"
    | "takeFour"
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
    gamersPositions: {
      name: [number, number, string];
      image: [number, number];
      cards: [number, number, string];
    }[],
    shuffleArrayCards: TShuffleArrayCards,
    createUserCardsDuringCardsDistribution: () => void,
    setShuffleArrayCards: (value: React.SetStateAction<TShuffleArrayCards | null>) => void,
    xEndPoint: number,
    yEndPoint: number
  ): void;
  cardsCounter1: number;
  cardsCounter2: number;
};

export type TGamersList = { id: string; name: string }[];

export type TGamersPositions = {
  name: [number, number, string];
  image: [number, number];
  cards: [number, number, string];
}[];
