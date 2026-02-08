# Pneuma Landing Page Title Animation

Instructions for applying the glitch animation to the Pneuma landing page title.

---

## Overview

The title uses a **per-letter glitch animation** with:

- Golden ratio staggered delays (Weyl sequence)
- RGB color cycling (Magenta/Cyan → Yellow/Blue → Red/Green)
- Clip-path slice effects
- Hover glitch with unique colors per letter
- Replay on "hover-all" interaction

---

## Files Required

| File                                        | Purpose                                     |
| ------------------------------------------- | ------------------------------------------- |
| `src/components/pages/Landing/Landing.jsx`  | React component with letter splitting logic |
| `src/components/pages/Landing/Landing.scss` | All keyframes and styles                    |
| `src/styles/_mixins.scss`                   | `@mixin numeneon-title` for base typography |

---

## Step 1: Add the Mixin (in `_mixins.scss`)

```scss
@mixin numeneon-title {
  font-family: var(--font-display);
  font-weight: 500;
  color: #fffdfd;
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(
    180deg,
    #ffffff 22%,
    rgba(79, 88, 88, 0.699) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Step 2: JSX Component Structure

```jsx
// Golden ratio constant
const PHI = (1 + Math.sqrt(5)) / 2; // ≈ 1.618

// Calculate delays using Weyl sequence
const letterDelays = useMemo(() => {
  const letters = "YOUR_TITLE".split("");
  const BASE_DELAY = 1.8; // Wait for page load animations
  return letters.map((_, i) => {
    const weyl = ((i + 1) * PHI) % 1;
    return BASE_DELAY + weyl * 0.6; // 0.6s max spread
  });
}, []);

// Color variants for each letter
const colorVariants = [
  "magenta",
  "cyan",
  "aqua",
  "purple",
  "blue",
  "orange",
  "pink",
  "green",
];

// Render
<h1 className="landing-title">
  {"YOUR_TITLE".split("").map((letter, index) => {
    const isFlipped = index === 0 || index === letters.length - 1; // First & last letters flip
    return (
      <span
        key={index}
        className={`title-letter ${isFlipped ? "title-letter--flip" : ""} title-letter--${colorVariants[index % colorVariants.length]}`}
        style={{ animationDelay: `${letterDelays[index]}s` }}
        data-letter={letter}
      >
        {letter}
      </span>
    );
  })}
