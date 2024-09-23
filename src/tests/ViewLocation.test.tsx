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
        <ViewLocation />
      </Router>
    );
    await screen.findByRole("heading");
    expect(screen.getByRole("heading")).toHaveTextContent("Location");
  });
});
