export default function clearIntervals(
  refTimers: React.MutableRefObject<{ timer1: number; timer2: number } | undefined>
) {
  if (refTimers.current) {
    clearInterval(refTimers.current.timer1);
    clearInterval(refTimers.current.timer2);
  }
}
