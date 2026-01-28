# ThemePicker.scss - Theme Selection Styles

## Purpose
Styles for the theme selection grid with color preview swatches.

---

## File Location
`frontend/src/components/pages/MySpace/components/ThemePicker/ThemePicker.scss`

---

## Import
```scss
@use '../../_shared' as *;
```

---

## Pseudocode Structure

```scss
// ============================================
// THEME PICKER CONTAINER
// ============================================
// .theme-section
//   @include holographic-black
//   padding: 20px
//   border: 1px solid rgba(255, 255, 255, 0.1)
//   border-radius: 0

// ============================================
// THEME GRID
// ============================================
// .theme-picker
//   display: flex
//   gap: 12px
//   flex-wrap: wrap

// ============================================
// THEME OPTION BUTTON
// ============================================
// .theme-option
//   display: flex
//   flex-direction: column
//   align-items: center
//   gap: 6px
//   padding: 12px
//   background: transparent
//   border: 1px solid rgba(255, 255, 255, 0.1)
//   border-radius: 0
//   cursor: pointer
//   transition: all 0.2s ease
//   
//   &:hover
//     border-color: rgba(255, 255, 255, 0.3)
//   
//   &.selected
//     border-color: var(--ms-accent)
//     box-shadow: 0 0 15px var(--ms-glow)

// ============================================
// COLOR SWATCH
// ============================================
// .theme-preview
//   width: 32px
//   height: 32px
//   background: var(--preview-color)  ← CSS custom property from inline style
//   border: 1px solid rgba(255, 255, 255, 0.2)
//   border-radius: 0

// ============================================
// THEME NAME LABEL
// ============================================
// .theme-name
//   font-size: 14px
//   font-weight: 500
//   color: #bbbbbb
//   text-transform: lowercase
```

---

## Key Pattern: CSS Custom Property

The preview color is passed via inline style and used in CSS:

```jsx
// In JSX:
style={{ '--preview-color': preview }}

// In SCSS:
.theme-preview {
  background: var(--preview-color);
}
```

---

## Lines: ~55
