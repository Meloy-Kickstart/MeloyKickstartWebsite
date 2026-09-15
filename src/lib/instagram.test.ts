import { describe, expect, it } from "vitest";
import { parseFeed } from "./instagram";

const post = (id: string, timestamp: string, extra: Record<string, unknown> = {}) => ({
  id,
  permalink: `https://www.instagram.com/p/${id}/`,
  mediaType: "IMAGE",
  mediaUrl: `https://cdn.example/${id}.jpg`,
  sizes: { medium: { mediaUrl: `https://behold.example/${id}-m.jpg` } },
  caption: `Post ${id} #tag`,
  prunedCaption: `Post ${id}`,
  timestamp,
  ...extra,
});

describe("parseFeed", () => {
  it("keeps the three newest posts, newest first", () => {
    const feed = {
      posts: [
        post("a", "2026-09-01T00:00:00Z"),
        post("b", "2026-09-10T00:00:00Z"),
        post("c", "2026-08-01T00:00:00Z"),
        post("d", "2026-09-05T00:00:00Z"),
      ],
    };
    expect(parseFeed(feed).map((p) => p.id)).toEqual(["b", "d", "a"]);
  });

  it("prefers Behold-hosted sizes and the video poster over raw mediaUrl", () => {
    const [img, vid] = parseFeed({
      posts: [
        post("a", "2026-09-02T00:00:00Z"),
        post("v", "2026-09-01T00:00:00Z", {
          mediaType: "VIDEO",
          sizes: undefined,
          mediaUrl: "https://cdn.example/v.mp4",
          thumbnailUrl: "https://cdn.example/v-poster.jpg",
        }),
      ],
    });
    expect(img.image).toBe("https://behold.example/a-m.jpg");
    expect(vid.image).toBe("https://cdn.example/v-poster.jpg");
    expect(vid.mediaType).toBe("VIDEO");
  });

  it("drops posts without a link or image and strips hashtags", () => {
    const out = parseFeed({
      posts: [
        post("a", "2026-09-02T00:00:00Z"),
        { id: "x", permalink: "https://www.instagram.com/p/x/", timestamp: "2026-09-03T00:00:00Z" },
        { ...post("y", "2026-09-04T00:00:00Z"), permalink: undefined },
      ],
    });
    expect(out.map((p) => p.id)).toEqual(["a"]);
    expect(out[0].caption).toBe("Post a");
  });

  it("returns nothing for junk input", () => {
    expect(parseFeed(null)).toEqual([]);
    expect(parseFeed({})).toEqual([]);
    expect(parseFeed({ posts: "nope" })).toEqual([]);
  });
});
