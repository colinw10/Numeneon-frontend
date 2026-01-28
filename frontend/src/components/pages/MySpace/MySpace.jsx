// 🔵 PABLO - UI/Styling
// MySpace.jsx - Nostalgic MySpace-style profile page
// Accessed via the throwback button on ProfileCard
// REBEL VIBES: lorelei-neutral avatars, Doto font, no emojis, sharp edges

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MySpace.scss';
import { useAuth, useFriends } from '@contexts';
import { ChevronLeftIcon } from '@assets/icons';

// Import local rebel avatars

import av2 from '@assets/icons/avatars/av2.jpg';
import av3 from '@assets/icons/avatars/av3.webp';
import av4 from '@assets/icons/avatars/av4.webp';
import av5 from '@assets/icons/avatars/av5.webp';
import av6 from '@assets/icons/avatars/av6.jpg';
import av7 from '@assets/icons/avatars/av7.webp';
import av8 from '@assets/icons/avatars/av8.jpg';
import av9 from '@assets/icons/avatars/av9.webp';
import av10 from '@assets/icons/avatars/av10.webp';
import av11 from '@assets/icons/avatars/av11.webp';
import av12 from '@assets/icons/avatars/av12.png';
import av13 from '@assets/icons/avatars/av13.avif';
import av14 from '@assets/icons/avatars/av14.png';
import av15 from '@assets/icons/avatars/av15.jpg';
import av16 from '@assets/icons/avatars/av16.png';
import av17 from '@assets/icons/avatars/av17.png'
import myAvatar from '@assets/icons/avatars/my-avatar.png';

// ═══════════════════════════════════════════════════════════════
// 🎯 PABLO: CHANGE AVATARS HERE! 
// Just change the numbers to pick which avatar for each slot
// Example: av3 for slot 1, av7 for slot 2, etc.
// ═══════════════════════════════════════════════════════════════
const TOP8_AVATARS = [
  av2,    // Friend slot 1
  av16,   // Friend slot 2  
  av3,    // Friend slot 3
  av4,    // Friend slot 4
  av17,   // Friend slot 5
  av6,    // Friend slot 6
  av7,    // Friend slot 7
  av8,    // Friend slot 8
];

// Main user avatar - change this one for your profile pic
const MY_AVATAR = myAvatar;
// ═══════════════════════════════════════════════════════════════

// All avatars (for hash fallback)
const REBEL_AVATARS = [av2, av3, av4, av5, av6, av7, av8, av9, av10, av11, av12, av13, av14, av15, av16, av17];

// Mock data until backend is ready
const DEFAULT_MYSPACE_DATA = {
  songTitle: '',
  songArtist: '',
  mood: 'chillin',
  customBio: '',
  theme: 'classic',
  topFriends: [],
};

// Text-only moods - no emojis, rebel style
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

const THEME_OPTIONS = [
  { id: 'classic', name: 'Classic', preview: '#003366' },
  { id: 'emo', name: 'Emo', preview: '#1a0a0a' },
  { id: 'scene', name: 'Scene', preview: '#ff69b4' },
  { id: 'starry', name: 'Starry', preview: '#0a0a2e' },
  { id: 'glitter', name: 'Glitter', preview: '#2a1a00' },
];

// Get friend avatar from TOP8_AVATARS config
const getFriendAvatar = (index) => TOP8_AVATARS[index] || REBEL_AVATARS[0];

// Get rebel avatar based on username hash (fallback)
const getRebelAvatar = (seed) => {
  let hash = 0;
  const str = String(seed || 'default');
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % REBEL_AVATARS.length;
  return REBEL_AVATARS[index];
};

