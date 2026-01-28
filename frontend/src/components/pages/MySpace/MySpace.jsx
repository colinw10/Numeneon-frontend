// ============================================
// MySpace.jsx - Main Orchestrator Component
// ============================================
// 
// PURPOSE: Parent component that handles routing, state,
// and coordinates between all subcomponents.
//
// ============================================
// IMPORTS
// ============================================
// React: useState, useEffect
// Router: useParams, useNavigate
// Styles: './MySpace.scss'
// Contexts: useAuth, useFriends from '@contexts'
// Icons: ChevronLeftIcon from '@assets/icons'
// Subcomponents: { MusicPlayer, Top8Friends, ThemePicker, ProfileSection } from './components'
// Avatars: av2 through av17, myAvatar from '@assets/icons/avatars/'

// ============================================
// CONSTANTS
// ============================================
// TOP8_AVATARS = [av16, av15, av17, av8, av13, av6, av7, av8]
//   - Config array for which avatar goes in which friend slot
//
// MY_AVATAR = myAvatar
//   - Main user's avatar
//
// REBEL_AVATARS = [av2, av3, av4, ...all imports...]
//   - Fallback array for hash-based selection
//
// DEFAULT_MYSPACE_DATA = {
//   songTitle: '', songArtist: '', mood: 'chillin',
//   customBio: '', theme: 'classic', topFriends: [],
//   playlist: [
//     { id: 1, title: 'Welcome to the Black Parade', artist: 'My Chemical Romance', duration: '5:11' },
//     { id: 2, title: 'Mr. Brightside', artist: 'The Killers', duration: '3:42' },
//     { id: 3, title: 'Sugar, We\'re Goin Down', artist: 'Fall Out Boy', duration: '3:49' },
//   ],
//   currentTrack: 0, isPlaying: false, volume: 75, sliderStyle: 1
// }

// ============================================
// HELPER FUNCTION
// ============================================
// getFriendAvatar(index) → TOP8_AVATARS[index] || REBEL_AVATARS[0]

// ============================================
// COMPONENT
// ============================================
// function MySpace() {
//   // HOOKS
//   const { username } = useParams()
//   const navigate = useNavigate()
//   const { user: currentUser } = useAuth()
//   const { friends } = useFriends()
//
//   // DERIVED STATE
//   const isOwnSpace = !username || username === currentUser?.username
//   const displayUsername = username || currentUser?.username
//   const viewedUser = isOwnSpace ? currentUser : friends.find(f => f.username === username)
//
//   // STATE - load from localStorage, merge with defaults
//   const [mySpaceData, setMySpaceData] = useState(() => {
//     const saved = localStorage.getItem(`myspace_${displayUsername}`)
//     return saved ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } : DEFAULT_MYSPACE_DATA
//   })
//   const [isEditing, setIsEditing] = useState(false)
//
//   // ⚠️ CRITICAL: Reload data when username changes!
//   useEffect(() => {
//     const targetUsername = username || currentUser?.username
//     if (!targetUsername) return
//     const saved = localStorage.getItem(`myspace_${targetUsername}`)
//     const newData = saved ? { ...DEFAULT_MYSPACE_DATA, ...JSON.parse(saved) } : DEFAULT_MYSPACE_DATA
//     setMySpaceData(prev => JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData)
//     setIsEditing(false)
//   }, [username, currentUser?.username])
//
//   // Save to localStorage
//   useEffect(() => {
//     if (isOwnSpace && mySpaceData !== DEFAULT_MYSPACE_DATA) {
//       localStorage.setItem(`myspace_${displayUsername}`, JSON.stringify(mySpaceData))
//     }
//   }, [mySpaceData, displayUsername, isOwnSpace])
//
//   // Top 8 friends
//   const topFriends = mySpaceData.topFriends.length > 0
//     ? mySpaceData.topFriends.map(id => friends.find(f => f.id === id)).filter(Boolean).slice(0, 8)
//     : friends.slice(0, 8)
//
//   // Handlers
//   const handleBack = () => navigate(username ? `/profile/${username}` : '/profile')
//   const updateField = (field, value) => setMySpaceData(prev => ({ ...prev, [field]: value }))
//
//   // ⚠️ CRITICAL: Avatar source - find friend's index for correct avatar
//   const avatarSrc = isOwnSpace 
//     ? (currentUser?.profile_picture || MY_AVATAR)
//     : (viewedUser?.profile_picture || TOP8_AVATARS[topFriends.findIndex(f => f?.username === username)] || REBEL_AVATARS[0])
//
//   // JSX STRUCTURE:
//   // <div className={`myspace-page theme-${mySpaceData.theme}`}>
//   //   <header className="myspace-header">
//   //     <button className="back-btn" onClick={handleBack}>
//   //       <ChevronLeftIcon size={20} />
//   //       <span>numeneon</span>
//   //     </button>
//   //     <h1 className="myspace-title">{displayUsername}'s space</h1>
//   //     <div className="header-actions">
//   //       {!isOwnSpace && <button className="my-space-btn" onClick={() => navigate('/myspace')}>my space</button>}
//   //       {isOwnSpace && <button className="edit-toggle-btn" onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'done' : 'edit'}</button>}
//   //     </div>
//   //   </header>
//   //
//   //   <main className="myspace-content">
//   //     <ProfileSection avatarSrc={avatarSrc} displayUsername={displayUsername} ... isEditing={isEditing} onUpdateField={updateField} />
//   //     <section className="content-section">
//   //       <MusicPlayer playlist={...} currentTrack={...} ... isEditing={isEditing} onUpdateField={updateField} />
//   //       <Top8Friends topFriends={topFriends} getFriendAvatar={getFriendAvatar} />
//   //       <ThemePicker currentTheme={mySpaceData.theme} onUpdateField={updateField} isVisible={isOwnSpace} />
//   //     </section>
//   //   </main>
//   //
//   //   <footer className="myspace-footer">
//   //     <marquee scrollamount="2">thanks 4 visiting my space -- add me on numeneon -- xoxo</marquee>
//   //   </footer>
//   // </div>
// }
//
// export default MySpace;
