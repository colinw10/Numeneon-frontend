/**
 * Misc Icons
 * Various utility icons
 */

/** Music note for MySpace easter egg */
export const MusicIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

/** Map pin for location (larger) */
export const MapPinIcon = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

/** Triangle/Arrow up for post icon */
export const PostTriangleIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <polygon points="12,3 21,19 3,19"/>
  </svg>
);

/** Electric guitar for MySpace throwback */
export const GuitarIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Guitar body */}
    <path d="M11.5 14.5c-2.5 2.5-6 2-7.5.5s-2-5 .5-7.5c1.5-1.5 4-2 5.5-1l1.5 1.5"/>
    {/* Guitar neck */}
    <path d="M10 10l7-7"/>
    {/* Tuning pegs */}
    <path d="M17 3l2 2"/>
    <path d="M19 5l2-2"/>
    {/* Sound hole */}
    <circle cx="7" cy="11" r="1.5"/>
    {/* Strings hint */}
    <path d="M9 9l-4 4"/>
  </svg>
);

/** Sparkle star for MySpace aesthetic */
export const SparkleStarIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
    <path d="M5 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" opacity="0.7"/>
    <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" opacity="0.5"/>
  </svg>
);
