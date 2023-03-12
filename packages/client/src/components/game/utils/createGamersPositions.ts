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

  const point = {
    x: canvas.width / 2,
    y: canvas.height - 154,
  };

  if (gamersList.length > 1 && gamersList.length < 11) {
    let steper = gamersList.length * 60 - 80;

    for (let index = 0; index < gamersList.length; index++) {
      if (index === 0) {
        pushObject(point.x - 40, point.y, gamersList[index].name);
      } else if (index === 1) {
        pushObject(point.x - steper, 30, gamersList[index].name);
        steper = -Math.abs(steper) + 120;
      } else {
        pushObject(point.x + steper, 30, gamersList[index].name);
        if (steper < 0) {
          steper = -Math.abs(steper) + 120;
        } else {
          steper += 120;
        }
      }
    }
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