</h1>;
```

---

## Step 3: Required SCSS Styles

### Container

```scss
.landing-title {
  @include numeneon-title;
  font-size: clamp(2.5rem, 8vw, 5rem);
  display: flex;
  justify-content: center;
}
```

### Base Letter Styles

```scss
.title-letter {
  display: inline-block;
  opacity: 0;
  animation: letterFadeInGlitch 7s linear forwards;
  position: relative;

  // Gradient text
  background: linear-gradient(
    180deg,
    var(--text-primary) 22%,
    rgba(79, 88, 88, 0.699) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  // Scanline overlay
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.3) 2px,
      rgba(0, 0, 0, 0.3) 4px
    );
    opacity: 0;
    pointer-events: none;
    z-index: 10;
  }

  // Flipped variant (first/last letters)
  &--flip {
    animation: letterFadeInFlipGlitch 4s linear forwards;
  }
}
```

### Hover Effects (per-letter color variants)

```scss
.title-letter {
  &:hover {
    filter: brightness(1.2);
    transform: translateX(2px);
    transition:
      filter 0.05s,
      text-shadow 0.05s,
      transform 0.05s;

    &::before {
      opacity: 0.6;
      animation: scanlineSweep 0.3s ease-in-out;
    }
  }

  // Color variants on hover
  &--magenta:hover {
    text-shadow:
      3px 0 #ff00ff,
      -3px 0 #00ffff;
  }
  &--cyan:hover {
    text-shadow:
      3px 0 #1a73e7,
      -3px 0 #1ae784;
  }
  &--aqua:hover {
    text-shadow:
      3px 0 #1ae784,
      -3px 0 #dc08bc;
  }
  &--purple:hover {
    text-shadow:
      3px 0 #a783ff,
      -3px 0 #00ffff;
  }
  &--blue:hover {
    text-shadow:
      3px 0 #0066ff,
      -3px 0 #ffee00;
  }
  &--orange:hover {
    text-shadow:
      3px 0 #ff8c00,
      -3px 0 #a783ff;
  }
  &--pink:hover {
    text-shadow:
      3px 0 #ff69b4,
      -3px 0 #00ffff;
  }
  &--green:hover {
    text-shadow:
      3px 0 #33ff33,
      -3px 0 #ff00ff;
  }
}
```

---

## Step 4: Keyframe Animations

### Main Glitch Animation

```scss
@keyframes letterFadeInGlitch {
  0%,
  5% {
    opacity: 0;
  }

  // GLITCH BURST - RGB Cycle: Magenta/Cyan
  5.5% {
    opacity: 1;
    transform: translateX(3px);
    filter: blur(4px) brightness(1.5);
    text-shadow:
      2px 0 #ff00ff,
      -2px 0 #00ffff;
    clip-path: ellipse(80% 40% at 50% 50%);
  }

  // RGB Cycle: Yellow/Blue
  5.8% {
    transform: translateX(-3px);
    filter: blur(2px) invert(1);
    text-shadow:
      4px 0 #ffee00,
      -4px 0 #0066ff;
    clip-path: polygon(/* fragmented slices */);
  }

  // RGB Cycle: Red/Green
  6% {
    transform: translateX(100px) skewX(-700deg);
    filter: blur(10px);
    text-shadow:
      -3px 0 #ff3333,
      3px 0 #33ff33;
  }

  // Back to Magenta/Cyan
  6.3% {
    opacity: 0.6;
    transform: translateX(-50px);
    filter: blur(3px) invert(0.5);
  }

  // Final flash: Yellow/Blue
  6.5% {
    opacity: 0.4;
    transform: translateX(100px);
    filter: blur(0.5px);
  }

  // GLITCH END - clean
  7% {
    opacity: 1;
    transform: translateX(0);
    filter: none;
    text-shadow: none;
    clip-path: none;
  }

  40%,
  100% {
    opacity: 1;
  }
}
```

### Flipped Letter Animation (for first/last)

```scss
@keyframes letterFadeInFlipGlitch {
  0% {
    opacity: 0;
    transform: scaleX(-1); // Start mirrored
  }
  15% {
    opacity: 1;
    transform: scaleX(-1);
  }
  // Glitch while mirrored...
  15.5% - 17% {
    /* RGB cycling with scaleX(-1) */
  }

  // Flip to normal
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}
```

### Scanline Sweep (hover effect)

```scss
@keyframes scanlineSweep {
  0% {
    opacity: 0;
    background-position: 0 -100%;
  }
  20% {
    opacity: 0.8;
    background-position: 0 0%;
  }
  80% {
    opacity: 0.6;
    background-position: 0 100%;
  }
  100% {
    opacity: 0;
    background-position: 0 200%;
  }
}
```

---

## Timing Reference

| Variable           | Value  | Effect                         |
| ------------------ | ------ | ------------------------------ |
| `BASE_DELAY`       | 1.8s   | Wait for page to fade in       |
| `weyl * 0.6`       | 0-0.6s | Stagger spread between letters |
| Animation duration | 7s     | Total time (glitch is 0-7%)    |
| Glitch window      | 5%-7%  | ~140ms of glitch per letter    |
| Fade point         | 40%    | Letters fully visible by 40%   |

---

## Optional: Replay on Hover-All

Track which letters have been hovered. When all are hovered, trigger replay:

```jsx
const hoveredRef = useRef(new Set());
const [replayGlitch, setReplayGlitch] = useState(false);

const handleLetterHover = (index) => {
  hoveredRef.current.add(index);
  if (hoveredRef.current.size === TOTAL_LETTERS) {
    hoveredRef.current.clear();
    setReplayGlitch("reset");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReplayGlitch("replay");
        setTimeout(() => setReplayGlitch(false), 4000);
      });
    });
  }
};
```

```scss
.landing-title--reset .title-letter {
  animation: none !important;
  opacity: 0 !important;
}

.landing-title--replay .title-letter {
  animation: letterFadeInGlitch 3.5s linear forwards !important;
  animation-delay: 0s !important;
}
```

---

## Full Source Reference

- **JSX**: [Landing.jsx](frontend/src/components/pages/Landing/Landing.jsx)
- **SCSS**: [Landing.scss](frontend/src/components/pages/Landing/Landing.scss)
- **Mixin**: [\_mixins.scss](frontend/src/styles/_mixins.scss#L53)
