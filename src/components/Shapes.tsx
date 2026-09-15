import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

/**
 * Soft pink backdrop shapes, like the exec-team graphics: a disc, a
 * two-tone donut, and a cloud. Each drifts and turns as its section
 * scrolls through the viewport. Purely decorative.
 */

type Kind = "circle" | "donut" | "cloud";

type Shape = {
  kind: Kind;
  /** Position + size classes, e.g. "-left-24 top-10 h-72 w-72" */
  className: string;
  /** Vertical drift in px over the section's scroll (negative = up). */
  drift?: number;
  /** Degrees turned over the section's scroll. */
  spin?: number;
};

const Circle = () => (
  <div className="h-full w-full rounded-full bg-rose-100/80" />
);

// Ring with a darker arc so the turn is visible
const Donut = () => (
  <svg viewBox="0 0 100 100" className="h-full w-full">
    <circle cx="50" cy="50" r="36" fill="none" strokeWidth="18" className="stroke-rose-100/80" />
    <path
      d="M 14 50 A 36 36 0 0 1 86 50"
      fill="none"
      strokeWidth="18"
      className="stroke-rose-200/80"
    />
  </svg>
);

const Cloud = () => (
  <div className="relative h-full w-full">
    <div className="absolute bottom-0 left-0 h-[58%] w-[40%] rounded-full bg-rose-100/80" />
    <div className="absolute bottom-0 left-[24%] h-[100%] w-[48%] rounded-full bg-rose-100/80" />
    <div className="absolute bottom-0 right-0 h-[70%] w-[42%] rounded-full bg-rose-100/80" />
    <div className="absolute bottom-0 left-[10%] right-[10%] h-[30%] rounded-full bg-rose-100/80" />
  </div>
);

const parts: Record<Kind, () => JSX.Element> = {
  circle: Circle,
  donut: Donut,
  cloud: Cloud,
};

const Item = ({
  shape,
  progress,
  reduce,
}: {
  shape: Shape;
  progress: MotionValue<number>;
  reduce: boolean;
}) => {
  const y = useTransform(progress, [0, 1], [0, shape.drift ?? -80]);
  const rotate = useTransform(progress, [0, 1], [0, shape.spin ?? 0]);
  const Part = parts[shape.kind];
  return (
    <motion.div
      style={reduce ? undefined : { y, rotate }}
      className={`absolute ${shape.className}`}
    >
      <Part />
    </motion.div>
  );
};

export const Shapes = ({
  target,
  shapes,
}: {
  /** Section the scroll progress is measured against. */
  target: RefObject<HTMLElement>;
  shapes: Shape[];
}) => {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {shapes.map((s, i) => (
        <Item key={i} shape={s} progress={scrollYProgress} reduce={reduce} />
      ))}
    </div>
  );
};
