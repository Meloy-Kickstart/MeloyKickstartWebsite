import { describe, expect, it } from "vitest";
import { eventTitle, formatEventDate } from "./events";

describe("eventTitle", () => {
  it("strips the club prefix", () => {
    expect(eventTitle("Meloy Kickstart: MVP Workshop")).toBe("MVP Workshop");
    expect(eventTitle("Meloy Kickstart Meeting #1 : Absurd Elevator Pitch Workshop")).toBe(
      "Absurd Elevator Pitch Workshop"
    );
    expect(eventTitle("Meloy Kickstart x Steve Blank: Live Fireside Chat")).toBe(
      "Steve Blank: Live Fireside Chat"
    );
  });

  it("leaves other titles alone", () => {
    expect(eventTitle("Customer Discovery: Stop Guessing")).toBe("Customer Discovery: Stop Guessing");
  });

  it("falls back to the original when the prefix is the whole title", () => {
    expect(eventTitle("Meloy Kickstart: ")).toBe("Meloy Kickstart: ");
  });
});

describe("formatEventDate", () => {
  it("formats in the event's own timezone", () => {
    // 23:00Z on Sep 10 is 6:00 PM in College Station
    const d = formatEventDate("2026-09-10T23:00:00.000Z", "America/Chicago");
    expect(d).toEqual({ day: "10", month: "Sep", year: "2026", time: "6:00 PM" });
  });
});
