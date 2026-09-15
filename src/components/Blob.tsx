type BlobProps = {
  className?: string;
};

/**
 * Layered organic wave, echoing the rolling maroon shapes in the brand
 * graphics. Purely decorative; sized by the parent via className.
 */
export const Blob = ({ className = "" }: BlobProps) => (
  <svg
    viewBox="0 0 600 400"
    preserveAspectRatio="none"
    aria-hidden
    className={className}
  >
    <path
      d="M0 400 C 120 320, 200 340, 300 240 S 480 60, 600 40 L 600 400 Z"
      className="fill-rose-300/70"
    />
    <path
      d="M120 400 C 240 360, 330 300, 400 200 S 540 80, 600 110 L 600 400 Z"
      className="fill-maroon-500/80"
    />
    <path
      d="M300 400 C 380 380, 460 300, 520 240 S 590 170, 600 180 L 600 400 Z"
      className="fill-maroon"
    />
  </svg>
);
