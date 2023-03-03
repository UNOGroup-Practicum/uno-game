export default function* generateCardsDistribution(start: number, end: number) {
  for (let i = start + 1; i <= end * 7; i++) {
    if (i < end) {
      yield i;
    } else if (i >= end && i < end * 2) {
      yield i - end;
    } else if (i >= end * 2 && i < end * 3) {
      yield i - end * 2;
    } else if (i >= end * 3 && i < end * 4) {
      yield i - end * 3;
    } else if (i >= end * 4 && i < end * 5) {
      yield i - end * 4;
    } else if (i >= end * 5 && i < end * 6) {
      yield i - end * 5;
    } else if (i >= end * 6 && i < end * 7) {
      yield i - end * 6;
    }
  }
}
