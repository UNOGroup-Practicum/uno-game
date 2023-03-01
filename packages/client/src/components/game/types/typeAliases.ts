import { CardStatus } from "./enums";

export type TShuffleArrayCards = {
  id: number;
  owner: string;
  type: string;
  color?: string;
  value: number;
  status: CardStatus;
}[];
