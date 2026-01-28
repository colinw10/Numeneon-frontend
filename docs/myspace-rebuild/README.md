# MySpace Rebuild Guide for Main Branch

## 🎯 Overview
This guide contains everything needed to rebuild the MySpace throwback feature from scratch in the main branch.

---

## 📁 Final File Structure

```
frontend/src/components/pages/MySpace/
├── MySpace.jsx                    # Main component (~240 lines)
├── MySpace.scss                   # Base layout only (~260 lines)
├── _shared.scss                   # Mixin + theme vars (~37 lines)
└── components/
    ├── index.js                   # Barrel export
    ├── MusicPlayer/
    │   ├── MusicPlayer.jsx        # Music player (~150 lines)
    │   └── MusicPlayer.scss       # Slider styles (~570 lines)
    ├── Top8Friends/
    │   ├── Top8Friends.jsx        # Friends grid (~45 lines)
    │   └── Top8Friends.scss       # Grid styles (~85 lines)
    ├── ThemePicker/
    │   ├── ThemePicker.jsx        # Theme selection (~35 lines)
    │   └── ThemePicker.scss       # Theme styles (~55 lines)
    └── ProfileSection/
        ├── ProfileSection.jsx     # Avatar/mood/about (~115 lines)
        └── ProfileSection.scss    # Profile styles (~190 lines)
```

---

## 📋 BUILD ORDER

Follow these folders in order:

| Order | Folder | What to Build | Why This Order |
|-------|--------|---------------|----------------|
| **0** | `00-prerequisites/` | **Routes, icons, QuickSettings, avatars** | **App won't work without these!** |
| 1 | `01-shared/` | `_shared.scss` | Mixin needed by ALL other SCSS files |
| 2 | `02-MySpace-base/` | `MySpace.scss` | Theme variables and page layout |
| 3 | `03-components-index/` | `components/index.js` | Barrel export (can be empty initially) |
| 4 | `04-ProfileSection/` | JSX + SCSS | Left column - avatar, mood, song, about |
| 5 | `05-ThemePicker/` | JSX + SCSS | Theme selection dropdown |
| 6 | `06-Top8Friends/` | JSX + SCSS | Friends grid with avatars |
| 7 | `07-MusicPlayer/` | JSX + SCSS | Most complex - 10 slider styles |
| 8 | `08-MySpace-main/` | `MySpace.jsx` | Main orchestrator - imports all |

⚠️ **START WITH 00-prerequisites!** Without App.jsx routes, there's no way to reach MySpace.

---

## 🔴 CRITICAL ERRORS TO AVOID

### Error 1: Friend Avatar Bug
**Problem**: When clicking a friend to visit their MySpace, the avatar showed wrong image.
**Cause**: Using `friend.avatar` directly instead of looking up the avatar from TOP8_AVATARS array.
**Solution**: Find the friend's index in topFriends, then use `TOP8_AVATARS[index]` for their avatar.

### Error 2: MySpace Data Not Reloading
**Problem**: Navigating from one user's MySpace to another didn't update the page.
**Cause**: Missing useEffect dependency on `username` param.
**Solution**: Add useEffect that reloads mySpaceData when username changes.

### Error 3: SCSS Missing Braces
**Problem**: `expected "}"` errors at random line numbers.
**Cause**: Complex nested selectors missing closing braces.
**Solution**: Count your braces. Each `{` needs a `}`. Use editor's bracket matching.

### Error 4: WebKit Scrollbar Not Styling
**Problem**: Custom scrollbar shows as plain gray despite CSS.
**Cause**: Nested `&::-webkit-scrollbar` inside parent doesn't always compile correctly.
**Solution**: Use direct selectors: `.playlist::-webkit-scrollbar` not `&::-webkit-scrollbar` inside `.playlist`.

### Error 5: JSX Export Syntax Error
**Problem**: `Unexpected token` after export default.
**Cause**: Extra closing tags after `export default MySpace;`.
**Solution**: Never put any JSX after the export statement.

---

## 🎨 Design System Constants

### Font
- **Google Font**: Doto (monospace, throwback feel)
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap');`

### Style Rules
- **NO border-radius** on any element (sharp edges = retro)
- **holographic-black** mixin on all containers
- **text-transform: lowercase** everywhere
- **letter-spacing: 1-2px** for that tech feel

### Theme CSS Variables
```
--ms-accent    → Primary accent color
--ms-text      → Text color (#ffffff)
--ms-text-muted → Muted text (#aaaaaa)
--ms-glow      → Box-shadow glow color
--ms-bg        → Background gradient
```

### Themes Available
1. **classic** - Blue (#00d4ff)
2. **emo** - Dark red (#8b0000)
3. **scene** - Hot pink (#ff69b4)
4. **starry** - Purple (#9370db) + animated stars
5. **glitter** - Gold (#ffd700)

---

## 🔗 Required Imports in MySpace.jsx

```javascript
// React
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Context
import { useAuth } from '../../../contexts';

// Components (from barrel export)
import { MusicPlayer, Top8Friends, ThemePicker, ProfileSection } from './components';

// Styles
import './MySpace.scss';
```
