import { it, expect, describe, vi, beforeEach } from "vitest";
import MyAgent from "../components/MyAgent";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

// Mock the useLocation hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});
const startToken = import.meta.env.VITE_TOKEN;
console.log("token for mocking:", startToken);
describe("MyAgent component", () => {
  beforeEach(() => {
    // Set up the mock implementation for useLocation before each test
    vi.mocked(reactRouterDom.useLocation).mockReturnValue({
      state: { token: startToken },
      pathname: "",
      search: "",
      hash: "",
      key: "",
    });
  });

  it("renders MyAgent", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByRole("heading");
    expect(screen.getByRole("heading")).toHaveTextContent("My Agent");
  });

  it("displays account ID", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByLabelText("Account ID:");
    expect(screen.getByLabelText("Account ID:")).toHaveValue(
      "cm1evsit7by5vs60c0kevm62s"
    ); // Adjust expected value as needed
  });

  it("displays symbol", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByLabelText("Symbol:");
    expect(screen.getByLabelText("Symbol:")).toHaveValue("JAGEXTASK");
  });

  it("displays headquarters", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByLabelText("Headquarters:");
    expect(screen.getByLabelText("Headquarters:")).toHaveValue("X1-N57-A1");
  });

  it("displays credits", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByLabelText("Credits:");
    expect(screen.getByLabelText("Credits:")).toHaveValue(175000);
  });

  it("displays starting faction", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByLabelText("Starting Faction:");
    expect(screen.getByLabelText("Starting Faction:")).toHaveDisplayValue(
      "COSMIC"
    ); // Adjust based on the value you expect
  });

  it("displays ship count", async () => {
    render(
      <Router>
        <MyAgent />
      </Router>
    );
    await screen.findByLabelText("Ship Count:");
    expect(screen.getByLabelText("Ship Count:")).toHaveValue(2);
  });
});
