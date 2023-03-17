import { CardStatus, Color } from "../types/enums";
import { TGamersList, TShuffleArrayCards } from "../types/typeAliases";

export default function defineCardColorByRobot(
  shuffleArrayCards: TShuffleArrayCards,
  gamersList: TGamersList,
  refCardColor: React.MutableRefObject<Color | null>,
  setCardColor: React.Dispatch<React.SetStateAction<Color | null>>
) {
  const arrCardsWithColors = shuffleArrayCards.filter(
    (item) => item.owner === gamersList[1].name && item.status === CardStatus.inHands && item.color
  );

  const arrColors = [Color.yellow, Color.red, Color.blue, Color.green];

  const randomColor = arrColors[Math.floor(Math.random() * arrColors.length)];

  if (arrCardsWithColors[0] && arrCardsWithColors[0].color) {
    refCardColor.current = arrCardsWithColors[0].color;

    setCardColor(refCardColor.current);
  } else {
    refCardColor.current = randomColor;

    setCardColor(refCardColor.current);
  }
}
