import cards from "../../../assets/images/cards.svg";
import { Color, Font } from "../types/enums";

export default function setCardsAmountForGamer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string
) {
  ctx.clearRect(x + 35, y, 80, 30);
  const img = new Image();
  img.src = cards;
  img.onload = () => {
    ctx.drawImage(img, x, y, 30, 30);
  };
  ctx.fillStyle = Color.white;
  ctx.font = Font.normal19Arial;
  ctx.fillText(`${text}`, x + 35, y + 22);
  ctx.fill();
}
