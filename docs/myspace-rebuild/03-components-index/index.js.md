# components/index.js - Barrel Export

## Purpose
Single entry point for all MySpace subcomponents. Enables clean imports in MySpace.jsx.

---

## File Location
`frontend/src/components/pages/MySpace/components/index.js`

---

## Code

```javascript
// Barrel export for MySpace subcomponents
export { default as MusicPlayer } from './MusicPlayer/MusicPlayer';
export { default as Top8Friends } from './Top8Friends/Top8Friends';
export { default as ThemePicker } from './ThemePicker/ThemePicker';
export { default as ProfileSection } from './ProfileSection/ProfileSection';
```

---

## Usage in MySpace.jsx

```javascript
// Instead of:
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Top8Friends from './components/Top8Friends/Top8Friends';
import ThemePicker from './components/ThemePicker/ThemePicker';
import ProfileSection from './components/ProfileSection/ProfileSection';

// You can do:
import { MusicPlayer, Top8Friends, ThemePicker, ProfileSection } from './components';
```

---

## Lines: ~5
