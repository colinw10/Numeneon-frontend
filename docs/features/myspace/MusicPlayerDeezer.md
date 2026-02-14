# MyStudio Music Player with Deezer Integration

## Status: ✅ IMPLEMENTED

---

## Overview

Real music playback in MyStudio using Deezer's API for 30-second song previews. Users can search for songs, build a playlist (max 5 songs), and play real audio directly on their profile.

---

## Features

| Feature                 | Description                             | Status |
| ----------------------- | --------------------------------------- | ------ |
| **Song Search**         | Search Deezer catalog via backend proxy | ✅     |
| **Preview Playback**    | 30-second MP3 previews from Deezer CDN  | ✅     |
| **Playlist Management** | Add/remove songs (max 5 per user)       | ✅     |
| **Album Art**           | Display album covers from Deezer        | ✅     |
| **Duration Display**    | Convert ms to M:SS format               | ✅     |
| **Volume Control**      | Adjustable playback volume              | ✅     |
| **Shuffle/Repeat**      | Playback mode toggles                   | ✅     |
| **Auto-advance**        | Automatically play next track           | ✅     |

---

## API Endpoints

### Backend (Django)

| Method   | Endpoint                          | Description                            |
| -------- | --------------------------------- | -------------------------------------- |
| `GET`    | `/api/mystudio/search/?q={query}` | Search songs via Deezer API            |
| `GET`    | `/api/mystudio/{username}/`       | Get user's MyStudio profile + playlist |
| `POST`   | `/api/mystudio/playlist/`         | Add song to playlist                   |
| `DELETE` | `/api/mystudio/playlist/{id}/`    | Remove song from playlist              |

### Response Format (Search)

```json
{
  "results": [
    {
      "id": 722078532,
      "title": "Schism",
      "artist": "TOOL",
      "album": "Lateralus",
      "album_art": "https://cdn-images.dzcdn.net/images/cover/...",
      "preview_url": "https://cdnt-preview.dzcdn.net/api/...",
      "duration_ms": 407000,
      "external_id": "722078532"
    }
  ]
}
```

---

## Frontend Implementation

### Service Layer (`myStudioService.js`)

```javascript
// Search songs - handles backend response format
export const searchSongs = async (query) => {
  const response = await apiClient.get("/mystudio/search/", {
    params: { q: query },
  });
  // Backend returns { results: [...] } with duration_ms
  const results = response.data.results || response.data || [];
  return results.map((song) => ({
    ...song,
    duration: formatDuration(song.duration_ms),
  }));
};

// Convert ms to "M:SS"
const formatDuration = (ms) => {
  if (!ms || typeof ms === "string") return ms || "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Add song to playlist (max 5)
export const addSongToPlaylist = async (song) => {
  const response = await apiClient.post("/mystudio/playlist/", {
    title: song.title,
    artist: song.artist,
    external_id: song.external_id || song.id,
    preview_url: song.preview_url,
    album_art: song.album_art,
  });
  return response.data;
};
```

### Component (`MusicPlayer.jsx`)

Key features:

- **Audio element** via `useRef` for HTML5 Audio API
- **Debounced search** (400ms) to avoid excessive API calls
- **Error handling** shows "Preview unavailable" if audio fails
- **Edit mode** reveals search input and remove buttons

```jsx
// Audio playback
const audioRef = useRef(new Audio());

// Get audio URL - only plays if preview_url exists
const getAudioUrl = (trackIndex) => {
  const t = playlist?.[trackIndex];
  return t?.preview_url || null;
};

// Debounced search
useEffect(() => {
  if (!searchQuery.trim()) return;

  const timeout = setTimeout(async () => {
    setIsSearching(true);
    const results = await searchSongs(searchQuery);
    setSearchResults(results || []);
    setIsSearching(false);
  }, 400);

  return () => clearTimeout(timeout);
}, [searchQuery]);
```

---

## User Flow

1. **Navigate to MyStudio** - Click "my studio" button on profile
2. **Click "edit"** - Enables editing mode
3. **Search for songs** - Type in search box under playlist
4. **Click + to add** - Adds song to playlist (max 5)
5. **Click × to remove** - Removes song from playlist
6. **Click "done"** - Saves and exits edit mode
7. **Press play** - Plays 30-second preview

---

## Technical Decisions

### Why Deezer?

- Free API with no OAuth required for search
- 30-second MP3 previews (Spotify previews often restricted)
- Album art and metadata included
- Reliable CDN for audio delivery

### Why Backend Proxy?

- Hide API keys from frontend
- Rate limiting control
- Response normalization
- CORS handling

### Why Max 5 Songs?

- MySpace nostalgia (original had limited songs)
- Prevents abuse/spam
- Faster page loads
- Encourages curation

---

## Known Limitations

1. **30-second previews only** - Deezer API limitation
2. **Some songs unavailable** - Not all music has preview URLs
3. **Region restrictions** - Some content geo-blocked
4. **No offline playback** - Requires internet connection

---

## Files Modified

| File                                                                             | Changes                                             |
| -------------------------------------------------------------------------------- | --------------------------------------------------- |
| `frontend/src/services/myStudioService.js`                                       | Added search, playlist CRUD, duration formatting    |
| `frontend/src/components/pages/MyStudio/MyStudio.jsx`                            | handleAddSong, handleRemoveSong with error handling |
| `frontend/src/components/pages/MyStudio/components/MusicPlayer/MusicPlayer.jsx`  | Audio playback, search UI, playlist display         |
| `frontend/src/components/pages/MyStudio/components/MusicPlayer/MusicPlayer.scss` | Styling for search input, results, playlist         |

---

## Backend Notes

**URL routing issue fixed:** The `<str:username>/` wildcard route was catching `/playlist/` and `/search/` before the specific routes. Fixed by putting specific routes before the wildcard.

```python
# Correct order in urls.py
urlpatterns = [
    path('search/', search_songs),        # Must be BEFORE username
    path('playlist/', playlist_view),      # Must be BEFORE username
    path('playlist/<int:id>/', ...),
    path('<str:username>/', user_profile), # Wildcard LAST
]
```
