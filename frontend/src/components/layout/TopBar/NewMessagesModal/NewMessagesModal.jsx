// 🔵 PABLO - UI Architect
// NewMessagesModal.jsx - Dropdown showing unread messages (like friend requests modal)

import { useEffect } from 'react';
import { useMessages } from '@contexts/MessageContext';
import './NewMessagesModal.scss';

// Helper: Format relative time
const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'now';
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

// Helper: Get initials
const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name.slice(0, 2).toUpperCase();
};

function NewMessagesModal({ isOpen, onClose }) {
  const { conversations, selectConversation, openMessages } = useMessages();

  // Filter to only unread conversations
  const unreadConversations = conversations.filter(conv => conv.unread_count > 0);

  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && onClose();
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConversationClick = (conv) => {
    selectConversation(conv.user?.id, conv.user);
    onClose();
    openMessages();
  };

  const handleViewAll = () => {
    onClose();
    openMessages();
  };

  return (
    <div className="new-messages-overlay" onClick={onClose}>
      <div className="new-messages-dropdown" onClick={(e) => e.stopPropagation()}>
        
        <div className="new-messages-header">
          <span>New Messages</span>
          <button className="new-messages-close" onClick={onClose}>✕</button>
        </div>

        <div className="new-messages-list">
          {unreadConversations.length === 0 ? (
            <p className="new-messages-empty">No new messages</p>
          ) : (
            unreadConversations.map((conv) => {
              const displayName = conv.user?.displayName || 
                `${conv.user?.first_name || ''} ${conv.user?.last_name || ''}`.trim() || 
                conv.user?.username || 'Unknown';
              const lastMessage = conv.last_message;
              const messagePreview = lastMessage?.content || 'New message';

              return (
                <div 
                  key={conv.id || conv.user?.id}
                  className="new-message-item"
                  onClick={() => handleConversationClick(conv)}
                >
                  <div className="new-message-avatar">
                    <span className="initial-1">{getInitials(displayName)[0]}</span>
                    {getInitials(displayName).length > 1 && (
                      <span className="initial-2">{getInitials(displayName)[1]}</span>
                    )}
                  </div>
                  <div className="new-message-content">
                    <div className="new-message-header-row">
                      <span className="new-message-name">{displayName}</span>
                      <span className="new-message-time">
                        {formatRelativeTime(lastMessage?.created_at)}
                      </span>
                    </div>
                    <p className="new-message-preview">
                      {messagePreview.substring(0, 40) + (messagePreview.length > 40 ? '...' : '')}
                    </p>
                  </div>
                  <span className="new-message-badge">{conv.unread_count}</span>
                </div>
              );
            })
          )}
        </div>

        {unreadConversations.length > 0 && (
          <button className="new-messages-viewall" onClick={handleViewAll}>
            View All Messages
          </button>
        )}
      </div>
    </div>
  );
}

export default NewMessagesModal;
