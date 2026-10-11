import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Index from "./Index";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.dataset.theme = "dark";
});

describe("portfolio page", () => {
  it("presents the portfolio sections and keeps upcoming training distinct", () => {
    render(<Index />);

    expect(screen.getByRole("heading", { level: 1, name: /building at the intersection/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Grounded in service. Curious about systems." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ideas made tangible." })).toBeInTheDocument();
    expect(screen.getByText("Starting November 2026")).toBeInTheDocument();
    expect(screen.getByText("Upcoming", { selector: ".status-pill" })).toBeInTheDocument();
    expect(screen.getByText(/This experience has not started yet/)).toBeInTheDocument();
  });

  it("exposes only verified project destinations and contact links", () => {
    render(<Index />);

    expect(screen.getByRole("link", { name: /open north/i })).toHaveAttribute("href", "https://financial-app-north-alpha.vercel.app/");
    expect(screen.getByRole("link", { name: /view north source on github/i })).toHaveAttribute("href", "https://github.com/nikhilsharmaawork/financial-app-north");
    expect(screen.getByRole("link", { name: /open project site/i })).toHaveAttribute("href", "https://gig-companion.vercel.app/");
    expect(screen.getByRole("link", { name: /nikhilsharmaawork@gmail.com/i })).toHaveAttribute("href", "mailto:nikhilsharmaawork@gmail.com");
    expect(screen.queryByRole("link", { name: /download cv/i })).not.toBeInTheDocument();
  });

  it("toggles and persists the selected color theme", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "Switch to light theme" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
    expect(window.localStorage.getItem("portfolio-theme")).toBe("light");
  });
});
