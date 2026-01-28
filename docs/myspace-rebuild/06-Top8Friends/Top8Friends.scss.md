# Top8Friends.scss - Friends Grid Styles

## Purpose
Styles for the Top 8 friends grid with hover effects and rank badges.

---

## File Location
`frontend/src/components/pages/MySpace/components/Top8Friends/Top8Friends.scss`

---

## Import
```scss
@use '../../_shared' as *;
```

---

## Pseudocode Structure

```scss
// ============================================
// FRIENDS SECTION CONTAINER
// ============================================
// .friends-section
//   @include holographic-black
//   padding: 20px
//   border: 1px solid rgba(255, 255, 255, 0.1)
//   border-radius: 0

// ============================================
// GRID LAYOUT
// ============================================
// .top-friends-grid
//   display: grid
//   grid-template-columns: repeat(4, 1fr)  ← 4 columns
//   gap: 12px
//   
//   @media (max-width: 600px)
//     grid-template-columns: repeat(2, 1fr)  ← 2 columns on mobile

// ============================================
// FRIEND SLOT (filled or empty)
// ============================================
// .friend-slot
//   display: flex
//   flex-direction: column
//   align-items: center
//   gap: 6px
//   padding: 12px 8px
//   @include holographic-black
//   border: 1px solid rgba(255, 255, 255, 0.1)
//   border-radius: 0
//   cursor: pointer
//   transition: all 0.2s ease
//   position: relative  ← for rank positioning
//   
//   &.filled:hover
//     border-color: var(--ms-accent)
//     transform: translateY(-2px)
//     box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--ms-glow)
//   
//   &.empty
//     cursor: default
//     opacity: 0.3

// ============================================
// FRIEND AVATAR
// ============================================
// .friend-avatar
//   width: 50px
//   height: 50px
//   object-fit: cover
//   border: 1px solid var(--ms-accent)
//   border-radius: 0
//   filter: contrast(1.1) saturate(0.9)

// ============================================
// FRIEND NAME
// ============================================
// .friend-name
//   font-size: 14px
//   font-weight: 600
//   text-align: center
//   color: #ffffff
//   max-width: 100%
//   overflow: hidden
//   text-overflow: ellipsis
//   white-space: nowrap

// ============================================
// RANK BADGE (top right corner)
// ============================================
// .friend-rank
//   position: absolute
//   top: 4px
//   right: 4px
//   font-size: 13px
//   font-weight: 800
//   color: var(--ms-accent)
//   font-family: 'Doto', monospace
//   text-shadow: 0 0 6px var(--ms-glow)

// ============================================
// EMPTY SLOT PLACEHOLDER
// ============================================
// .empty-slot
//   font-size: 20px
//   color: var(--ms-text-muted)
//   opacity: 0.2
//   font-family: 'Doto', monospace
```

---

## Key Pattern: Lift on Hover

```scss
&.filled:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--ms-glow);
}
```

---

## Lines: ~85
