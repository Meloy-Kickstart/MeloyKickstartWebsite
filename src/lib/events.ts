export type LumaEvent = {
  id: string;
  name: string;
  url: string;
  startAt: string;
  timezone: string;
  cover: string | null;
  location: string | null;
};

export const formatEventDate = (iso: string, tz: string) => {
  const d = new Date(iso);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: tz }),
    day: d.toLocaleDateString("en-US", { day: "2-digit", timeZone: tz }),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: tz }),
    year: d.toLocaleDateString("en-US", { year: "numeric", timeZone: tz }),
    time: d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    }),
  };
};

// Strip the club name prefix Luma titles carry ("Meloy Kickstart: X" → "X")
export const eventTitle = (name: string) =>
  name.replace(/^meloy kickstart\s*(meeting\s*#\d+)?\s*[:\-–x]\s*/i, "").trim() ||
  name;