function MySpace() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { friends } = useFriends();
  
  // Determine if viewing own MySpace or someone else's
  const isOwnSpace = !username || username === currentUser?.username;
  const displayUsername = username || currentUser?.username;
  
  // MySpace profile state (will connect to backend later)
  const [mySpaceData, setMySpaceData] = useState(() => {
    // Try to load from localStorage for now
    const saved = localStorage.getItem(`myspace_${displayUsername}`);
    return saved ? JSON.parse(saved) : DEFAULT_MYSPACE_DATA;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Save to localStorage when data changes (temporary until backend)
  useEffect(() => {
    if (isOwnSpace && mySpaceData !== DEFAULT_MYSPACE_DATA) {
      localStorage.setItem(`myspace_${displayUsername}`, JSON.stringify(mySpaceData));
    }
  }, [mySpaceData, displayUsername, isOwnSpace]);
  
  // Get top 8 friends (use saved order or default to first 8)
  const topFriends = mySpaceData.topFriends.length > 0
    ? mySpaceData.topFriends
        .map(id => friends.find(f => f.id === id))
        .filter(Boolean)
        .slice(0, 8)
    : friends.slice(0, 8);
  
  // Handlers
  const handleBack = () => {
    navigate(username ? `/profile/${username}` : '/profile');
  };
  
  const updateField = (field, value) => {
    setMySpaceData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className={`myspace-page theme-${mySpaceData.theme}`}>
      {/* Header */}
      <header className="myspace-header">
        <button className="back-btn" onClick={handleBack}>
          <ChevronLeftIcon size={20} />
          <span>numeneon</span>
        </button>
        <h1 className="myspace-title">
          {displayUsername}'s space
        </h1>
        <div className="header-actions">
          {/* Show "my space" button when viewing someone else's */}
          {!isOwnSpace && (
            <button 
              className="my-space-btn"
              onClick={() => navigate('/myspace')}
            >
              my space
            </button>
          )}
          {isOwnSpace && (
            <button 
              className="edit-toggle-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'done' : 'edit'}
            </button>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="myspace-content">
        {/* Left Column - Profile Info */}
        <section className="profile-section">
          {/* Avatar */}
          <div className="avatar-container">
            <img 
              src={currentUser?.profile_picture || MY_AVATAR}
              alt={displayUsername}
              className="myspace-avatar"
            />
          </div>
          
          {/* Song Display */}
          <div className="song-section">
            <p className="song-label">currently vibing to</p>
            {isEditing ? (
              <div className="song-edit">
                <input
                  type="text"
                  placeholder="song name"
                  value={mySpaceData.songTitle}
                  onChange={(e) => updateField('songTitle', e.target.value)}
                  className="song-input"
                />
                <input
                  type="text"
                  placeholder="artist"
                  value={mySpaceData.songArtist}
                  onChange={(e) => updateField('songArtist', e.target.value)}
                  className="song-input"
                />
              </div>
            ) : (
              <p className="song-display">
                {mySpaceData.songTitle 
                  ? `${mySpaceData.songTitle} - ${mySpaceData.songArtist}`
                  : 'nothing playing...'}
              </p>
            )}
          </div>
          
          {/* Mood */}
          <div className="mood-section">
            <span className="mood-label">mood:</span>
            {isEditing ? (
              <div className="mood-picker">
                {MOOD_OPTIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    className={`mood-option ${mySpaceData.mood === id ? 'selected' : ''}`}
                    onClick={() => updateField('mood', id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <span className="mood-display">
                {MOOD_OPTIONS.find(m => m.id === mySpaceData.mood)?.label || mySpaceData.mood}
              </span>
            )}
          </div>
        </section>
        
        {/* Right Column - About & Friends */}
        <section className="content-section">
          {/* About Me */}
          <div className="about-section">
            <h2 className="section-title">about me</h2>
            <div className="about-box">
              {isEditing ? (
                <textarea
                  className="about-textarea"
                  placeholder="tell the world about yourself..."
                  value={mySpaceData.customBio}
                  onChange={(e) => updateField('customBio', e.target.value)}
                  rows={4}
                />
              ) : (
                <div 
                  className="about-content"
                  dangerouslySetInnerHTML={{ 
                    __html: mySpaceData.customBio || 'this user hasn\'t written anything yet...' 
                  }}
                />
              )}
            </div>
          </div>
          
          {/* Top 8 Friends */}
          <div className="friends-section">
            <h2 className="section-title">top 8</h2>
            <div className="top-friends-grid">
              {[...Array(8)].map((_, index) => {
                const friend = topFriends[index];
                return (
                  <div 
                    key={index} 
                    className={`friend-slot ${friend ? 'filled' : 'empty'}`}
                    onClick={() => friend && navigate(`/myspace/${friend.username}`)}
                  >
                    {friend ? (
                      <>
                        <img 
                          src={friend.profile_picture || getFriendAvatar(index)}
                          alt={friend.username}
                          className="friend-avatar"
                        />
                        <span className="friend-name">{friend.username}</span>
                        <span className="friend-rank">{index + 1}</span>
                      </>
                    ) : (
                      <span className="empty-slot">?</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Theme Picker */}
          {isOwnSpace && (
            <div className="theme-section">
              <h2 className="section-title">theme</h2>
              <div className="theme-picker">
                {THEME_OPTIONS.map(({ id, name, preview }) => (
                  <button
                    key={id}
                    className={`theme-option ${mySpaceData.theme === id ? 'selected' : ''}`}
                    onClick={() => updateField('theme', id)}
                    style={{ '--preview-color': preview }}
                  >
                    <span className="theme-preview" />
                    <span className="theme-name">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="myspace-footer">
        <marquee scrollamount="2">
          thanks 4 visiting my space -- add me on numeneon -- xoxo
        </marquee>
      </footer>
    </div>
  );
}

export default MySpace;
