export const ending = (number: number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const txt = ["сообщение", "сообщения", "сообщений"];

  const result =
    txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];

  return result;
};

console.log(5 % 100);
