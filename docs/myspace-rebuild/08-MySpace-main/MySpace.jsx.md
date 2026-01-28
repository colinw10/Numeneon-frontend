# MySpace.jsx - Main Orchestrator Component

## Purpose
The main parent component that:
- Handles routing (username param)
- Manages all state (localStorage for now)
- Coordinates between subcomponents
- Renders layout (header, content grid, footer)

---

## File Location
`frontend/src/components/pages/MySpace/MySpace.jsx`

---

## Pseudocode

```javascript
// ============================================
// IMPORTS
// ============================================
// React
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Styles
import './MySpace.scss';

// Contexts
import { useAuth, useFriends } from '@contexts';

// Icons
import { ChevronLeftIcon } from '@assets/icons';

// Subcomponents (barrel import)
import { MusicPlayer, Top8Friends, ThemePicker, ProfileSection } from './components';

// Avatar imports (av2 through av17, plus myAvatar)
import av2 from '@assets/icons/avatars/av2.jpg';
// ... all avatar imports ...
import myAvatar from '@assets/icons/avatars/my-avatar.png';

// ============================================
// CONSTANTS
// ============================================

// TOP8_AVATARS - array of 8 avatar imports for friend slots
// This is the config array - change which avatars go in which slots here
const TOP8_AVATARS = [av16, av15, av17, av8, av13, av6, av7, av8];

// MY_AVATAR - the main user's avatar
const MY_AVATAR = myAvatar;

// REBEL_AVATARS - all avatars for fallback (hash-based selection)
const REBEL_AVATARS = [av2, av3, av4, ...all imports...];

// DEFAULT_MYSPACE_DATA - initial state structure
const DEFAULT_MYSPACE_DATA = {
  songTitle: '',
  songArtist: '',
  mood: 'chillin',
  customBio: '',
  theme: 'classic',
  topFriends: [],
  playlist: [
    { id: 1, title: 'Welcome to the Black Parade', artist: 'My Chemical Romance', duration: '5:11' },
    { id: 2, title: 'Mr. Brightside', artist: 'The Killers', duration: '3:42' },
    { id: 3, title: 'Sugar, We\'re Goin Down', artist: 'Fall Out Boy', duration: '3:49' },
  ],
  currentTrack: 0,
  isPlaying: false,
  volume: 75,
  sliderStyle: 1,
};

// ============================================
// HELPER FUNCTION
// ============================================
// getFriendAvatar(index) → returns TOP8_AVATARS[index] or fallback
const getFriendAvatar = (index) => TOP8_AVATARS[index] || REBEL_AVATARS[0];

// ============================================
// COMPONENT
// ============================================
function MySpace() {
  // HOOKS
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const { friends } = useFriends();
  
  // DERIVED STATE (computed on each render)
  const isOwnSpace = !username || username === currentUser?.username;
  const displayUsername = username || currentUser?.username;
  const viewedUser = isOwnSpace 
    ? currentUser 
    : friends.find(f => f.username === username);
  
  // STATE - MySpace profile data
  const [mySpaceData, setMySpaceData] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem(`myspace_${displayUsername}`);
    return saved 
      ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } 
      : DEFAULT_MYSPACE_DATA;
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // ⚠️ CRITICAL EFFECT: Reload data when username changes!
  useEffect(() => {
    const targetUsername = username || currentUser?.username;
    if (!targetUsername) return;
    
    const saved = localStorage.getItem(`myspace_${targetUsername}`);
    const newData = saved 
      ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } 
      : DEFAULT_MYSPACE_DATA;
    
    // Only update if different (prevent infinite loops)
    setMySpaceData(prev => {
      if (JSON.stringify(prev) === JSON.stringify(newData)) return prev;
      return newData;
    });
    setIsEditing(false);
  }, [username, currentUser?.username]);
  
  // EFFECT: Save to localStorage when data changes
  useEffect(() => {
    if (isOwnSpace && mySpaceData !== DEFAULT_MYSPACE_DATA) {
      localStorage.setItem(`myspace_${displayUsername}`, JSON.stringify(mySpaceData));
    }
  }, [mySpaceData, displayUsername, isOwnSpace]);
  
  // DERIVED: Top 8 friends (from saved order or first 8)
  const topFriends = mySpaceData.topFriends.length > 0
    ? mySpaceData.topFriends
        .map(id => friends.find(f => f.id === id))
        .filter(Boolean)
        .slice(0, 8)
    : friends.slice(0, 8);
  
  // HANDLERS
  const handleBack = () => {
    navigate(username ? `/profile/${username}` : '/profile');
  };
  
  const updateField = (field, value) => {
    setMySpaceData(prev => ({ ...prev, [field]: value }));
  };
  
  // ⚠️ CRITICAL: Avatar source calculation
  // When viewing someone else's space, find their index in topFriends
  const avatarSrc = isOwnSpace 
    ? (currentUser?.profile_picture || MY_AVATAR)
    : (viewedUser?.profile_picture || 
       TOP8_AVATARS[topFriends.findIndex(f => f?.username === username)] || 
       REBEL_AVATARS[0]);
  
  // ============================================
  // JSX STRUCTURE
  // ============================================
  return (
    <div className={`myspace-page theme-${mySpaceData.theme}`}>
      
      {/* HEADER */}
      <header className="myspace-header">
        <button className="back-btn" onClick={handleBack}>
          <ChevronLeftIcon size={20} />
          <span>numeneon</span>
        </button>
        <h1 className="myspace-title">{displayUsername}'s space</h1>
        <div className="header-actions">
          {!isOwnSpace && (
            <button className="my-space-btn" onClick={() => navigate('/myspace')}>
              my space
            </button>
          )}
          {isOwnSpace && (
            <button className="edit-toggle-btn" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'done' : 'edit'}
            </button>
          )}
        </div>
      </header>
      
      {/* MAIN CONTENT - Two Column Grid */}
      <main className="myspace-content">
        
        {/* Left Column */}
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
        
        {/* Right Column */}
        <section className="content-section">
          <MusicPlayer
            playlist={mySpaceData.playlist}
            currentTrack={mySpaceData.currentTrack}
            isPlaying={mySpaceData.isPlaying}
            volume={mySpaceData.volume}
            sliderStyle={mySpaceData.sliderStyle}
            isEditing={isEditing}
            onUpdateField={updateField}
          />
          
          <Top8Friends
            topFriends={topFriends}
            getFriendAvatar={getFriendAvatar}
          />
          
          <ThemePicker
            currentTheme={mySpaceData.theme}
            onUpdateField={updateField}
            isVisible={isOwnSpace}
          />
        </section>
      </main>
      
      {/* FOOTER */}
      <footer className="myspace-footer">
        <marquee scrollamount="2">
          thanks 4 visiting my space -- add me on numeneon -- xoxo
        </marquee>
      </footer>
    </div>
  );
}

export default MySpace;
```

---

## ⚠️ Critical Patterns to Remember

### 1. Username Change Effect
```javascript
useEffect(() => {
  // Reload data when navigating to different user's space
}, [username, currentUser?.username]);
```

### 2. Avatar Lookup for Viewed User
```javascript
const avatarSrc = isOwnSpace 
  ? (currentUser?.profile_picture || MY_AVATAR)
  : (viewedUser?.profile_picture || 
     TOP8_AVATARS[topFriends.findIndex(f => f?.username === username)] || 
     REBEL_AVATARS[0]);
```

### 3. Merge Saved Data with Defaults
```javascript
const saved = localStorage.getItem(`myspace_${displayUsername}`);
return saved 
  ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } 
  : DEFAULT_MYSPACE_DATA;
```

---

## Lines: ~240
