# MySpace Throwback Mode

## Status: 🚧 IN DEVELOPMENT

---

## Overview

A nostalgic MySpace-inspired profile page accessible via the 🎸 button on the profile card. This is a contained easter egg feature that doesn't pollute the main Numeneon experience but adds a fun, viral-worthy differentiator.

---

## Why This Feature?

| Reason                    | Impact                                           |
| ------------------------- | ------------------------------------------------ |
| **Nostalgia is trending** | Y2K aesthetic, 2000s revivals are huge right now |
| **Differentiator**        | No other modern social app has this              |
| **Contained scope**       | Separate from main app, low risk                 |
| **Viral potential**       | Shareable, screenshot-worthy                     |
| **Easter egg appeal**     | Hidden feature = discovery joy                   |

---

## Visual Design

```
┌─────────────────────────────────────────────────────────────┐
│  🎸 [username]'s Space                         [Back to App]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  "Currently vibing to..."                │
│  │   AVATAR     │  ♫ [Song Name] - [Artist]   ▶️            │
│  │   (sparkle   │                                          │
│  │    border)   │  Mood: 😎 chillin                        │
│  └──────────────┘                                          │
│                                                             │
│  ═══════════════════════════════════════════════════════   │
│                                                             │
│  📝 About Me                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [editable bio with Comic Sans option]               │   │
│  │ <marquee>Welcome to my page!!</marquee>             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  👥 Top 8 Friends                                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐  │
│  │ 🧑 │ │ 👩 │ │ 🧔 │ │ 👱 │ │ 👩 │ │ 🧑 │ │ 👨 │ │ 👩 │  │
│  │ #1 │ │ #2 │ │ #3 │ │ #4 │ │ #5 │ │ #6 │ │ #7 │ │ #8 │  │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘  │
│                                                             │
│  🎨 Theme: [Starry Night ▾]                               │
│                                                             │
│  ✨ [sparkle cursor follows mouse]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

### MVP (Phase 1)

| Feature            | Description                                   | Effort |
| ------------------ | --------------------------------------------- | ------ |
| **Route**          | `/myspace/:username`                          | 10 min |
| **Page Component** | `MySpacePage.jsx` with retro layout           | 30 min |
| **Top 8 Friends**  | Draggable grid from existing friends list     | 20 min |
| **Custom Bio**     | Editable text area (can differ from main bio) | 15 min |
| **Song Display**   | Text field for "currently listening to"       | 10 min |
| **Mood Selector**  | Dropdown with emoji moods                     | 10 min |
| **Theme Presets**  | 4-5 MySpace-style backgrounds                 | 20 min |
| **Sparkle Cursor** | CSS + JS easter egg                           | 5 min  |
| **Marquee Text**   | `<marquee>` tag support in bio                | 2 min  |
| **Back Button**    | Return to main Numeneon profile               | 5 min  |

**Total MVP: ~2 hours**

### Phase 2 (If Popular)

| Feature                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| **Song Embed**            | Actual Spotify/YouTube player                |
| **Custom CSS**            | Let users write their own styles (sandboxed) |
| **Glitter GIFs**          | Library of classic MySpace decorations       |
| **Guestbook**             | Comments section with retro styling          |
| **Profile Views Counter** | "You are visitor #12,847"                    |
| **Autoplay Toggle**       | For the song (off by default, obviously)     |

---

## Theme Presets

| Theme            | Description                            |
| ---------------- | -------------------------------------- |
| **Classic**      | Blue gradient, white text, simple      |
| **Emo**          | Black background, red accents, dark    |
| **Scene**        | Neon pink/green, checkerboard patterns |
| **Glitter**      | Sparkly background, gold accents       |
| **Starry Night** | Space background with twinkling stars  |

---

## Data Model (Backend)

```python
class MySpaceProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    song_title = models.CharField(max_length=100, blank=True)
    song_artist = models.CharField(max_length=100, blank=True)
    song_url = models.URLField(blank=True)          # Optional Spotify/YouTube link
    mood = models.CharField(max_length=50, blank=True)
    custom_bio = models.TextField(blank=True)       # Can be different from main bio
    theme = models.CharField(max_length=20, default='classic')
    top_friends = models.JSONField(default=list)    # Ordered list of user IDs [1, 5, 3, ...]
    show_marquee = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "MySpace Profile"
