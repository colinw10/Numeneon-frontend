// ============================================
// MusicPlayer.jsx - Retro Music Player
// ============================================
// 
// PURPOSE: Full retro MySpace-style music player with:
// - Now playing marquee
// - Playback controls
// - CodePen-style volume slider (10 styles!)
// - Scrollable playlist
// - Add song form (edit mode)
//
// IMPORT: './MusicPlayer.scss'
//
// ============================================
// CONSTANTS - 10 SLIDER STYLES
// ============================================
// SLIDER_STYLES = [
//   { id: 1, name: 'star', colors: ['#dcb004', '#e34f1e'] },
//   { id: 2, name: 'cyan', colors: ['#0010d5', '#00d1de'] },
//   { id: 3, name: 'pink', colors: ['#cc040d', '#d44dbf'] },
//   { id: 4, name: 'green', colors: ['#08c300', '#aaca00'] },
//   { id: 5, name: 'gray', colors: ['#0f0f0f', '#737373'] },
//   { id: 6, name: 'octagon', colors: ['#8b5cf6', '#a855f7'] },
//   { id: 7, name: 'diamond', colors: ['#06b6d4', '#14b8a6'] },
//   { id: 8, name: 'heart', colors: ['#f43f5e', '#ec4899'] },
//   { id: 9, name: 'hexagon', colors: ['#f97316', '#fb923c'] },
//   { id: 10, name: 'cross', colors: ['#22c55e', '#4ade80'] },
// ]

// ============================================
// PROPS
// ============================================
// playlist, currentTrack, isPlaying, volume, sliderStyle,
// isEditing, onUpdateField

// ============================================
// JSX STRUCTURE
// ============================================
// const track = playlist?.[currentTrack] || playlist?.[0] || { title: 'no music', artist: '...', duration: '0:00' };
//
// <div className="music-player-section">
//   <h2 className="section-title">my music</h2>
//   <div className="music-player">
//
//     {/* Player Display - LCD style */}
//     <div className="player-display">
//       <div className="now-playing">
//         <span className="np-label">now playing:</span>
//         <marquee className="np-track" scrollamount="2">{track.title} - {track.artist}</marquee>
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
//     {/* Player Controls - Windows 98 style buttons */}
//     <div className="player-controls">
//       <button className="control-btn" onClick={() => onUpdateField('currentTrack', Math.max(0, currentTrack - 1))}>⏮</button>
//       <button className="control-btn play-btn" onClick={() => onUpdateField('isPlaying', !isPlaying)}>
//         {isPlaying ? '⏸' : '▶'}
//       </button>
//       <button className="control-btn" onClick={() => onUpdateField('currentTrack', Math.min(playlist.length - 1, currentTrack + 1))}>⏭</button>
//       <button className="control-btn">🔀</button>
//       <button className="control-btn">🔁</button>
//     </div>
//
//     {/* Volume Section */}
//     <div className="volume-section">
//       <div className="volume-row">
//         <span className="volume-label">volume</span>
//         <input 
//           type="range" 
//           className={`codepen-slider style-${sliderStyle || 1}`}
//           min="0" max="100" value={volume || 75}
//           style={{ '--val': volume || 75 }}  ← CRITICAL: CSS variable for fill!
//           onChange={(e) => onUpdateField('volume', parseInt(e.target.value))}
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
//                 key={id}
//                 className={`slider-option ${sliderStyle === id ? 'selected' : ''}`}
//                 style={{ '--c0': colors[0], '--c1': colors[1] }}
//                 onClick={() => onUpdateField('sliderStyle', id)}
//                 title={name}
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
//           key={t.id}
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
//         <input type="text" placeholder="song title" className="song-input" />
//         <input type="text" placeholder="artist" className="song-input" />
//         <button className="add-song-btn">+ add</button>
//       </div>
//     )}
//
//   </div>
// </div>
//
// export default MusicPlayer;
