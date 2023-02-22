import Game from "./Game";
import { render, screen } from "@testing-library/react";

const appContent = "Game";

test("Example test", async () => {
  render(<Game />);
  expect(screen.getByText(appContent)).toBeDefined();
});
