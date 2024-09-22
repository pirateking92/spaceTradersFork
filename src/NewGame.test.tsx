import { it, expect, vi, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import NewGame from "./components/NewGame";

// original single test that was already here
it("renders", async () => {
  // Arrange
  render(<NewGame />);

  // Act
  await screen.findByRole("heading");

  // Assert
  expect(screen.getByRole("heading")).toHaveTextContent("New Game");
});

// test for successful api response. can also get that the token has been added and saved.
// mocks the fetch function
global.fetch = vi.fn();

describe('NewGame component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
})
it("successful API response and stores the API token when a new user has been added", async () => {
  render(<NewGame />);

  await screen.
});
