import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import instagram from "./data/instagram-posts.json";

describe("landing page", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    render(<App />);
  });

  it("keeps navigation focused on the two page sections", () => {
    const nav = screen.getByRole("navigation");
    for (const label of ["Home", "Upcoming"]) {
      expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
    }
    for (const id of ["home", "events"]) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("puts Discord and Luma joins in the hero", () => {
    const hero = screen.getByRole("complementary", { name: "Ways to get involved" });
    expect(within(hero).getByRole("link", { name: "Join Discord" })).toBeInTheDocument();
    expect(within(hero).getByRole("link", { name: "Join Luma" })).toBeInTheDocument();
  });

  it("shows the organization description in the hero", () => {
    expect(screen.getByText("Get in the loop.")).toBeInTheDocument();
    expect(screen.getByText(/connects engineers with the people, resources/i)).toBeInTheDocument();
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
