#!/usr/bin/env node
// Snapshots the newest Instagram posts from the Behold JSON feed into
// src/data/instagram-posts.json. Runs before every build (see "prebuild").
// The browser re-fetches the live feed on load; this file is the fallback
// for first paint and for when Behold is unreachable.
// If VITE_INSTAGRAM_FEED_URL is unset or the request fails, the committed
// JSON is kept.
import { writeFile } from "fs/promises";
import path from "path";

// The public Behold feed connected to @meloykickstart. An environment value
// can override it if the club ever replaces its Behold feed.
const DEFAULT_FEED_URL = "https://feeds.behold.so/8lbzhK7erLeUCWeO27d8";
const FEED_URL = process.env.VITE_INSTAGRAM_FEED_URL || DEFAULT_FEED_URL;
const OUT = path.join(process.cwd(), "src", "data", "instagram-posts.json");

try {
  const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const feed = await res.json();
  if (!Array.isArray(feed.posts)) throw new Error("no posts array in feed");
  // Keep only what the site reads, so the diff stays small
  const posts = feed.posts.map((p) => ({
    id: p.id,
    permalink: p.permalink,
    mediaType: p.mediaType,
    mediaUrl: p.mediaUrl,
    thumbnailUrl: p.thumbnailUrl,
    sizes: p.sizes && { medium: p.sizes.medium, large: p.sizes.large },
    prunedCaption: p.prunedCaption,
    caption: p.caption,
    altText: p.altText,
    timestamp: p.timestamp,
  }));
  await writeFile(OUT, JSON.stringify({ posts }, null, 2) + "\n");
  console.log(`[instagram] ${posts.length} posts → ${path.relative(process.cwd(), OUT)}`);
} catch (err) {
  console.warn(`[instagram] fetch failed, keeping existing JSON: ${err.message}`);
}
