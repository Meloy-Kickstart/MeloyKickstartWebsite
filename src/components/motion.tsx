import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + slide up when the element scrolls into view. */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "li" | "article" | "aside" | "form";
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
};

const lineWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const line: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Heading whose lines rise out of a clipped box, one after another.
 * `inView` = animate on scroll; otherwise animate on mount (hero).
 */
export const SplitLines = ({
  lines,
  className,
  as = "h2",
  inView = true,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  inView?: boolean;
}) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };
  return (
    <Tag
      className={className}
      variants={lineWrap}
      initial={reduce ? "show" : "hidden"}
      {...trigger}
    >
      {lines.map((l) => (
        <span key={l} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span variants={line} className="block">
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
