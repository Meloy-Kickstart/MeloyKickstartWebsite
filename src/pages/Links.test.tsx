import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Links } from "./Links";

describe("links page", () => {
  it("lists every way to reach the club", () => {
    render(<Links />);
    const expected: Record<string, string> = {
      "Join the Discord": "https://discord.gg/",
      "RSVP to events": "https://luma.com/",
      "Visit our website": "/",
      Instagram: "https://www.instagram.com/meloykickstart/",
      LinkedIn: "https://www.linkedin.com/company/meloykickstart/",
      "Email us": "mailto:meloykickstart@gmail.com",
    };
    for (const [name, href] of Object.entries(expected)) {
      expect(screen.getByRole("link", { name }).getAttribute("href")).toMatch(
        new RegExp(`^${href.replace(/[.?]/g, "\\$&")}`)
      );
    }
  });
});
