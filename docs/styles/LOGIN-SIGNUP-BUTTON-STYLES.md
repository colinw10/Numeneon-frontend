# Pneuma Login & Signup Button Styles

Complete button styling reference for the authentication pages in Pneuma.

---

## Overview

The submit buttons use:

- **Organic blob border-radius** (asymmetric curves)
- **Bouncy cubic-bezier easing** for hover/active states
- **Radial gradient expansion** on hover via `::before` pseudo-element
- **Backdrop blur** for glass effect

---

## Files

| File                                                                 | Purpose                   |
| -------------------------------------------------------------------- | ------------------------- |
| [Login.scss](frontend/src/components/pages/Login/Login.scss#L487)    | Login page submit button  |
| [Signup.scss](frontend/src/components/pages/Signup/Signup.scss#L378) | Signup page submit button |

---

## JSX Usage

```jsx
{
  /* Login Button */
}
<button type="submit" className="submit-button" disabled={isLoading}>
  {isLoading ? "Signing in..." : "Sign In"}
</button>;

{
  /* Signup Button */
}
<button type="submit" className="submit-button" disabled={isLoading}>
  {isLoading ? "Creating account..." : "Create Account"}
</button>;
```

---

## Base Button Styles

```scss
.btn-submit,
.submit-button {
  // Layout
  width: 100%;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 24px;
  margin-top: 8px;

  // Typography
  font-family: var(--font-main);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 1.25px;
  text-transform: uppercase;

  // Organic blob shape - asymmetric border-radius
  border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;

  // Bouncy animation easing
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  // For ::before pseudo-element
  position: relative;
  overflow: hidden;
}
```

---

## Login Button (Dark Style)

```scss
.btn-submit,
.submit-button {
  // Dark background
  color: white !important;
  background: rgba(0, 0, 0, 0.963) !important;
  border: 2px solid rgba(255, 255, 255, 0.588);
  box-shadow: none;
}
```

---

## Signup Button (Light/Glass Style)

```scss
.btn-submit,
.submit-button {
  // Light glass background
  color: var(--text-dark);
  background: rgba(255, 255, 255, 0.52);
  border: 2px solid rgba(255, 255, 255, 0.369);

  // Dual-tone glow shadow
  box-shadow:
    0 4px 12px rgba(230, 129, 214, 0.4),
    // Pink glow
    0 2px 12px rgba(147, 219, 164, 0.3); // Green glow

  // Glass blur
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

---

## Hover Expansion Effect (::before)

The radial gradient expands from center on hover:

```scss
.btn-submit::before,
.submit-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;

  // Gradient colors (magenta → gold)
  background: radial-gradient(
    circle,
    rgba(220, 8, 188, 0.2),
    // Magenta center
    rgba(220, 192, 8, 0.2) // Gold edge
  );

  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
  z-index: -1;
}

// Expand on hover
.btn-submit:hover:not(:disabled)::before,
.submit-button:hover:not(:disabled)::before {
  width: 200px;
  height: 200px;
}
```

---

## Hover State

```scss
.btn-submit:hover:not(:disabled),
.submit-button:hover:not(:disabled) {
  // Lighten background
  background: rgba(255, 255, 255, 0.706);

  // Lift up + scale
  transform: translateY(-3px) scale(1.03);

  // Solid border
  border-color: rgba(255, 255, 255, 1);

  // Enhanced glow
  box-shadow:
    0 8px 10px rgba(120, 224, 156, 0.185),
    // Green glow
    0 15px 35px rgba(56, 120, 189, 0.351); // Blue glow
}

/* Login page specific hover */
.btn-submit:hover:not(:disabled) {
  background: rgba(0, 0, 0, 1) !important;
  border-color: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}
```

---

## Active/Pressed State

```scss
.btn-submit:active:not(:disabled),
.submit-button:active:not(:disabled) {
  // Press down + slight shrink
  transform: translateY(-2px) scale(0.98);
}
```

---

## Disabled State

```scss
.btn-submit:disabled,
.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

## Loading State

```scss
.btn-submit.loading,
.submit-button.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## Light Mode Override

```scss
[data-theme="light"] .btn-submit {
  // Gradient background
  background: linear-gradient(
    135deg,
    var(--blue-primary),
    var(--accent)
  ) !important;
  background-origin: border-box !important;
  background-clip: padding-box !important;

  color: var(--text-primary) !important;
  border: 2px solid rgba(26, 115, 231, 0.3) !important;
  box-shadow: 0 4px 16px rgba(26, 115, 231, 0.25) !important;
}

[data-theme="light"] .btn-submit:hover {
  background: var(--text-primary) !important;
  color: var(--blue-primary) !important;
  border: 2px solid var(--blue-primary) !important;
  box-shadow: 0 6px 24px rgba(26, 115, 231, 0.4) !important;
}
```

---

## Organic Blob Border-Radius Explained

The asymmetric border-radius creates an organic, fluid shape:

```scss
border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
//            TL   TR   BR   BL  /  TL   TR   BR   BL
//            horizontal radii   /  vertical radii
```

This creates different curves for each corner, mimicking natural blob shapes.

---

## Cubic-Bezier Easing

```scss
transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

- `0.68, -0.55` → Starts with overshoot (bouncy start)
- `0.265, 1.55` → Ends with overshoot (bouncy finish)

This creates the characteristic "bounce" effect on hover.

---

## Form Input Clip-Path (Angular Corners)

The form inputs use a polygon clip-path for cyberpunk angular corners:

```scss
.form-input {
  /* Angular clip-path - cuts corners at 10px */
  clip-path: polygon(
    10px 0,
    /* Top-left corner cut */ 100% 0,
    /* Top-right */ 100% calc(100% - 10px),
    /* Bottom-right corner cut */ calc(100% - 10px) 100%,
    /* Bottom-right */ 0 100%,
    /* Bottom-left */ 0 10px /* Top-left */
  );
}
```

Visual representation:

```
     10px
    ╔══════════════════╗
    ║                  ║
    ║                  ║
    ║                  ╚══ 10px
    ║                    ║
    ╚════════════════════╝
 10px
```

---

## Responsive Breakpoints

```scss
/* Large Desktop (1600px+) */
@media (min-width: 1600px) {
  .btn-submit {
    padding: 14px 24px;
    font-size: clamp(14px, 1vw, 16px);
  }
}

/* Ultra-wide (2000px+) */
@media (min-width: 2000px) {
  .btn-submit {
    padding: 16px 28px;
  }
}

/* Mobile (480px-) */
@media (max-width: 480px) {
  .btn-submit {
    max-width: 100%;
    padding: 12px 20px;
  }
}

/* Small Mobile (390px-) */
@media (max-width: 390px) {
  .btn-submit {
    padding: 10px 16px;
  }
}
```

---

## Complete Copy-Paste Example

```scss
.submit-button {
  // Layout
  width: 100%;
  max-width: 380px;
  margin: 8px auto 0;
  padding: 10px 24px;

  // Typography
  font-family: var(--font-main);
  font-size: var(--font-size-sm);
  font-weight: 400;
  letter-spacing: 1.25px;
  text-transform: uppercase;

  // Colors
  color: var(--text-dark);
  background: rgba(255, 255, 255, 0.52);
  border: 2px solid rgba(255, 255, 255, 0.369);

  // Organic blob shape
  border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;

  // Glow
  box-shadow:
    0 4px 12px rgba(230, 129, 214, 0.4),
    0 2px 12px rgba(147, 219, 164, 0.3);

  // Effects
  backdrop-filter: blur(5px);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;

  // Hover gradient expansion
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(220, 8, 188, 0.2),
      rgba(220, 192, 8, 0.2)
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition:
      width 0.6s,
      height 0.6s;
    z-index: -1;
  }

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.706);
    transform: translateY(-3px) scale(1.03);
    border-color: rgba(255, 255, 255, 1);
    box-shadow:
      0 8px 10px rgba(120, 224, 156, 0.185),
      0 15px 35px rgba(56, 120, 189, 0.351);

    &::before {
      width: 200px;
      height: 200px;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(-2px) scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```
