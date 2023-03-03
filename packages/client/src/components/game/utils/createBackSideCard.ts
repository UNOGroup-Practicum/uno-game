import { Color, Font } from "../types/enums";

export default function createBackSideCard(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x, y, 80, 120, [10]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.white;
  ctx.roundRect(x + 1, y + 1, 78, 118, [10]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x + 5, y + 5, 70, 110, [8]);
  ctx.fill();
  ctx.fillStyle = Color.red;
  ctx.beginPath();
  ctx.ellipse(x + 40, y + 60, 24, 42, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = Font.bold22Arial;
  ctx.fillStyle = Color.white;
  ctx.fillText("UNO", x + 16, y + 69);
}
