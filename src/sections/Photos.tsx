import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Reveal } from "../components/motion";
import { photos, type Photo } from "../data/photos";

/**
 * Endless filmstrip of event photos. Fixed height, natural widths, so
 * portrait and landscape shots sit side by side.
 *
 * Loop: the set is rendered three times. The view starts on the middle
 * copy. When scrolling drifts into the first or last copy, the position
 * jumps by one set width, which is invisible because the copies match.
 * Auto-advances every few seconds while on screen. Pauses on hover, focus,
 * touch, and for reduced-motion users. Arrows, drag, and trackpad still work.
 */
const AUTO_MS = 4000;
const Slide = ({ p, eager, clone }: { p: Photo; eager: boolean; clone: boolean }) => (
  <figure
    aria-hidden={clone || undefined}
    className="relative h-[260px] shrink-0 snap-start overflow-hidden rounded-2xl bg-rose-100 sm:h-[360px] lg:h-[440px]"
    style={{ aspectRatio: `${p.width} / ${p.height}` }}
  >
    <img
      src={p.src}
      alt={clone ? "" : p.alt}
      width={p.width}
      height={p.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className="h-full w-full object-cover"
    />
    <figcaption className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-maroon">
      {p.caption}
    </figcaption>
  </figure>
);

export const Photos = () => {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  // Keep the scroll position inside the middle copy
  const recenter = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const set = el.scrollWidth / 3;
    if (el.scrollLeft < set * 0.5) el.scrollLeft += set;
    else if (el.scrollLeft > set * 1.5) el.scrollLeft -= set;
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, []);

  const nudge = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  // Only run the timer while the strip is on screen
  useEffect(() => {
    const el = track.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const id = window.setInterval(() => nudge(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, visible, nudge]);

  if (photos.length === 0) return null;

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border-2 border-maroon text-maroon transition hover:bg-rose-100";

  return (
    <section
      id="photos"
      aria-roledescription="carousel"
      aria-label="Event photos"
      className="relative py-10 sm:py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="wrap flex items-end justify-between gap-6">
        <Reveal as="p" className="eyebrow">
          From our events
        </Reveal>
        <Reveal className="flex gap-2">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous photos" className={arrow}>
            <FaArrowLeft />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next photos" className={arrow}>
            <FaArrowRight />
          </button>
        </Reveal>
      </div>

      <div
        ref={track}
        onScroll={recenter}
        className="mt-6 flex snap-x gap-3 overflow-x-auto px-5 pb-4 sm:gap-4 sm:px-6 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <Slide key={`a-${p.src}`} p={p} eager={false} clone />
        ))}
        {photos.map((p, i) => (
          <Slide key={p.src} p={p} eager={i < 3} clone={false} />
        ))}
        {photos.map((p) => (
          <Slide key={`b-${p.src}`} p={p} eager={false} clone />
        ))}
      </div>
    </section>
  );
};
