// ============================================
// Top8Friends.jsx - Friends Grid Component
// ============================================
// 
// PURPOSE: Displays Top 8 friends in a grid.
// Clicking a friend navigates to their MySpace.
//
// IMPORTS: useNavigate from 'react-router-dom'
// IMPORT: './Top8Friends.scss'
//
// ============================================
// PROPS
// ============================================
// topFriends - array of friend objects (max 8)
// getFriendAvatar - function(index) returns avatar URL

// ============================================
// JSX STRUCTURE
// ============================================
// const navigate = useNavigate();
//
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
//
// ⚠️ CRITICAL: Use getFriendAvatar(index) NOT friend.avatar!
//
// export default Top8Friends;
