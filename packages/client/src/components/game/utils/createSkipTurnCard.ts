import { Color } from "../types/enums";

export default function createSkipTurnCard(
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
  ctx.ellipse(x + 40, y + 60, 26, 41, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 40, y + 60, 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = Color.white;
  ctx.beginPath();
  ctx.arc(x + 40, y + 60, 14, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(x + 29, y + 71);
  ctx.lineTo(x + 51, y + 49);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 20, y + 20, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 20, y + 20, 8, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.moveTo(x + 13, y + 27);
  ctx.lineTo(x + 28, y + 12);
  ctx.strokeStyle = Color.white;
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = Color.white;
  ctx.arc(x + 60, y + 100, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 60, y + 100, 8, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.moveTo(x + 53, y + 107);
  ctx.lineTo(x + 68, y + 92);
  ctx.strokeStyle = Color.white;
  ctx.stroke();
}
