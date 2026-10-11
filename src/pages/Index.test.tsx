import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Index from "./Index";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.dataset.theme = "dark";
});

describe("portfolio page", () => {
  it("makes the software and AI identity immediate and puts three projects first", () => {
    render(<Index />);

    expect(screen.getByRole("heading", { level: 1, name: /I build practical AI agents & software products/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Three practical products." })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
    expect(screen.getByRole("tab", { name: /Hermes AI agent/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("AI Crypto Trading Arena")).not.toBeInTheDocument();
  });

  it("shows the authentic North screen and evidence-based dashboard description", () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("tab", { name: /North Finance/i }));

    const screenshot = screen.getByRole("img", { name: /North onboarding screen, step 1 of 5/i });
    expect(screenshot).toHaveAttribute("src", "/images/north-onboarding.png");
    expect(screenshot).toHaveAttribute("loading", "lazy");
    expect(screen.getByText("Balance, income, and reserved funds")).toBeInTheDocument();
    expect(screen.getByText(/The public app opens to sign-in/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open app.*sign-in/i })).toHaveAttribute("href", "https://financial-app-north-alpha.vercel.app/");
    expect(screen.getByRole("link", { name: /view North source on GitHub/i })).toHaveAttribute("href", "https://github.com/nikhilsharmaawork/financial-app-north");
  });

  it("labels Gig Companion as an early build and does not advertise the broken guest path", () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("tab", { name: /Gig Companion Courier tools/i }));

    expect(screen.getByText("Early build")).toBeInTheDocument();
    expect(screen.getByText(/guest-demo path does not open the dashboard yet/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open app.*sign-in/i })).toHaveAttribute("href", "https://gig-companion.vercel.app/");
    expect(screen.getByRole("link", { name: /view Gig Companion source on GitHub/i })).toHaveAttribute("href", "https://github.com/nikhilsharmaawork/GIG-COMPANION-");
    expect(screen.getAllByText(/optional receipt photos/i).length).toBeGreaterThan(0);
  });

  it("supports arrow-key navigation between project tabs", () => {
    render(<Index />);
    const firstTab = screen.getByRole("tab", { name: /Hermes AI agent/i });
    const lastTab = screen.getByRole("tab", { name: /Gig Companion Courier tools/i });

    fireEvent.keyDown(firstTab, { key: "ArrowLeft" });

    expect(lastTab).toHaveAttribute("aria-selected", "true");
    expect(lastTab).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", "project-tab-gig");
  });

  it("keeps upcoming training distinct from past and current experience", () => {
    render(<Index />);

    expect(screen.getByRole("heading", { name: "Grounded in service. Curious about systems." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Learned on the floor." })).toBeInTheDocument();
    expect(screen.getByText("Starting November 2026")).toBeInTheDocument();
    expect(screen.getByText("Upcoming", { selector: ".status-pill" })).toBeInTheDocument();
    expect(screen.getByText(/This experience has not started yet/)).toBeInTheDocument();
  });

  it("exposes the verified contact and social links without a broken CV download", () => {
    render(<Index />);

    expect(screen.getByRole("link", { name: /nikhilsharmaawork@gmail.com/i })).toHaveAttribute("href", "mailto:nikhilsharmaawork@gmail.com");
    expect(screen.getAllByRole("link", { name: /GitHub/i }).some((link) => link.getAttribute("href") === "https://github.com/nikhilsharmaawork")).toBe(true);
    expect(screen.getAllByRole("link", { name: /LinkedIn/i }).some((link) => link.getAttribute("href") === "https://www.linkedin.com/in/nikhilsharmaawork")).toBe(true);
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
