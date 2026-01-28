# ThemePicker - Theme Selection Component

## Purpose
Dropdown/grid component that allows users to switch between the 5 MySpace themes. Only visible when viewing your own MySpace.

---

## File Locations
- `frontend/src/components/pages/MySpace/components/ThemePicker/ThemePicker.jsx`
- `frontend/src/components/pages/MySpace/components/ThemePicker/ThemePicker.scss`

---

## ThemePicker.jsx Pseudocode

```javascript
// ============================================
// IMPORTS
// ============================================
// import styles: './ThemePicker.scss'

// ============================================
// CONSTANTS
// ============================================
// THEME_OPTIONS - array of theme objects
// Each has: id, name, preview (color for swatch)

// ============================================
// PROPS INTERFACE
// ============================================
// currentTheme  - string, active theme id
// onUpdateField - function(field, value), update handler
// isVisible     - boolean, show/hide component

// ============================================
// JSX STRUCTURE
// ============================================
// Early return if !isVisible → return null

// <div className="theme-section">
//   <h2 className="section-title">theme</h2>
//   <div className="theme-picker">
//     {THEME_OPTIONS.map(({ id, name, preview }) => (
//       <button
//         key={id}
//         className={`theme-option ${currentTheme === id ? 'selected' : ''}`}
//         onClick={() => onUpdateField('theme', id)}
//         style={{ '--preview-color': preview }}
//       >
//         <span className="theme-preview" />
//         <span className="theme-name">{name}</span>
//       </button>
//     ))}
//   </div>
// </div>

// export default ThemePicker;
```

---

## THEME_OPTIONS Constant

```javascript
const THEME_OPTIONS = [
  { id: 'classic', name: 'Classic', preview: '#003366' },
  { id: 'emo', name: 'Emo', preview: '#1a0a0a' },
  { id: 'scene', name: 'Scene', preview: '#ff69b4' },
  { id: 'starry', name: 'Starry', preview: '#0a0a2e' },
  { id: 'glitter', name: 'Glitter', preview: '#2a1a00' },
];
```

---

## Lines: ~35
