# Pneuma PostCard Holographic Styles

Complete styling reference for the holographic cyberpunk post cards in Pneuma.

---

## Overview

The post cards use:

- **Chamfered cyberpunk corners** via `clip-path: polygon()`
- **Cosmic black holographic background** with multi-layer gradients
- **3D parallax depth** with `transform-style: preserve-3d`
- **Column-specific accent colors** (blue, magenta, gold)
- **Animated shimmer effect** via `dark-holographic-shimmer` keyframes

---

## Files

| File                                                                                                      | Purpose                   |
| --------------------------------------------------------------------------------------------------------- | ------------------------- |
| [\_post-card.scss](frontend/src/components/pages/Home/components/TimelineRiverRow/styles/_post-card.scss) | Main post card styles     |
| [\_cards.scss](frontend/src/styles/_cards.scss)                                                           | Base card system          |
| [\_variables.scss](frontend/src/styles/_variables.scss#L228)                                              | Holographic CSS variables |
| [\_animations.scss](frontend/src/styles/_animations.scss#L82)                                             | Shimmer keyframes         |

---

## JSX Usage

```jsx
<div
  className={`river-post-card post--${type}`}
  style={{ "--card-index": index }}
>
  {/* Card content */}
</div>
```

---

## Base Card Structure

```scss
.river-post-card {
  padding: var(--space-md);
  color: var(--color-white);
  position: relative;
  overflow: visible;
  cursor: pointer;
  z-index: 1;
  display: flex;
  flex-direction: column;

  /* Cyberpunk chamfered corners */
  clip-path: polygon(
    14px 0,
    /* Top-left corner cut */ 100% 0,
    /* Top-right */ 100% calc(100% - 14px),
    /* Bottom-right corner cut */ calc(100% - 14px) 100%,
    /* Bottom-right */ 0 100%,
    /* Bottom-left */ 0 14px /* Top-left */
  );

  /* Bouncy animation easing */
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* 3D Parallax Depth */
  transform-style: preserve-3d;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;

  /* Staggered entrance animation */
  animation: cardEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  animation-delay: calc(var(--card-index, 0) * 0.08s);
}
```

---

## Chamfered Corners Visual

```
     14px
    ╔═══════════════════╗
    ║                   ║
    ║                   ║
    ║                   ╚═══ 14px
    ║                      ║
    ╚══════════════════════╝
 14px
```

---

## Glowing Border Effect (::before)

```scss
.river-post-card::before {
  content: "";
  position: absolute;
  inset: -1px;

  /* Gradient border - adapts to column accent color */
  background: linear-gradient(
    135deg,
    var(--card-accent, rgba(79, 255, 255, 0.4)) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    var(--card-accent, rgba(79, 255, 255, 0.4)) 100%
  );

  /* Slightly larger chamfer to create border effect */
  clip-path: polygon(
    15px 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    0 100%,
    0 15px
  );

  z-index: -2;
  transition:
    background 0.4s ease 0.05s,
    filter 0.4s ease 0.05s;
  pointer-events: none;
}
```

---

## Cosmic Black Holographic Background (::after)

```scss
.river-post-card::after {
  content: "";
  position: absolute;
  inset: 1px;

  /* Multi-layer holographic background */
  background:
    /* Layer 1: Dark gradient base */
    linear-gradient(145deg, #0a0a0a, #000000),
    /* Layer 2: Subtle white highlight (top-left) */
    radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.1),
        transparent 50%
      ),
    /* Layer 3: Dark shadow (bottom-right) */
    radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.5), transparent 50%),
    /* Layer 4: Color tint (purple → cyan → purple) */
    linear-gradient(
        45deg,
        rgba(138, 43, 226, 0.05),
        /* Violet */ rgba(0, 212, 255, 0.05),
        /* Cyan */ rgba(138, 43, 226, 0.05) /* Violet */
      );

  /* Size each layer differently for depth */
  background-size:
    100% 100%,
    150% 150%,
    150% 150%,
    200% 200%;
  background-position:
    0% 50%,
    75% 75%,
    75% 75%,
    50% 50%;
  background-blend-mode: overlay, multiply, overlay;

  /* Inner chamfer (1px smaller) */
  clip-path: polygon(
    13px 0,
    100% 0,
    100% calc(100% - 13px),
    calc(100% - 13px) 100%,
    0 100%,
    0 13px
  );

  z-index: -1;
  pointer-events: none;
}
```

---

## CSS Variables (Global)

Defined in `_variables.scss`:

```scss
:root {
  --holographic-bg:
    linear-gradient(145deg, #0a0a0a, #000000),
    radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.1),
      transparent 50%
    ),
    radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.5), transparent 50%),
    linear-gradient(
      45deg,
      rgba(138, 43, 226, 0.05),
      rgba(0, 212, 255, 0.05),
      rgba(138, 43, 226, 0.05)
    );

  --holographic-bg-size: 100% 100%, 150% 150%, 150% 150%, 200% 200%;
  --holographic-bg-position: 0% 50%, 75% 75%, 75% 75%, 50% 50%;
  --holographic-bg-blend: overlay, multiply, overlay;
}
```

---

## Column Accent Colors

Each river column has a unique accent color:

```scss
/* Column 1 - Thoughts (Blue) */
.river-column:nth-child(1) .river-post-card {
  --card-accent: rgba(26, 115, 231, 0.6);
  --card-glow: rgba(26, 115, 231, 0.25);
}

/* Column 2 - Media (Magenta) */
.river-column:nth-child(2) .river-post-card {
  --card-accent: rgba(220, 8, 188, 0.6);
  --card-glow: rgba(220, 8, 188, 0.25);
}

/* Column 3 - Milestones (Gold) */
.river-column:nth-child(3) .river-post-card {
  --card-accent: rgba(255, 215, 0, 0.45);
  --card-glow: rgba(255, 215, 0, 0.2);
}
```

---

## Entrance Animations (Per Column)

```scss
/* Base entrance */
@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateZ(-50px) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateZ(0) translateY(0);
  }
}

/* Column 1 - Slide in from left */
@keyframes cardEnter1 {
  from {
    opacity: 0;
    transform: translateZ(-50px) translateY(20px) translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateZ(15px) translateY(0) translateX(0);
  }
}

/* Column 2 - Scale in */
@keyframes cardEnter2 {
  from {
    opacity: 0;
    transform: translateZ(-50px) translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateZ(8px) translateY(0) scale(1);
  }
}

/* Column 3 - Slide in from right */
@keyframes cardEnter3 {
  from {
    opacity: 0;
    transform: translateZ(-50px) translateY(20px) translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateZ(3px) translateY(0) translateX(0);
  }
}
```

---

## Holographic Shimmer Animation

```scss
@keyframes dark-holographic-shimmer {
  0% {
    background-position:
      0% 50%,
      50% 50%,
      50% 50%,
      0% 50%;
  }
  50% {
    background-position:
      0% 50%,
      100% 100%,
      100% 100%,
      100% 50%;
  }
  100% {
    background-position:
      0% 50%,
      50% 50%,
      50% 50%,
      0% 50%;
  }
}

/* Apply shimmer to elements */
.element-with-shimmer {
  background: var(--holographic-bg);
  background-size: var(--holographic-bg-size);
  background-position: var(--holographic-bg-position);
  background-blend-mode: var(--holographic-bg-blend);
  animation: dark-holographic-shimmer 8s ease infinite;
}
```

---

## Hover State

```scss
.river-post-card:hover {
  /* Subtle lift */
  transform: translateY(-2px);
  transition: all 0.2s ease;

  /* Glow effect with accent color */
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--card-accent),
    0 0 12px var(--card-glow);

  /* Bring to front */
  z-index: 50 !important;
}

.river-post-card:hover::before {
  opacity: 1;
}
```

---

## 3D Layer Separation on Hover

```scss
/* Header floats forward */
.river-post-card:hover .river-post-header {
  transform: translateZ(4px);
}

/* Content at base depth */
.river-post-card:hover .river-post-content {
  transform: translateZ(2px);
}

/* Actions most forward */
.river-post-card:hover .river-post-actions {
  transform: translateZ(6px);
}
```

---

## Active/Pressed State

```scss
.river-post-card:active {
  transform: translateY(0);
  transition: all 0.1s ease;
}
```

---

## Type Badges

```scss
.river-type-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 3px 10px;
  border-radius: 10px;
  font-family: var(--font-title);
  font-size: var(--font-size-xs);
  font-weight: 400;
  border: 1px solid;
}

/* Thought badge (Blue) */
.river-post-card.post--thoughts .river-type-badge {
  color: var(--blue-primary);
  background: rgba(26, 115, 231, 0.1);
  border-color: rgba(26, 115, 231, 0.25);
}

/* Media badge (Purple) */
.river-post-card.post--media .river-type-badge {
  color: var(--post-media-badge);
  background: rgba(167, 131, 255, 0.15);
  border-color: rgba(167, 131, 255, 0.4);
}

/* Milestone badge (Green) */
.river-post-card.post--milestones .river-type-badge {
  color: var(--accent);
  background: rgba(26, 231, 132, 0.15);
  border-color: rgba(26, 231, 132, 0.4);
}
```

---

## Base Card System (Reusable)

From `_cards.scss`:

```scss
.card {
  /* Cosmic black holographic background */
  background:
    linear-gradient(145deg, #0a0a0a, #000000),
    radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.1),
      transparent 50%
    ),
    radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.5), transparent 50%),
    linear-gradient(
      45deg,
      rgba(138, 43, 226, 0.05),
      rgba(0, 212, 255, 0.05),
      rgba(138, 43, 226, 0.05)
    );
  background-size:
    100% 100%,
    150% 150%,
    150% 150%,
    200% 200%;
  background-position:
    0% 50%,
    75% 75%,
    75% 75%,
    50% 50%;
  background-blend-mode: overlay, multiply, overlay;

  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: var(--transition);
}

.card-hover {
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--glow);
    border-color: var(--border-hover);
  }
}

.card-glass {
  background: var(--bg-glass);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid var(--border-default);
}
```

---

## Responsive Adjustments

```scss
/* Grid view - smaller screens */
@media (max-width: 650px) {
  .post--grid-view {
    padding: var(--space-sm);

    .river-avatar {
      width: 24px;
      height: 24px;
    }

    .river-author {
      font-size: 11px;
    }

    .river-post-content {
      font-size: 11px;
      line-height: 1.3;
      -webkit-line-clamp: 3;
    }
  }
}

@media (max-width: 400px) {
  .post--grid-view {
    padding: var(--space-xs);

    .river-avatar {
      width: 20px;
      height: 20px;
    }

    .river-post-content {
      font-size: 10px;
      -webkit-line-clamp: 2;
    }
  }
}
```

---

## Complete Copy-Paste Example

```scss
.my-holographic-card {
  /* Layout */
  padding: var(--space-md);
  position: relative;
  overflow: visible;

  /* Chamfered corners */
  clip-path: polygon(
    14px 0,
    100% 0,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    0 100%,
    0 14px
  );

  /* 3D depth */
  transform-style: preserve-3d;
  transform: translateZ(0);

  /* Smooth transitions */
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Glowing border */
  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      135deg,
      rgba(79, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(79, 255, 255, 0.4) 100%
    );
    clip-path: polygon(
      15px 0,
      100% 0,
      100% calc(100% - 15px),
      calc(100% - 15px) 100%,
      0 100%,
      0 15px
    );
    z-index: -2;
    pointer-events: none;
  }

  /* Holographic background */
  &::after {
    content: "";
    position: absolute;
    inset: 1px;
    background: var(--holographic-bg);
    background-size: var(--holographic-bg-size);
    background-position: var(--holographic-bg-position);
    background-blend-mode: var(--holographic-bg-blend);
    clip-path: polygon(
      13px 0,
      100% 0,
      100% calc(100% - 13px),
      calc(100% - 13px) 100%,
      0 100%,
      0 13px
    );
    z-index: -1;
    pointer-events: none;
  }

  /* Hover lift & glow */
  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(79, 255, 255, 0.6),
      0 0 12px rgba(79, 255, 255, 0.25);
  }
}
```

---

## Gradient Layer Breakdown

| Layer | Purpose                        | Gradient Type     | Colors                                  |
| ----- | ------------------------------ | ----------------- | --------------------------------------- |
| 1     | Dark base                      | `linear-gradient` | `#0a0a0a` → `#000000`                   |
| 2     | Highlight (top-left)           | `radial-gradient` | `rgba(255,255,255,0.1)` → `transparent` |
| 3     | Shadow (bottom-right)          | `radial-gradient` | `rgba(0,0,0,0.5)` → `transparent`       |
| 4     | Color tint (subtle iridescent) | `linear-gradient` | Violet `0.05` → Cyan `0.05` → Violet    |

---

## Cubic-Bezier Easing Explained

```scss
transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

- `0.34, 1.56` → Overshoots at start (bouncy acceleration)
- `0.64, 1` → Smooth landing (no overshoot at end)

Creates a springy, organic feel for card interactions.
