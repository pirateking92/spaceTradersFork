import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import ViewLocation from "../components/ViewLocation";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";

// Mock the useLocation hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...(actual as object), // was giving type error due to having been undefined
    useLocation: vi.fn(),
  };
});

const startToken = import.meta.env.VITE_TOKEN; // imports fine
const mockStartLocation = "X1-DF55-20250Z"; // needs to be caps
// not coming through
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
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "startLocation") return mockStartLocation;
      if (key === "token") return startToken;
      return null;
    });

    // Mock the useLocation hook
    vi.mocked(reactRouterDom.useLocation).mockReturnValue({
      state: { token: startToken },
      pathname: "",
      search: "",
      hash: "",
      key: "",
    });

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockWaypointData),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Location page and shows coordinates", async () => {
    render(
      <Router>
        <ViewLocation />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/View Location/)).toBeInTheDocument();
      expect(screen.getByText(/\(123, 456\)/)).toBeInTheDocument();
    });
  });
});
