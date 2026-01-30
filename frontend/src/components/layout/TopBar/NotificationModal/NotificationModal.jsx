// 🔵 PABLO - UI Architect
// NotificationModal.jsx - Minimal notification dropdown

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends, useNotifications } from '@contexts';
import './NotificationModal.scss';

function NotificationModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { pendingRequests, acceptRequest, declineRequest } = useFriends();
  const { notifications, markAsRead, clearNotifications } = useNotifications();

  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && onClose();
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAccept = async (requestId) => {
    await acceptRequest(requestId);
    onClose();
    navigate('/home');
  };

  const handleDecline = async (requestId) => {
    await declineRequest(requestId);
  };

  return (
    <div className="notif-overlay" onClick={onClose}>
      <div className="notif-dropdown" onClick={(e) => e.stopPropagation()}>
        
        <div className="notif-header">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <button className="notif-clear-all" onClick={clearNotifications} style={{ marginLeft: 'auto', marginRight: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '12px' }}>
              Clear
            </button>
          )}
          <button className="notif-close" onClick={onClose}>✕</button>
        </div>

        <div className="notif-list">
          {pendingRequests.length === 0 && notifications.length === 0 ? (
            <p className="notif-empty">No notifications</p>
          ) : (
            <>
            {pendingRequests.map((req) => (
              <div key={req.id} className="notif-item">
                <p className="notif-text">
                  <span 
                    className="notif-name" 
                    onClick={() => { navigate(`/profile/${req.from_user.username}`); onClose(); }}
                  >
                    {req.from_user.username}
                  </span>
                  {' '}wants to be friends
                </p>
                <div className="notif-actions">
                  <button className="notif-accept" onClick={() => handleAccept(req.id)}>✓</button>
                  <button className="notif-decline" onClick={() => handleDecline(req.id)}>✕</button>
                </div>
              </div>
            ))}
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`notif-item notif-clickable ${!notif.read ? 'notif-unread' : ''}`}
                onClick={() => {
                  markAsRead(notif.id);
                  // Navigate based on notification type
                  if (notif.type === 'wall_post') {
                    // Wall posts - go to the user's own profile to see the post
                    navigate(`/profile`);
                  } else if (notif.author?.username) {
                    navigate(`/profile/${notif.author.username}`);
                  }
                  onClose();
                }}
              >
                 <div className="notif-content">
                    <p className="notif-text">
                      <span className="notif-name">{notif.author?.username || 'Someone'}</span>
                      {' '}{notif.type === 'wall_post' ? 'posted on your wall' : (notif.message || 'posted something')}
                    </p>
                    <span className="notif-time">
                      {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                 </div>
              </div>
            ))}
            </>
          )}
        </div>

        {pendingRequests.length > 0 && (
          <button className="notif-viewall" onClick={() => { navigate('/friends'); onClose(); }}>
            View All
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationModal;