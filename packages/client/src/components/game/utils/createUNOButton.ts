import { Color, Font } from "../types/enums";

export default function createUNOButton(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.fillStyle = Color.black;
  ctx.roundRect(x, y, 40, 40, [20]);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = Color.red;
  ctx.roundRect(x + 2, y + 2, 36, 36, [18]);
  ctx.fill();
  ctx.font = Font.bold14Arial;
  ctx.fillStyle = Color.white;
  ctx.fillText("UNO", x + 5, y + 25);
  ctx.fillStyle = Color.white;
}
