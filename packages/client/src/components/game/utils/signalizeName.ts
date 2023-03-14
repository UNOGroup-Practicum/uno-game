import { TGamersPositions } from "../types/typeAliases";

import createGamerName from "./createGamerName";

export default function signalizeName(
  ctx: CanvasRenderingContext2D,
  gamersPositions: TGamersPositions,
  name: string
): [NodeJS.Timer, NodeJS.Timer] {
  const element = gamersPositions.find((item) => item.name[2] === name);

  const timer1 = setInterval(() => {
    element && ctx.clearRect(element?.name[0], element?.name[1] - 20, 120, 25);
  }, 500);

  const timer2 = setInterval(() => {
    element && createGamerName(ctx, element?.name[0], element?.name[1], element.name[2]);
  }, 1000);

  return [timer1, timer2];
}
