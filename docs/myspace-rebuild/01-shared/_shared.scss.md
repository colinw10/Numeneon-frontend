# _shared.scss - Holographic Black Mixin & Theme Variables

## Purpose
Contains the signature "holographic-black" mixin that gives all containers their dark metallic shimmer effect. All component SCSS files import this.

---

## File Location
`frontend/src/components/pages/MySpace/_shared.scss`

---

## Pseudocode

```scss
// ============================================
// 1. GOOGLE FONT IMPORT
// ============================================
// Import Doto font from Google Fonts
// Weight range: 100 to 900
// Display: swap (for performance)

// ============================================
// 2. HOLOGRAPHIC BLACK MIXIN
// ============================================
// @mixin holographic-black
//   background: LAYER multiple gradients
//     Layer 1: linear-gradient 145deg - dark base (rgba 10,10,10 to 0,0,0)
//     Layer 2: radial-gradient at 30% 30% - subtle white highlight
//     Layer 3: radial-gradient at 70% 70% - dark shadow
//     Layer 4: linear-gradient 45deg - color tint (blue to pink to blue)
//   
//   background-size: 100%, 150%, 150%, 200%
//   background-blend-mode: overlay, multiply, overlay
//   background-position: positioned for shimmer effect
//   animation: holographic-shimmer 8s ease infinite

// ============================================
// 3. HOLOGRAPHIC SHIMMER KEYFRAMES
// ============================================
// @keyframes holographic-shimmer
//   0%, 100%: background-position at start
//   50%: background-position shifted (creates shimmer)

// ============================================
// 4. CODEPEN SLIDER THEME VARIABLE
// ============================================
// $theme-u: 0.375em (unit for pattern)
// $theme-g: repeating-conic-gradient pattern
//   - Creates subtle checkered texture on slider tracks
//   - hsla(0, 0%, 0%, 0.235) for dark squares
//   - transparent for light squares
//   - Size: $theme-u by $theme-u
```

---

## Exact Values Reference

### Holographic Black Gradients
```scss
// Base layer
linear-gradient(145deg, rgba(10, 10, 10, 0.95), rgba(0, 0, 0, 0.85))

// Highlight layer  
radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05), transparent 50%)

// Shadow layer
radial-gradient(circle at 70% 70%, rgba(0, 0, 0, 0.8), transparent 50%)

// Color tint layer
linear-gradient(45deg, rgba(26, 115, 231, 0.08), rgba(220, 8, 188, 0.06), rgba(26, 115, 231, 0.08))
```

### Animation Keyframes
```scss
// Start position
0%, 100%: 0% 50%, 75% 75%, 75% 75%, 0% 50%

// Mid position  
50%: 100% 50%, 25% 25%, 25% 25%, 100% 50%
```

---

## How Other Files Import This

```scss
// In component SCSS files:
@use '../../_shared' as *;

// Then use:
.my-container {
  @include holographic-black;
}
```

---

## Lines: ~37
