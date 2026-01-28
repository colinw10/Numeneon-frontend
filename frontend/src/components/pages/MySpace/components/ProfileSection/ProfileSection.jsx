// ============================================
// ProfileSection.jsx - Avatar, Song, Mood, About
// ============================================
// 
// PURPOSE: Left column component with user avatar,
// currently playing song, mood selector, and bio.
//
// IMPORT: './ProfileSection.scss'
//
// ============================================
// CONSTANTS
// ============================================
// MOOD_OPTIONS = [
//   { id: 'chillin', label: 'chillin' },
//   { id: 'hyped', label: 'hyped' },
//   { id: 'tired', label: 'tired' },
//   { id: 'in-love', label: 'in love' },
//   { id: 'pissed', label: 'pissed' },
//   { id: 'rockin', label: 'rockin' },
//   { id: 'bored', label: 'bored' },
//   { id: 'on-fire', label: 'on fire' },
//   { id: 'whatever', label: 'whatever' },
//   { id: 'emo', label: 'emo' },
// ]

// ============================================
// PROPS
// ============================================
// avatarSrc, displayUsername, songTitle, songArtist,
// mood, customBio, isEditing, onUpdateField

// ============================================
// JSX STRUCTURE
// ============================================
// <section className="profile-section">
//
//   {/* Avatar */}
//   <div className="avatar-container">
//     <img src={avatarSrc} alt={displayUsername} className="myspace-avatar" />
//   </div>
//
//   {/* Song Section */}
//   <div className="song-section">
//     <p className="song-label">currently vibing to</p>
//     {isEditing ? (
//       <div className="song-edit">
//         <input className="song-input" placeholder="song name" value={songTitle} onChange={...} />
//         <input className="song-input" placeholder="artist" value={songArtist} onChange={...} />
//       </div>
//     ) : (
//       <p className="song-display">{songTitle ? `${songTitle} - ${songArtist}` : 'nothing playing...'}</p>
//     )}
//   </div>
//
//   {/* Mood Section */}
//   <div className="mood-section">
//     <span className="mood-label">mood:</span>
//     {isEditing ? (
//       <div className="mood-picker">
//         {MOOD_OPTIONS.map(({ id, label }) => (
//           <button className={`mood-option ${mood === id ? 'selected' : ''}`} onClick={() => onUpdateField('mood', id)}>
//             {label}
//           </button>
//         ))}
//       </div>
//     ) : (
//       <span className="mood-display">{MOOD_OPTIONS.find(m => m.id === mood)?.label || mood}</span>
//     )}
//   </div>
//
//   {/* About Section */}
//   <div className="about-section">
//     <h2 className="section-title">about me</h2>
//     <div className="about-box">
//       {isEditing ? (
//         <textarea className="about-textarea" placeholder="tell the world..." value={customBio} onChange={...} />
//       ) : (
//         <div className="about-content" dangerouslySetInnerHTML={{ __html: customBio || 'this user hasn\'t written anything yet...' }} />
//       )}
//     </div>
//   </div>
//
// </section>
//
// export default ProfileSection;
