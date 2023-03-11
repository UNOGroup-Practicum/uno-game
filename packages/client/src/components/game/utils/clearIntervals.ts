export default function clearIntervals(
  refTimers: React.MutableRefObject<{ timer1: NodeJS.Timer; timer2: NodeJS.Timer } | undefined>
) {
  if (refTimers.current) {
    clearInterval(refTimers.current.timer1);
    clearInterval(refTimers.current.timer2);
  }
}
