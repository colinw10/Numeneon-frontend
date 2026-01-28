# MusicPlayer - Retro Music Player Component

## Purpose
The most complex subcomponent - a full retro MySpace-style music player with:
- Now playing marquee display
- Playback controls (prev, play/pause, next, shuffle, repeat)
- CodePen-style volume slider with 10 customizable styles
- Scrollable playlist
- Add song form (edit mode)

---

## File Locations
- `frontend/src/components/pages/MySpace/components/MusicPlayer/MusicPlayer.jsx`
- `frontend/src/components/pages/MySpace/components/MusicPlayer/MusicPlayer.scss`

---

## MusicPlayer.jsx Pseudocode

```javascript
// ============================================
// IMPORTS
// ============================================
// import styles: './MusicPlayer.scss'

// ============================================
// CONSTANTS - SLIDER STYLES
// ============================================
// SLIDER_STYLES - array of 10 slider style options
// Each has: id, name, colors (array of 2 gradient colors)

// ============================================
// PROPS INTERFACE
// ============================================
// playlist      - array of track objects {id, title, artist, duration}
// currentTrack  - number, index of playing track
// isPlaying     - boolean, playback state
// volume        - number 0-100
// sliderStyle   - number 1-10, which slider design to use
// isEditing     - boolean, edit mode flag
// onUpdateField - function(field, value), update handler

// ============================================
// TRACK FALLBACK
// ============================================
// const track = playlist?.[currentTrack] || playlist?.[0] || { 
//   title: 'no music', 
//   artist: '...', 
//   duration: '0:00' 
// };

// ============================================
// JSX STRUCTURE
// ============================================
// <div className="music-player-section">
//   <h2 className="section-title">my music</h2>
//   <div className="music-player">
//
//     {/* Player Display */}
//     <div className="player-display">
//       <div className="now-playing">
//         <span className="np-label">now playing:</span>
//         <marquee className="np-track">{track.title} - {track.artist}</marquee>
//       </div>
//       <div className="player-time">
//         <span>0:00</span>
//         <div className="progress-bar">
//           <div className="progress-fill" style={{ width: '35%' }} />
//         </div>
//         <span>{track.duration}</span>
//       </div>
//     </div>
//
//     {/* Player Controls */}
//     <div className="player-controls">
//       <button className="control-btn" onClick={prev}>⏮</button>
//       <button className="control-btn play-btn" onClick={toggle}>
//         {isPlaying ? '⏸' : '▶'}
//       </button>
//       <button className="control-btn" onClick={next}>⏭</button>
//       <button className="control-btn">🔀</button>
//       <button className="control-btn">🔁</button>
//     </div>
//
//     {/* Volume Section with CodePen Slider */}
//     <div className="volume-section">
//       <div className="volume-row">
//         <span className="volume-label">volume</span>
//         <input 
//           type="range" 
//           className={`codepen-slider style-${sliderStyle || 1}`}
//           min="0" max="100" value={volume}
//           style={{ '--val': volume }}
//           onChange={...}
//         />
//       </div>
//       
//       {/* Slider Style Picker (Edit Mode Only) */}
//       {isEditing && (
//         <div className="slider-picker">
//           <span className="picker-label">slider style:</span>
//           <div className="slider-options">
//             {SLIDER_STYLES.map(({ id, name, colors }) => (
//               <button
//                 className={`slider-option ${selected?}`}
//                 style={{ '--c0': colors[0], '--c1': colors[1] }}
//                 onClick={() => onUpdateField('sliderStyle', id)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//
//     {/* Playlist */}
//     <div className="playlist">
//       <div className="playlist-header">playlist</div>
//       {playlist.map((t, index) => (
//         <div 
//           className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
//           onClick={() => onUpdateField('currentTrack', index)}
//         >
//           <span className="track-num">{index + 1}.</span>
//           <span className="track-info">
//             <span className="track-title">{t.title}</span>
//             <span className="track-artist">{t.artist}</span>
//           </span>
//           <span className="track-duration">{t.duration}</span>
//         </div>
//       ))}
//     </div>
//
//     {/* Add Song (Edit Mode Only) */}
//     {isEditing && (
//       <div className="add-song">
//         <input placeholder="song title" className="song-input" />
//         <input placeholder="artist" className="song-input" />
//         <button className="add-song-btn">+ add</button>
//       </div>
//     )}
//
//   </div>
// </div>

// export default MusicPlayer;
```

---

## SLIDER_STYLES Constant

```javascript
const SLIDER_STYLES = [
  { id: 1, name: 'star', colors: ['#dcb004', '#e34f1e'] },
  { id: 2, name: 'cyan', colors: ['#0010d5', '#00d1de'] },
  { id: 3, name: 'pink', colors: ['#cc040d', '#d44dbf'] },
  { id: 4, name: 'green', colors: ['#08c300', '#aaca00'] },
  { id: 5, name: 'gray', colors: ['#0f0f0f', '#737373'] },
  { id: 6, name: 'octagon', colors: ['#8b5cf6', '#a855f7'] },
  { id: 7, name: 'diamond', colors: ['#06b6d4', '#14b8a6'] },
  { id: 8, name: 'heart', colors: ['#f43f5e', '#ec4899'] },
  { id: 9, name: 'hexagon', colors: ['#f97316', '#fb923c'] },
  { id: 10, name: 'cross', colors: ['#22c55e', '#4ade80'] },
];
```

---

## ⚠️ CRITICAL: CSS Custom Property for Slider

The slider uses `--val` CSS variable for the fill:
```jsx
style={{ '--val': volume || 75 }}
```

This is used in SCSS to calculate fill width via `--pos`.

---

## Lines: ~150
