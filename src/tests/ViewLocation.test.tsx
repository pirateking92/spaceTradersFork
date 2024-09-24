import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
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

const startToken = import.meta.env.VITE_TOKEN;
const mockStartLocation = "X1-DF55-20250Z";
const mockWaypointData = {
  data: {
    systemSymbol: "X1-DF55",
    symbol: "X1-DF55-20250Z",
    type: "PLANET",
    x: 123,
    y: 456,
    orbitals: [],
    traits: [],
    faction: {
      symbol: "COSMIC",
    },
    chart: {
      submittedBy: "Explorer",
      submittedOn: "2024-09-24T12:34:56Z",
    },
    isUnderConstruction: false,
  },
};

describe("ViewLocation component", () => {
  beforeEach(() => {
    // Mock localStorage to return the start location and token
    vi.spyOn(window.localStorage, "getItem").mockImplementation((key) => {
      if (key === "startLocation") return mockStartLocation;
      if (key === "token") return startToken;
      return null;
    });

    // Mock the useLocation hook
    vi.spyOn(reactRouterDom, "useLocation").mockReturnValue({
      state: { token: startToken },
      pathname: "",
      search: "",
      hash: "",
      key: "",
    });

    // Mock the fetch API to return mock waypoint data
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockWaypointData),
      })
    );

    render(
      <Router>
        <ViewLocation />
      </Router>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders Location page", async () => {
    await screen.findByRole("heading", { name: /view location/i });
    expect(
      screen.getByRole("heading", { name: /view location/i })
    ).toHaveTextContent("View Location");
  });

  it("shows the x and y coordinates of the starting location", async () => {
    // Wait for the coordinates to appear on the screen
    await screen.findByText(/\(123, 456\)/); // coordinates are rendered in the form "(x, y)"
    expect(screen.getByText(/\(123, 456\)/)).toBeInTheDocument();
  });
});
