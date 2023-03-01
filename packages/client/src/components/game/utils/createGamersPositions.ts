import gamer from "../../../assets/images/gamer.png";
import { Color, Font } from "../types/enums";
import setCardsAmountForGamer from "./setCardsAmountForGamer";

export default function createGamersPositions(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  gamersList: { id: string; name: string }[]
) {
  function createGamerName(x: number, y: number, name: string) {
    ctx.fillStyle = Color.white;
    ctx.font = Font.normal18Arial;
    ctx.fillText(`${name.trim().slice(0, 1).toUpperCase()}${name.trim().slice(1, 9)}`, x, y);
    ctx.fill();
  }
  function createGamerImage(x: number, y: number) {
    const img = new Image();
    img.src = gamer;
    img.onload = () => {
      ctx.drawImage(img, x, y, 80, 80);
    };
  }
  const gamersPositions: {
    name: [number, number, string];
    image: [number, number];
    cards: [number, number, string];
  }[] = [];
  function pushObject(x: number, y: number, text: string) {
    gamersPositions.push({
      name: [x, y, text],
      image: [x, y + 10],
      cards: [x, y + 95, "0"],
    });
  }
  switch (gamersList.length) {
    case 2:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 40, 30, gamersList[1].name);
      break;
    case 3:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 100, 30, gamersList[1].name);
      pushObject(canvas.width / 2 + 20, 30, gamersList[2].name);
      break;
    case 4:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 160, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 40, 30, gamersList[2].name);
      pushObject(canvas.width / 2 + 80, 30, gamersList[3].name);
      break;
    case 5:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 220, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 100, 30, gamersList[2].name);
      pushObject(canvas.width / 2 + 20, 30, gamersList[3].name);
      pushObject(canvas.width / 2 + 140, 30, gamersList[4].name);
      break;
    case 6:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 280, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 160, 30, gamersList[2].name);
      pushObject(canvas.width / 2 - 40, 30, gamersList[3].name);
      pushObject(canvas.width / 2 + 80, 30, gamersList[4].name);
      pushObject(canvas.width / 2 + 200, 30, gamersList[5].name);
      break;
    case 7:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 340, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 220, 30, gamersList[2].name);
      pushObject(canvas.width / 2 - 100, 30, gamersList[3].name);
      pushObject(canvas.width / 2 + 20, 30, gamersList[4].name);
      pushObject(canvas.width / 2 + 140, 30, gamersList[5].name);
      pushObject(canvas.width / 2 + 260, 30, gamersList[6].name);
      break;
    case 8:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 400, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 280, 30, gamersList[2].name);
      pushObject(canvas.width / 2 - 160, 30, gamersList[3].name);
      pushObject(canvas.width / 2 - 40, 30, gamersList[4].name);
      pushObject(canvas.width / 2 + 80, 30, gamersList[5].name);
      pushObject(canvas.width / 2 + 200, 30, gamersList[6].name);
      pushObject(canvas.width / 2 + 320, 30, gamersList[7].name);
      break;
    case 9:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 460, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 340, 30, gamersList[2].name);
      pushObject(canvas.width / 2 - 220, 30, gamersList[3].name);
      pushObject(canvas.width / 2 - 100, 30, gamersList[4].name);
      pushObject(canvas.width / 2 + 20, 30, gamersList[5].name);
      pushObject(canvas.width / 2 + 140, 30, gamersList[6].name);
      pushObject(canvas.width / 2 + 260, 30, gamersList[7].name);
      pushObject(canvas.width / 2 + 380, 30, gamersList[8].name);
      break;
    case 10:
      pushObject(canvas.width / 2 - 40, canvas.height - 154, gamersList[0].name);
      pushObject(canvas.width / 2 - 520, 30, gamersList[1].name);
      pushObject(canvas.width / 2 - 400, 30, gamersList[2].name);
      pushObject(canvas.width / 2 - 280, 30, gamersList[3].name);
      pushObject(canvas.width / 2 - 160, 30, gamersList[4].name);
      pushObject(canvas.width / 2 - 40, 30, gamersList[5].name);
      pushObject(canvas.width / 2 + 80, 30, gamersList[6].name);
      pushObject(canvas.width / 2 + 200, 30, gamersList[7].name);
      pushObject(canvas.width / 2 + 320, 30, gamersList[8].name);
      pushObject(canvas.width / 2 + 440, 30, gamersList[9].name);
      break;
    default:
      break;
  }
  gamersPositions.forEach((item, index) => {
    if (index === 0) {
      createGamerName(item.name[0], item.name[1], item.name[2]);
    } else {
      createGamerName(item.name[0], item.name[1], item.name[2]);
      createGamerImage(item.image[0], item.image[1]);
      setCardsAmountForGamer(ctx, item.cards[0], item.cards[1], item.cards[2]);
    }
  });
  return gamersPositions;
}
