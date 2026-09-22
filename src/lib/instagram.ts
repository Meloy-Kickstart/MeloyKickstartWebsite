export const INSTAGRAM_HANDLE = "meloykickstart";
export const POST_COUNT = 3;

/**
 * Public Behold feed connected to @meloykickstart. Behold manages the
 * Instagram credential and provides CORS-enabled, durable image URLs.
 *
 * An environment value can replace this if the club moves to a new feed.
 */
export const DEFAULT_FEED_URL = "https://feeds.behold.so/8lbzhK7erLeUCWeO27d8";
export const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL || DEFAULT_FEED_URL;

export type InstaPost = {
  id: string;
  permalink: string;
  /** Square-ish image to show; the video poster for reels. */
  image: string;
  alt: string;
  caption: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

// The subset of Behold's feed we read. Fields are optional because the
// shape differs by media type (thumbnailUrl is video-only, etc).
type BeholdPost = {
  id?: string;
  permalink?: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: { medium?: { mediaUrl?: string }; large?: { mediaUrl?: string } };
  caption?: string;
  prunedCaption?: string;
  altText?: string;
  timestamp?: string;
};

const isMediaType = (t: unknown): t is InstaPost["mediaType"] =>
  t === "IMAGE" || t === "VIDEO" || t === "CAROUSEL_ALBUM";

/**
 * Newest `limit` posts from a Behold feed, in a shape the cards can render.
 * Posts with no link or no image are dropped.
 */
export const parseFeed = (feed: unknown, limit = POST_COUNT): InstaPost[] => {
  const posts = (feed as { posts?: BeholdPost[] } | null)?.posts;
  if (!Array.isArray(posts)) return [];
  return posts
    .flatMap((p): InstaPost[] => {
      // Prefer Behold-hosted sizes: Instagram CDN links expire
      const image =
        p.sizes?.medium?.mediaUrl ??
        p.sizes?.large?.mediaUrl ??
        p.thumbnailUrl ??
        (p.mediaType === "VIDEO" ? undefined : p.mediaUrl);
      if (!p.id || !p.permalink || !image) return [];
      return [
        {
          id: p.id,
          permalink: p.permalink,
          image,
          alt: p.altText || "Instagram post",
          caption: (p.prunedCaption ?? p.caption ?? "").trim(),
          timestamp: p.timestamp ?? "",
          mediaType: isMediaType(p.mediaType) ? p.mediaType : "IMAGE",
        },
      ];
    })
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, limit);
};

export const formatPostDate = (iso: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";
