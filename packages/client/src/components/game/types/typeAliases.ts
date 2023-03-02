import { CardStatus } from "./enums";

export type TShuffleArrayCards = {
  id: number;
  owner: string;
  type: string;
  color?: string;
  value: number;
  status: CardStatus;
}[];

export type TCardsDistribution = {
  (xEndPoint: number, yEndPoint: number): void;
  cardsCounter1: number;
  cardsCounter2: number;
};
