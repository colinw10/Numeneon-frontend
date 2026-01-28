# Top8Friends - Friends Grid Component

## Purpose
Displays the user's Top 8 friends in a retro MySpace-style grid. Clicking a friend navigates to their MySpace page.

---

## File Locations
- `frontend/src/components/pages/MySpace/components/Top8Friends/Top8Friends.jsx`
- `frontend/src/components/pages/MySpace/components/Top8Friends/Top8Friends.scss`

---

## Top8Friends.jsx Pseudocode

```javascript
// ============================================
// IMPORTS
// ============================================
// import { useNavigate } from 'react-router-dom'
// import styles: './Top8Friends.scss'

// ============================================
// PROPS INTERFACE
// ============================================
// topFriends      - array of friend objects (max 8)
// getFriendAvatar - function(index), returns avatar URL for slot

// ============================================
// HOOKS
// ============================================
// const navigate = useNavigate()

// ============================================
// JSX STRUCTURE
// ============================================
// <div className="friends-section">
//   <h2 className="section-title">top 8</h2>
//   <div className="top-friends-grid">
//     {[...Array(8)].map((_, index) => {
//       const friend = topFriends[index];
//       return (
//         <div 
//           key={index} 
//           className={`friend-slot ${friend ? 'filled' : 'empty'}`}
//           onClick={() => friend && navigate(`/myspace/${friend.username}`)}
//         >
//           {friend ? (
//             <>
//               <img 
//                 src={friend.profile_picture || getFriendAvatar(index)}
//                 alt={friend.username}
//                 className="friend-avatar"
//               />
//               <span className="friend-name">{friend.username}</span>
//               <span className="friend-rank">{index + 1}</span>
//             </>
//           ) : (
//             <span className="empty-slot">?</span>
//           )}
//         </div>
//       );
//     })}
//   </div>
// </div>

// export default Top8Friends;
```

---

## ⚠️ CRITICAL: Avatar Bug Fix

**DO NOT use `friend.avatar` directly!**

The correct pattern:
```javascript
src={friend.profile_picture || getFriendAvatar(index)}
```

`getFriendAvatar(index)` looks up the avatar from TOP8_AVATARS array in the parent component based on the friend's **position** in the grid, not any property on the friend object.

---

## Always Render 8 Slots

Even if user has fewer friends, always render 8 slots:
```javascript
{[...Array(8)].map((_, index) => {
  const friend = topFriends[index]; // undefined for empty slots
  ...
})}
```

---

## Lines: ~45
