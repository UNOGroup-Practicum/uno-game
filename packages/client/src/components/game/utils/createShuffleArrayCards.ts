import { Color, CardType, CardStatus } from "../types/enums";
import { TShuffleArrayCards } from "../types/typeAliases";

export default function createShuffleArrayCards(gamersList: { id: string; name: string }[]) {
  const colors = [
    Color.red,
    Color.green,
    Color.yellow,
    Color.blue,
    Color.red,
    Color.green,
    Color.yellow,
    Color.blue,
  ];

  const shuffleArrayCards: TShuffleArrayCards = [];

  for (let index = 0; index < 109; index++) {
    if (index < 4) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.zero,
        color: colors[index],
        value: 0,
        status: CardStatus.inDeck,
      });
    } else if (index < 12) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.one,
        color: colors[index - 4],
        value: 1,
        status: CardStatus.inDeck,
      });
    } else if (index < 20) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.two,
        color: colors[index - 12],
        value: 2,
        status: CardStatus.inDeck,
      });
    } else if (index < 28) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.three,
        color: colors[index - 20],
        value: 3,
        status: CardStatus.inDeck,
      });
    } else if (index < 36) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.four,
        color: colors[index - 28],
        value: 4,
        status: CardStatus.inDeck,
      });
    } else if (index < 44) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.five,
        color: colors[index - 36],
        value: 5,
        status: CardStatus.inDeck,
      });
    } else if (index < 52) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.six,
        color: colors[index - 44],
        value: 6,
        status: CardStatus.inDeck,
      });
    } else if (index < 60) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.seven,
        color: colors[index - 52],
        value: 7,
        status: CardStatus.inDeck,
      });
    } else if (index < 68) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.eight,
        color: colors[index - 60],
        value: 8,
        status: CardStatus.inDeck,
      });
    } else if (index < 76) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.nine,
        color: colors[index - 68],
        value: 9,
        status: CardStatus.inDeck,
      });
    } else if (index < 84) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.skipTurn,
        color: colors[index - 76],
        value: 20,
        status: CardStatus.inDeck,
      });
    } else if (index < 92) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.reverseStroke,
        color: colors[index - 84],
        value: 20,
        status: CardStatus.inDeck,
      });
    } else if (index < 100) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.takeTwo,
        color: colors[index - 92],
        value: 20,
        status: CardStatus.inDeck,
      });
    } else if (index < 104) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.orderColor,
        value: 50,
        status: CardStatus.inDeck,
      });
    } else if (index < 108) {
      shuffleArrayCards.push({
        id: index,
        owner: "",
        type: CardType.takeFour,
        value: 50,
        status: CardStatus.inDeck,
      });
    }
  }

  function shuffle(array: TShuffleArrayCards) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(shuffleArrayCards);

  let idx = 0;

  for (let index = 0; index < gamersList.length * 7; index++) {
    if (idx >= gamersList.length) {
      idx = 0;
    }

    shuffleArrayCards[index].owner = gamersList[idx].name;
    shuffleArrayCards[index].status = CardStatus.inHands;
    idx++;
  }

  return shuffleArrayCards;
}
