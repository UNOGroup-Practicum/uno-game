import { Color, Font } from "../types/enums";

export default function createGamerName(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  name: string
) {
  ctx.beginPath();
  ctx.fillStyle = Color.white;
  ctx.font = Font.normal18Arial;
  ctx.fillText(`${name.trim().slice(0, 1).toUpperCase()}${name.trim().slice(1, 9)}`, x, y);
  ctx.fill();
}
