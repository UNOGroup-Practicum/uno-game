import { Color, Font } from "../types/enums";

export default function createUNOButton(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x, y, 42, 42, [21]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.red;
  ctx.roundRect(x + 2, y + 2, 38, 38, [19]);
  ctx.fill();
  ctx.font = Font.bold14Arial;
  ctx.fillStyle = Color.white;
  ctx.fillText("UNO", x + 6, y + 26);
  ctx.fillStyle = Color.white;
}
