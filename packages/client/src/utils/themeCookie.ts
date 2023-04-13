export function getThemeCookie() {
  const themeArray = document.cookie
    .split("; ")
    .find((item) => item.includes("themeUID"))
    ?.split("=");
  const themeUID = themeArray && themeArray[0];
  const theme = themeArray && themeArray[1];

  return { themeUID, theme };
}
