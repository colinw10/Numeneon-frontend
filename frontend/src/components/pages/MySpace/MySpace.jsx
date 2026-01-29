// 🔵 PABLO - UI/Styling
// MySpace.jsx - Nostalgic MySpace-style profile page
// Accessed via the throwback button on ProfileCard
// REBEL VIBES: lorelei-neutral avatars, Doto font, no emojis, sharp edges

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MySpace.scss';
import { useAuth, useFriends } from '@contexts';
import { ChevronLeftIcon } from '@assets/icons';

// Subcomponents
import { MusicPlayer, Top8Friends, ThemePicker, ProfileSection } from './components';

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

// Import wallpapers for inline style
import bipolarInvert from '@assets/wallpapers/Bipolar-invert.png';
import bipolarPink from '@assets/wallpapers/Bipolar-pink.png';
import bipolarTeal from '@assets/wallpapers/Bipolar-teal.png';

const WALLPAPER_MAP = {
  none: null,
  invert: bipolarInvert,
  pink: bipolarPink,
  teal: bipolarTeal,
};

// ═══════════════════════════════════════════════════════════════
// 🎯 PABLO: CHANGE AVATARS HERE! 
// Just change the numbers to pick which avatar for each slot
// Example: av3 for slot 1, av7 for slot 2, etc.
// ═══════════════════════════════════════════════════════════════
const TOP8_AVATARS = [
  av16,    // Friend slot 1
  av15,   // Friend slot 2  
  av17,    // Friend slot 3
  av8,    // Friend slot 4
  av13,   // Friend slot 5
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
  wallpaper: 'none',
  topFriends: [],
  // Music player playlist
  playlist: [
    { id: 1, title: 'Pneuma', artist: 'Tool', duration: '11:53' },
    { id: 2, title: 'The Speaker is Systematically Blown', artist: 'Author Punisher', duration: '4:14' },
    { id: 3, title: 'Sweet Dreams', artist: 'Eurythmics', duration: '3:36' },
  ],
  currentTrack: 0,
  isPlaying: false,
  volume: 75,
  sliderStyle: 1, // 1-10 for different slider styles
};

// Get friend avatar from TOP8_AVATARS config
const getFriendAvatar = (index) => TOP8_AVATARS[index] || REBEL_AVATARS[0];

function MySpace() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { friends } = useFriends();
  
  // Determine if viewing own MySpace or someone else's
  // These will recalculate on every render when username changes
  const isOwnSpace = !username || username === currentUser?.username;
  const displayUsername = username || currentUser?.username;
  
  // Get the viewed user's data (for avatar when viewing someone else's space)
  // Must be before useState so it's available on first render
  const viewedUser = isOwnSpace 
    ? currentUser 
    : friends.find(f => f.username === username);
  
  // MySpace profile state (will connect to backend later)
  const [mySpaceData, setMySpaceData] = useState(() => {
    // Try to load from localStorage for now
    const saved = localStorage.getItem(`myspace_${displayUsername}`);
    // Merge with defaults to ensure all fields exist
    return saved ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } : DEFAULT_MYSPACE_DATA;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Re-load data when username changes (navigating to different user's space)
  useEffect(() => {
    // Only re-fetch if we have a username to load
    const targetUsername = username || currentUser?.username;
    if (!targetUsername) return;
    
    const saved = localStorage.getItem(`myspace_${targetUsername}`);
    const newData = saved ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } : DEFAULT_MYSPACE_DATA;
    
    // Only update if data actually changed
    setMySpaceData(prev => {
      if (JSON.stringify(prev) === JSON.stringify(newData)) return prev;
      return newData;
    });
    setIsEditing(false); // Reset editing mode
  }, [username, currentUser?.username]);

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

  // Get avatar for current view
  const avatarSrc = isOwnSpace 
    ? (currentUser?.profile_picture || MY_AVATAR)
    : (viewedUser?.profile_picture || TOP8_AVATARS[topFriends.findIndex(f => f?.username === username)] || REBEL_AVATARS[0]);

  // Get wallpaper style
  const wallpaperSrc = WALLPAPER_MAP[mySpaceData.wallpaper];
  const wallpaperStyle = wallpaperSrc ? {
    backgroundImage: `url(${wallpaperSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  } : {};
  
  return (
    <div 
      className={`myspace-page theme-${mySpaceData.theme}`}
      style={wallpaperStyle}
    >
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
        <ProfileSection
          avatarSrc={avatarSrc}
          displayUsername={displayUsername}
          songTitle={mySpaceData.songTitle}
          songArtist={mySpaceData.songArtist}
          mood={mySpaceData.mood}
          customBio={mySpaceData.customBio}
          isEditing={isEditing}
          onUpdateField={updateField}
        />
        
        {/* Right Column - Music Player & Friends */}
        <section className="content-section">
          {/* RETRO MUSIC PLAYER */}
          <MusicPlayer
            playlist={mySpaceData.playlist}
            currentTrack={mySpaceData.currentTrack}
            isPlaying={mySpaceData.isPlaying}
            volume={mySpaceData.volume}
            sliderStyle={mySpaceData.sliderStyle}
            isEditing={isEditing}
            onUpdateField={updateField}
          />
          
          {/* Top 8 Friends */}
          <Top8Friends
            topFriends={topFriends}
            getFriendAvatar={getFriendAvatar}
          />
          
          {/* Theme Picker */}
          <ThemePicker
            currentTheme={mySpaceData.theme}
            currentWallpaper={mySpaceData.wallpaper}
            onUpdateField={updateField}
            isVisible={isOwnSpace}
          />
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
