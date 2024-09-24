import { it, expect, describe, vi, beforeEach } from "vitest";
import ViewLocation from "../components/ViewLocation";
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
const startToken = "mocked-token"; //import.meta.env.VITE_TOKEN;
console.log("token for mocking:", startToken);
const mockStartLocation = "X1-DF55-20250Z";

describe("ViewLocation component", () => {
  beforeEach(() => {
    vi.spyOn(window.localStorage, "getItem").mockImplementation((key) => {
      if (key === "startLocation") return mockStartLocation;
      return null;
    });
    // Set up the mock implementation for useLocation before each test
    vi.mocked(reactRouterDom.useLocation).mockReturnValue({
      state: { token: startToken },
      pathname: "",
      search: "",
      hash: "",
      key: "",
    });
    render(
      <Router>
        <ViewLocation />
      </Router>
    );
  });

  it("renders Location page", async () => {
    await screen.findByRole("heading");
    expect(screen.getByRole("heading")).toHaveTextContent("View Location");
  });

  it("shows the x and y coordinates of the starting location", async () => {
    await screen.findByAltText("x coordinate");
    expect(screen.getByAltText("x coordinate")).toHaveTextContent("X");
  });
});
