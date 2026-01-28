# ProfileSection - Avatar, Song, Mood, About

## Purpose
Left column component containing the user's avatar, currently playing song, mood selector, and "about me" bio section.

---

## File Locations
- `frontend/src/components/pages/MySpace/components/ProfileSection/ProfileSection.jsx`
- `frontend/src/components/pages/MySpace/components/ProfileSection/ProfileSection.scss`

---

## ProfileSection.jsx Pseudocode

```javascript
// ============================================
// IMPORTS
// ============================================
// import styles: './ProfileSection.scss'

// ============================================
// CONSTANTS
// ============================================
// MOOD_OPTIONS - array of objects with id and label
// Available moods:
//   chillin, hyped, tired, in-love, pissed, 
//   rockin, bored, on-fire, whatever, emo

// ============================================
// PROPS INTERFACE
// ============================================
// avatarSrc      - string, URL for profile image
// displayUsername - string, username to display
// songTitle      - string, current song name
// songArtist     - string, current song artist
// mood           - string, mood id from MOOD_OPTIONS
// customBio      - string, "about me" content
// isEditing      - boolean, edit mode flag
// onUpdateField  - function(field, value), update handler

// ============================================
// JSX STRUCTURE
// ============================================
// <section className="profile-section">
//
//   {/* Avatar Container */}
//   <div className="avatar-container">
//     <img src={avatarSrc} alt={displayUsername} className="myspace-avatar" />
//   </div>
//
//   {/* Song Section */}
//   <div className="song-section">
//     <p className="song-label">currently vibing to</p>
//     {isEditing ? (
//       // Two inputs for song title and artist
//       <div className="song-edit">
//         <input className="song-input" placeholder="song name" ... />
//         <input className="song-input" placeholder="artist" ... />
//       </div>
//     ) : (
//       // Display: "song - artist" or "nothing playing..."
//       <p className="song-display">...</p>
//     )}
//   </div>
//
//   {/* Mood Section */}
//   <div className="mood-section">
//     <span className="mood-label">mood:</span>
//     {isEditing ? (
//       // Grid of mood buttons
//       <div className="mood-picker">
//         {MOOD_OPTIONS.map(...) => (
//           <button className="mood-option selected?" onClick={...}>
//             {label}
//           </button>
//         )}
//       </div>
//     ) : (
//       // Display current mood
//       <span className="mood-display">{mood}</span>
//     )}
//   </div>
//
//   {/* About Section */}
//   <div className="about-section">
//     <h2 className="section-title">about me</h2>
//     <div className="about-box">
//       {isEditing ? (
//         <textarea className="about-textarea" placeholder="tell the world..." />
//       ) : (
//         <div className="about-content" dangerouslySetInnerHTML={{...}} />
//       )}
//     </div>
//   </div>
//
// </section>

// export default ProfileSection;
```

---

## MOOD_OPTIONS Constant

```javascript
const MOOD_OPTIONS = [
  { id: 'chillin', label: 'chillin' },
  { id: 'hyped', label: 'hyped' },
  { id: 'tired', label: 'tired' },
  { id: 'in-love', label: 'in love' },
  { id: 'pissed', label: 'pissed' },
  { id: 'rockin', label: 'rockin' },
  { id: 'bored', label: 'bored' },
  { id: 'on-fire', label: 'on fire' },
  { id: 'whatever', label: 'whatever' },
  { id: 'emo', label: 'emo' },
];
```

---

## Lines: ~115
