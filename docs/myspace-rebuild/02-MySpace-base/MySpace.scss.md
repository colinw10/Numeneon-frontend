# MySpace.scss - Base Layout & Themes

## Purpose
Contains only base page layout, theme variables, header, footer, and content grid. All component-specific styles are in their own files.

---

## File Location
`frontend/src/components/pages/MySpace/MySpace.scss`

---

## Import
```scss
@use './_shared' as *;
```

---

## Pseudocode Structure

```scss
// ============================================
// 1. THEME CSS VARIABLES (Base)
// ============================================
// .myspace-page
//   --ms-accent: #0066cc (default blue)
//   --ms-text: #ffffff
//   --ms-text-muted: #aaaaaa
//   --ms-glow: rgba(26, 115, 231, 0.3)

// ============================================
// 2. THEME VARIATIONS
// ============================================

// .myspace-page.theme-classic
//   --ms-bg: gradient from #0d7dec to #03000e (blue to dark)
//   --ms-accent: #00d4ff (cyan)
//   --ms-glow: rgba(0, 212, 255, 0.3)

// .myspace-page.theme-emo
//   --ms-bg: gradient from #0a0505 to #050202 (very dark red)
//   --ms-accent: #8b0000 (dark red)
//   --ms-text-muted: #4a4a4a
//   --ms-glow: rgba(139, 0, 0, 0.3)

// .myspace-page.theme-scene
//   --ms-bg: gradient 135deg from #0a050a through #050a05 (dark pink-green)
//   --ms-accent: #ff69b4 (hot pink)
//   --ms-glow: rgba(255, 105, 180, 0.3)

// .myspace-page.theme-starry
//   --ms-bg: gradient from #050515 to #000008 (dark blue)
//   --ms-accent: #9370db (medium purple)
//   --ms-glow: rgba(147, 112, 219, 0.3)

// .myspace-page.theme-glitter
//   --ms-bg: gradient from #0f0a00 to #080500 (dark gold)
//   --ms-accent: #ffd700 (gold)
//   --ms-text-muted: #aa8800
//   --ms-glow: rgba(255, 215, 0, 0.2)

// ============================================
// 3. BASE PAGE STYLES
// ============================================
// .myspace-page
//   min-height: 100vh
//   background: var(--ms-bg)
//   color: var(--ms-text)
//   font-family: 'Doto', monospace
//   font-size: 18px
//   font-weight: 500
//   text-transform: lowercase
//   letter-spacing: 1px
//   text-shadow: subtle white glow
//   overflow-x: hidden
//   position: relative
//
//   // STARRY THEME SPECIAL: animated star background
//   &.theme-starry::before
//     content: ''
//     position: fixed (covers whole screen)
//     background-image: multiple radial-gradients (tiny white dots)
//     background-size: 200px 200px (tiling pattern)
//     animation: twinkle 4s ease-in-out infinite alternate
//     pointer-events: none
//     z-index: 0

// @keyframes twinkle
//   0%: opacity 0.3
//   100%: opacity 0.8

// ============================================
// 4. HEADER
// ============================================
// .myspace-header
//   display: flex
//   align-items: center
//   justify-content: space-between
//   padding: 16px 24px
//   @include holographic-black
//   border-bottom: 1px solid rgba(255,255,255,0.1)
//   position: sticky
//   top: 0
//   z-index: 100
//   backdrop-filter: blur(10px)

// .back-btn
//   display: flex, align-items: center, gap: 10px
//   padding: 12px 22px
//   background: transparent
//   border: 1px solid rgba(255,255,255,0.3)
//   border-radius: 0 (NO RADIUS!)
//   color: var(--ms-text)
//   font-family: 'Doto', monospace
//   font-size: 16px, font-weight: 600
//   cursor: pointer
//   text-transform: lowercase
//   transition: all 0.2s ease
//   
//   &:hover
//     background: var(--ms-accent)
//     border-color: var(--ms-accent)
//     box-shadow: 0 0 15px var(--ms-glow)

// .myspace-title
//   font-size: 34px
//   font-weight: 800
//   letter-spacing: 5px
//   text-transform: lowercase
//   text-shadow: double glow using var(--ms-glow)
//   color: #fff

// .header-actions
//   display: flex
//   gap: 12px

// .my-space-btn (pink "my space" button for viewing own page)
//   @include holographic-black
//   border: 1px solid #ff69b4
//   border-radius: 0
//   color: #ff69b4
//   &:hover → background #ff69b4, color #000

// .edit-toggle-btn
//   @include holographic-black
//   border: 1px solid var(--ms-accent)
//   border-radius: 0
//   color: var(--ms-accent)
//   &:hover → background var(--ms-accent), color #000

// ============================================
// 5. MAIN CONTENT GRID
// ============================================
// .myspace-content
//   display: grid
//   grid-template-columns: 280px 1fr (sidebar + main)
//   gap: 24px
//   padding: 24px
//   max-width: 1200px
//   margin: 0 auto
//   position: relative
//   z-index: 1
//   
//   @media (max-width: 768px)
//     grid-template-columns: 1fr (stack on mobile)

// .content-section
//   display: flex
//   flex-direction: column
//   gap: 20px

// .section-title (shared by all sections)
//   font-size: 22px
//   font-weight: 800
//   letter-spacing: 4px
//   color: #ffffff
//   margin-bottom: 14px
//   text-transform: lowercase
//   border-bottom: 1px solid rgba(255,255,255,0.15)
//   padding-bottom: 10px
//   text-shadow: subtle white glow

// ============================================
// 6. FOOTER
// ============================================
// .myspace-footer
//   @include holographic-black
//   border-top: 1px solid rgba(255,255,255,0.1)
//   padding: 16px 24px
//   text-align: center
//   color: #aaaaaa
//   font-size: 15px
//   
//   marquee
//     color: var(--ms-accent)
//     letter-spacing: 2px
//     font-weight: 600

// ============================================
// 7. THEME-SPECIFIC OVERRIDES
// ============================================
// .myspace-page.theme-scene
//   .myspace-avatar, .friend-avatar
//     border-color: #ff69b4
//     box-shadow: 0 0 10px rgba(255,105,180,0.3)
```

---

## Key CSS Values

### Sticky Header
```scss
position: sticky;
top: 0;
z-index: 100;
backdrop-filter: blur(10px);
```

### Two-Column Grid
```scss
grid-template-columns: 280px 1fr;
```

### Starry Background Pattern
```scss
background-image: 
  radial-gradient(1px 1px at 20px 30px, white, transparent),
  radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.7), transparent),
  radial-gradient(1px 1px at 90px 40px, white, transparent),
  radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.5), transparent),
  radial-gradient(1px 1px at 160px 120px, white, transparent);
background-size: 200px 200px;
```

---

## Lines: ~262
