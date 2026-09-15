import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPlay, FaClone } from "react-icons/fa";
import { Reveal, SplitLines } from "../components/motion";
import {
  FEED_URL,
  INSTAGRAM_HANDLE,
  formatPostDate,
  parseFeed,
  type InstaPost,
} from "../lib/instagram";
import snapshot from "../data/instagram-posts.json";

// Build-time snapshot for first paint; the live feed replaces it on load
const initial = parseFeed(snapshot);

const PostCard = ({ post, idx }: { post: InstaPost; idx: number }) => (
  <motion.a
    href={post.permalink}
    target="_blank"
    rel="noreferrer"
    aria-label={`Instagram post from ${formatPostDate(post.timestamp) || "Meloy Kickstart"}`}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="card group flex flex-col overflow-hidden !p-0"
  >
    <div className="relative aspect-square overflow-hidden bg-rose-100">
      <img
        src={post.image}
        alt={post.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {post.mediaType !== "IMAGE" && (
        <span
          aria-hidden
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-xs text-maroon"
        >
          {post.mediaType === "VIDEO" ? <FaPlay /> : <FaClone />}
        </span>
      )}
    </div>
    {(post.caption || post.timestamp) && (
      <div className="flex items-start justify-between gap-4 p-4">
        {post.caption && (
          <p className="line-clamp-2 text-sm leading-relaxed text-ink/80">{post.caption}</p>
        )}
        {post.timestamp && (
          <time
            dateTime={post.timestamp}
            className="shrink-0 text-xs font-medium uppercase tracking-wider text-maroon-600"
          >
            {formatPostDate(post.timestamp)}
          </time>
        )}
      </div>
    )}
  </motion.a>
);

export const Instagram = () => {
  const [posts, setPosts] = useState<InstaPost[]>(initial);

  useEffect(() => {
    if (!FEED_URL) return;
    const ctrl = new AbortController();
    fetch(FEED_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((feed) => {
        const fresh = parseFeed(feed);
        if (fresh.length > 0) setPosts(fresh);
      })
      .catch(() => {
        /* keep the snapshot */
      });
    return () => ctrl.abort();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="instagram" className="section bg-rose-50">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal as="p" className="eyebrow">
              On Instagram
            </Reveal>
            <SplitLines
              lines={["Real people.", "Real events."]}
              className="display text-display-lg mt-4"
            />
          </div>
          <Reveal delay={0.2} className="self-start md:self-auto">
            <a
              href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <FaInstagram className="text-lg" />@{INSTAGRAM_HANDLE}
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, idx) => (
            <PostCard key={p.id} post={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
