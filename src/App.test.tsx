import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import instagram from "./data/instagram-posts.json";
import { photos } from "./data/photos";
import luma from "./data/luma-events.json";

describe("landing page", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    render(<App />);
  });

  it("renders navigation to every section", () => {
    const nav = screen.getByRole("navigation");
    for (const label of ["Home", "What We Offer", "Join", "Events", "Partner"]) {
      // "Join" appears twice in the nav: the text link and the pill button
      expect(within(nav).getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
    for (const id of ["home", "offerings", "join", "events", "partner"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("shows the hero headline", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/your startup/i);
  });

  it("shows at most four past events with Luma links", () => {
    const expected = Math.min(4, luma.past.length);
    const cards = screen.getAllByRole("link", { name: /pm/i }).filter((a) =>
      a.getAttribute("href")?.startsWith("https://luma.com/")
    );
    expect(cards).toHaveLength(expected);
  });

  it("shows every event photo in the carousel", () => {
    const strip = screen.getByRole("region", { name: /event photos/i });
    // Clones for the loop are aria-hidden, so only the real set is exposed
    expect(within(strip).getAllByRole("img")).toHaveLength(photos.length);
    expect(strip.querySelectorAll("img")).toHaveLength(photos.length * 3);
  });

  it("shows at most three Instagram posts from the snapshot", () => {
    const cards = screen.queryAllByRole("link", { name: /instagram post/i });
    expect(cards).toHaveLength(Math.min(3, instagram.posts.length));
  });

  it("points social links at the real accounts", () => {
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/meloykickstart/"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/meloykickstart/"
    );
    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:meloykickstart@gmail.com"
    );
  });
});

describe("partner form", () => {
  it("enables Send only when company and a valid email are filled", async () => {
    render(<App />);
    const user = userEvent.setup();
    const send = screen.getByRole("button", { name: /send/i });
    expect(send).toBeDisabled();

    await user.type(screen.getByLabelText(/company name/i), "Acme Robotics");
    expect(send).toBeDisabled();

    await user.type(screen.getByLabelText(/contact email/i), "not-an-email");
    expect(send).toBeDisabled();

    await user.clear(screen.getByLabelText(/contact email/i));
    await user.type(screen.getByLabelText(/contact email/i), "jane@acme.com");
    expect(send).toBeEnabled();
  });

  it("explains itself when the sheet URL is not configured", async () => {
    vi.stubEnv("VITE_SHEETS_WEBHOOK_URL", "");
    render(<App />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/company name/i), "Acme Robotics");
    await user.type(screen.getByLabelText(/contact email/i), "jane@acme.com");
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/meloykickstart@gmail.com/);
  });
});
