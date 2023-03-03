import { Color, Font } from "../types/enums";

export default function createTakeTwoCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
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
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x + 25, y + 50, 20, 30, [5]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.white;
  ctx.roundRect(x + 26, y + 51, 18, 28, [5]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.roundRect(x + 28, y + 53, 14, 24, [4]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x + 36, y + 40, 20, 30, [5]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.white;
  ctx.roundRect(x + 37, y + 41, 18, 28, [5]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.roundRect(x + 39, y + 43, 14, 24, [4]);
  ctx.fill();
  ctx.font = Font.bold30Arial;
  ctx.fillStyle = Color.white;
  ctx.fillText("+2", x + 7, y + 30);
  ctx.translate(x + 73, y + 90);
  ctx.rotate((180 * Math.PI) / 180);
  ctx.fillText("+2", 0, 0);
  ctx.resetTransform();
}
