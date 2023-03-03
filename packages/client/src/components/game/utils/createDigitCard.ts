import { Color, Font } from "../types/enums";

export default function createDigitCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string
) {
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x, y, 80, 120, [10]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.white;
  ctx.roundRect(x + 1, y + 1, 78, 118, [10]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.roundRect(x + 5, y + 5, 70, 110, [8]);
  ctx.fill();
  ctx.fillStyle = Color.white;
  ctx.beginPath();
  ctx.ellipse(x + 40, y + 60, 24, 42, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = Font.bold50Arial;
  ctx.fillStyle = color;
  ctx.fillText(text, x + 26, y + 78);
  ctx.font = Font.bold30Arial;
  ctx.fillStyle = Color.white;
  ctx.fillText(text, x + 7, y + 30);
  ctx.translate(x + 73, y + 90);
  ctx.rotate((180 * Math.PI) / 180);
  ctx.fillText(text, 0, 0);
  ctx.resetTransform();
}
