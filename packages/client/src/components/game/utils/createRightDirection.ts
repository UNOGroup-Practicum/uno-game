import { Color } from "../types/enums";

export default function createRightDirection(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = Color.black;
  ctx.beginPath();
  ctx.arc(x + 40, y + 60, 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = Color.darkBlue;
  ctx.beginPath();
  ctx.arc(x + 40, y + 60, 18, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.moveTo(x + 30, y + 77);
  ctx.lineTo(x + 40, y + 72);
  ctx.lineTo(x + 40, y + 84);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.moveTo(x + 50, y + 43);
  ctx.lineTo(x + 40, y + 48);
  ctx.lineTo(x + 40, y + 36);
  ctx.fill();
}
