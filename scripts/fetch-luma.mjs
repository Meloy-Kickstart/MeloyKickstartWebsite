#!/usr/bin/env node
// Pulls Meloy Kickstart's public Luma events into src/data/luma-events.json.
// Runs before every build (see "prebuild" in package.json). The browser cannot
// call api.lu.ma directly (no CORS), so we snapshot at build time instead.
// If the request fails, the previously committed JSON is kept.
import { writeFile } from "fs/promises";
import path from "path";

const CALENDAR_ID = "cal-cOtk1129QuxFlLi";
const OUT = path.join(process.cwd(), "src", "data", "luma-events.json");

async function fetchPeriod(period) {
  const url = new URL("https://api.lu.ma/calendar/get-items");
  url.searchParams.set("calendar_api_id", CALENDAR_ID);
  url.searchParams.set("period", period);
  url.searchParams.set("pagination_limit", "50");
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`${period}: HTTP ${res.status}`);
  const { entries } = await res.json();
  return entries.map(({ event }) => ({
    id: event.api_id,
    name: event.name,
    url: `https://luma.com/${event.url}`,
    startAt: event.start_at,
    timezone: event.timezone,
    // Luma's stock "gallery-images" covers are the same photo on every event; drop them
    cover:
      event.cover_url && !event.cover_url.includes("/gallery-images/")
        ? event.cover_url
        : null,
    location: event.geo_address_info?.address || null,
  }));
}

try {
  const [upcoming, past] = await Promise.all([
    fetchPeriod("future"),
    fetchPeriod("past"),
  ]);
  upcoming.sort((a, b) => a.startAt.localeCompare(b.startAt));
  past.sort((a, b) => b.startAt.localeCompare(a.startAt));
  const data = { fetchedAt: new Date().toISOString(), upcoming, past };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`[luma] ${upcoming.length} upcoming, ${past.length} past → ${path.relative(process.cwd(), OUT)}`);
} catch (err) {
  console.warn(`[luma] fetch failed, keeping existing JSON: ${err.message}`);
}