```

**Note:** For MVP, we can mock this data on the frontend and add backend later.

---

## API Endpoints (Future)

```
GET  /api/myspace/:username/     → Get MySpace profile
POST /api/myspace/               → Create/update own MySpace profile
PUT  /api/myspace/top-friends/   → Update Top 8 order
```

---

## File Structure

```
frontend/src/components/pages/MySpace/
├── MySpacePage.jsx              # Main page component
├── MySpacePage.scss             # Retro styling
├── components/
│   ├── TopFriends/
│   │   ├── TopFriends.jsx       # Draggable friend grid
│   │   └── TopFriends.scss
│   ├── SongDisplay/
│   │   ├── SongDisplay.jsx      # "Currently listening to"
│   │   └── SongDisplay.scss
│   ├── MoodSelector/
│   │   ├── MoodSelector.jsx     # Emoji mood picker
│   │   └── MoodSelector.scss
│   ├── ThemePicker/
│   │   ├── ThemePicker.jsx      # Background theme selector
│   │   └── ThemePicker.scss
│   └── AboutMe/
│       ├── AboutMe.jsx          # Editable bio with marquee
│       └── AboutMe.scss
├── themes/
│   ├── classic.scss
│   ├── emo.scss
│   ├── scene.scss
│   ├── glitter.scss
│   └── starry.scss
└── utils/
    └── sparkles.js              # Cursor sparkle effect
```

---

## Entry Point

The throwback button in `QuickSettings.jsx` will navigate to `/myspace/:username`:

```jsx
// QuickSettings.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

// Inside component:
const navigate = useNavigate();
const { user } = useAuth();

<button
  className="setting-btn setting-btn-compact throwback-btn"
  onClick={() => navigate(`/myspace/${user.username}`)}
>
  <MusicIcon size={16} />
  <span>🎸</span>
</button>;
```

---

## Styling Notes

### Fonts

- **Comic Sans MS** — Optional toggle for bio
- **Impact** — For headers
- **Courier** — For "About Me" sections

### Colors (by theme)

```scss
// Classic
$myspace-blue: #003366;
$myspace-link: #0066cc;

// Emo
$emo-black: #0a0a0a;
$emo-red: #8b0000;

// Scene
$scene-pink: #ff69b4;
$scene-green: #39ff14;

// Glitter
$glitter-gold: #ffd700;
$glitter-pink: #ff1493;
```

### Effects

- **Sparkle cursor** — Particles follow mouse
- **Marquee** — Scrolling text
- **Blinking text** — CSS animation
- **Star background** — Twinkling CSS animation

---

## Implementation Checklist

### Phase 1: MVP

- [ ] Create `/myspace/:username` route in App.jsx
- [ ] Create `MySpacePage.jsx` component
- [ ] Create base `MySpacePage.scss` with retro styling
- [ ] Implement Top 8 Friends grid (static first, draggable later)
- [ ] Add mood selector with emojis
- [ ] Add song display (text only)
- [ ] Add "About Me" section with marquee support
- [ ] Create 3 theme presets (classic, emo, starry)
- [ ] Add sparkle cursor effect
- [ ] Hook up throwback button to navigate
- [ ] Add "Back to Numeneon" button

### Phase 2: Polish

- [ ] Make Top 8 draggable/reorderable
- [ ] Add more theme presets
- [ ] Add profile view counter
- [ ] Persist to localStorage (before backend)

### Phase 3: Backend

- [ ] Create MySpaceProfile model
- [ ] Create API endpoints
- [ ] Connect frontend to backend

---

## Related

- [QuickSettings.jsx](../../../frontend/src/components/pages/Profile/components/ProfileCard/components/QuickSettings/QuickSettings.jsx) — Entry point button
- [ProfileCardFlipSystem.md](../ProfileCardFlipSystem.md) — Where the button lives
