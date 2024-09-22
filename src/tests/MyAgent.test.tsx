import { it, expect, vi, describe } from "vitest";
import MyAgent from "../components/MyAgent";
import { render, screen } from "@testing-library/react";
// check component renders
describe("MyAgent component", () => {
  it("renders MyAgent", async () => {
    render(<MyAgent />);
    await screen.findByRole("heading");
    expect(screen.getByRole("heading")).toHaveTextContent("My Agent");
  });
});
