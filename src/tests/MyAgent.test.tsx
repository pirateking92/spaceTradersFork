import { it, expect, describe, vi, beforeEach } from "vitest";
import MyAgent from "../components/MyAgent";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

// Mock the useLocation hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...(actual || {}), // has error but still works
    useLocation: vi.fn(),
  };
});

const startToken = import.meta.env.VITE_TOKEN;

describe("MyAgent component", () => {
  beforeEach(() => {
    // Mock useLocation for all tests
    vi.mocked(reactRouterDom.useLocation).mockReturnValue({
      state: { token: startToken },
      pathname: "",
      search: "",
      hash: "",
      key: "",
    });
    // render only needs to be called once
    render(
      <Router>
        <MyAgent />
      </Router>
    );
  });

  const checkInputValue = async (
    label: string,
    expectedValue: string | number
  ) => {
    const input = await screen.findByLabelText(label);
    expect(input).toHaveValue(expectedValue);
  };
  // refactored tests to be more concise
  it("renders MyAgent", async () => {
    const heading = await screen.findByRole("heading");
    expect(heading).toHaveTextContent("My Agent");
  });

  it("displays account ID", () =>
    checkInputValue("Account ID:", "cm1evsit7by5vs60c0kevm62s"));

  it("displays symbol", () => checkInputValue("Symbol:", "JAGEXTASK"));

  it("displays headquarters", () =>
    checkInputValue("Headquarters:", "X1-N57-A1"));

  it("displays credits", () => checkInputValue("Credits:", 175000));

  it("displays starting faction", async () => {
    const select = await screen.findByLabelText("Starting Faction:");
    expect(select).toHaveDisplayValue("COSMIC");
  });

  it("displays ship count", () => checkInputValue("Ship Count:", 2));
});
