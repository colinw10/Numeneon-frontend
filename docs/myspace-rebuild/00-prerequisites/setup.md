# Pre-requisites - Setup Before Building MySpace

These files need to be modified BEFORE MySpace will work. Do these FIRST.

---

## 1. App.jsx - Add Routes

**File:** `frontend/src/App.jsx`

**Add import** (after Profile import):
```javascript
import MySpace from './components/pages/MySpace';
```

**Add routes** (after the `/profile/:username` route):
```jsx
<Route path="/myspace" element={<ProtectedRoute><MySpace/></ProtectedRoute>}/>
<Route path="/myspace/:username" element={<ProtectedRoute><MySpace/></ProtectedRoute>}/>
```

---

## 2. icons/misc.jsx - Add New Icons

**File:** `frontend/src/assets/icons/misc.jsx`

**Add at end of file:**
```jsx
/** Electric guitar for MySpace throwback */
export const GuitarIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Guitar body */}
    <path d="M11.5 14.5c-2.5 2.5-6 2-7.5.5s-2-5 .5-7.5c1.5-1.5 4-2 5.5-1l1.5 1.5"/>
    {/* Guitar neck */}
    <path d="M10 10l7-7"/>
    {/* Tuning pegs */}
    <path d="M17 3l2 2"/>
    <path d="M19 5l2-2"/>
    {/* Sound hole */}
    <circle cx="7" cy="11" r="1.5"/>
    {/* Strings hint */}
    <path d="M9 9l-4 4"/>
  </svg>
);

/** Sparkle star for MySpace aesthetic */
export const SparkleStarIcon = ({ size = 16, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
    <path d="M5 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" opacity="0.7"/>
    <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" opacity="0.5"/>
  </svg>
);
```

---

## 3. icons/index.js - Export New Icons

**File:** `frontend/src/assets/icons/index.js`

**Change the misc export** from:
```javascript
export { MusicIcon, MapPinIcon, PostTriangleIcon } from "./misc";
```

**To:**
```javascript
export {
  MusicIcon,
  MapPinIcon,
  PostTriangleIcon,
  GuitarIcon,
  SparkleStarIcon,
} from "./misc";
```

---

## 4. QuickSettings.jsx - Add Throwback Button

**File:** `frontend/src/components/pages/Profile/components/ProfileCard/components/QuickSettings/QuickSettings.jsx`

**Add imports at top:**
```javascript
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts';
```

**Add inside component (before return):**
```javascript
const navigate = useNavigate();
const { user } = useAuth();

const handleThrowback = () => {
  navigate(`/myspace/${user?.username || ''}`);
};
```

**Change the throwback button** from:
```jsx
<button className="setting-btn setting-btn-compact throwback-btn">
  <MusicIcon size={16} />
  <span>🎸</span>
</button>
```

**To:**
```jsx
<button 
  className="setting-btn setting-btn-compact throwback-btn"
  onClick={handleThrowback}
  title="Enter the time machine"
>
  <MusicIcon size={18} className="neon-icon" />
  <span>MySpace</span>
</button>
```

---

## 5. QuickSettings.scss - Add Neon Animation

**File:** `frontend/src/components/pages/Profile/components/ProfileCard/components/QuickSettings/QuickSettings.scss`

**Add before the light mode section:**
```scss
/* Neon icon effect for MySpace music note */
.setting-btn.throwback-btn svg.neon-icon {
  color: #ff69b4;
  filter: 
    drop-shadow(0 0 2px #ff69b4)
    drop-shadow(0 0 4px #ff69b4)
    drop-shadow(0 0 8px rgba(255, 105, 180, 0.6))
    drop-shadow(0 0 12px rgba(255, 215, 0, 0.4));
  animation: neon-pulse 2s ease-in-out infinite alternate;
}

@keyframes neon-pulse {
  0% {
    filter: 
      drop-shadow(0 0 2px #ff69b4)
      drop-shadow(0 0 4px #ff69b4)
      drop-shadow(0 0 8px rgba(255, 105, 180, 0.6));
  }
  100% {
    filter: 
      drop-shadow(0 0 3px #ff69b4)
      drop-shadow(0 0 6px #ff69b4)
      drop-shadow(0 0 12px rgba(255, 105, 180, 0.8))
      drop-shadow(0 0 16px rgba(255, 215, 0, 0.5));
  }
}
```

---

## 6. MySpace/index.js - Barrel Export

**File:** `frontend/src/components/pages/MySpace/index.js`

**Create with:**
```javascript
export { default } from './MySpace';
```

---

## 7. Avatar Images

**Cannot be pseudocoded - must copy directly!**

Copy the entire folder:
```
frontend/src/assets/icons/avatars/
```

Contains 17 images:
- av2.jpg through av17.png (various formats)
- my-avatar.png
- vantablvck_...png (the long filename one)
