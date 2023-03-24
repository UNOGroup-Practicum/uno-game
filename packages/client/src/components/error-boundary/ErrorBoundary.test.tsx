import { InValidComponent, ValidComponent } from "__tests__/fixtures";
import { renderWithRouter } from "__tests__/utils";
import { screen } from "@testing-library/react";

import { ErrorBoundary } from "./ErrorBoundary";

describe("Components/ErrorBoundary", () => {
  it("should render with valid component", async () => {
    renderWithRouter(
      <ErrorBoundary>
        <ValidComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("valid-component")).toBeDefined();
  });

  it("should render default fallback with invalid component", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    renderWithRouter(
      <ErrorBoundary>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <InValidComponent />
      </ErrorBoundary>
    );

    expect(console.error).toBeCalled();
    expect(screen.getByTestId("error-boundary-default")).toBeDefined();

    consoleErrorMock.mockRestore();
  });

  it("should render custom fallback with invalid component", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
    const customFallback = <div data-testid="custom-fallback">Custom fallback</div>;

    renderWithRouter(
      <ErrorBoundary fallback={customFallback}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <InValidComponent />
      </ErrorBoundary>
    );

    expect(console.error).toBeCalled();
    expect(screen.getByTestId("custom-fallback")).toBeDefined();

    consoleErrorMock.mockRestore();
  });

  it("should render custom fallback with invalid component", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
    const Fallback = () => <div data-testid="fallback-component">fallback-component</div>;

    renderWithRouter(
      <ErrorBoundary FallbackComponent={Fallback}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <InValidComponent />
      </ErrorBoundary>
    );

    expect(console.error).toBeCalled();
    expect(screen.getByTestId("fallback-component")).toBeDefined();

    consoleErrorMock.mockRestore();
  });
});
