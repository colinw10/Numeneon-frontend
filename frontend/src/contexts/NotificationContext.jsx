import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useWebSocket } from './WebSocketContext';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const { subscribe } = useWebSocket();
  const [notifications, setNotifications] = useState([]);
  
  // Load notifications from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse notifications', e);
      }
    }
  }, []);
  
  // Save to local storage when changed
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Define addNotification BEFORE it's used in the WebSocket effect
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  // Subscribe to WebSocket events
  useEffect(() => {
    if (!user) return;

    // Listen for new posts from friends
    const handleNewPost = (data) => {
      console.log('🔔 New post notification:', data);
      addNotification({
        id: Date.now(),
        type: 'post',
        read: false,
        created_at: new Date().toISOString(),
        ...data
      });
    };

    // Listen for wall posts (when someone posts on your wall)
    const handleWallPost = (data) => {
      console.log('🔔 Wall post notification:', data);
      addNotification({
        id: Date.now(),
        type: 'wall_post',
        read: false,
        created_at: new Date().toISOString(),
        message: data.message || `${data.author?.username || 'Someone'} posted on your wall`,
        post: data.post,
        author: data.author,
        ...data
      });
    };

    // Listen for post comments (when someone comments on your post)
    const handlePostComment = (data) => {
      console.log('🔔 Post comment notification:', data);
      addNotification({
        id: Date.now(),
        type: 'post_comment',
        read: false,
        created_at: new Date().toISOString(),
        message: data.message || `${data.commenter?.first_name || data.commenter?.username || 'Someone'} commented on your post`,
        post: data.post,
        comment: data.comment,
        commenter: data.commenter,
        ...data
      });
    };

    // Listen for comment replies (when someone replies to your comment with @mention)
    const handleCommentReply = (data) => {
      console.log('🔔 Comment reply notification:', data);
      addNotification({
        id: Date.now(),
        type: 'comment_reply',
        read: false,
        created_at: new Date().toISOString(),
        message: data.message || `${data.replier?.first_name || data.replier?.username || 'Someone'} replied to your comment`,
        post: data.post,
        comment: data.comment,
        reply: data.reply,
        replier: data.replier,
        mentioned_username: data.mentioned_username,
        ...data
      });
    };

    // Listen for friend request accepted (when someone accepts your friend request)
    const handleFriendAccepted = (data) => {
      console.log('🔔 Friend accepted notification:', data);
      addNotification({
        id: Date.now(),
        type: 'friend_accepted',
        read: false,
        created_at: new Date().toISOString(),
        message: data.message || `${data.friend?.first_name || data.friend?.username || 'Someone'} accepted your friend request`,
        friend: data.friend,
        ...data
      });
    };

    const unsubscribePost = subscribe('new_post_notification', handleNewPost);
    const unsubscribeNewPost = subscribe('new_post', handleNewPost);
    const unsubscribeWallPost = subscribe('wall_post', handleWallPost);
    const unsubscribePostComment = subscribe('post_comment', handlePostComment);
    const unsubscribeCommentReply = subscribe('comment_reply', handleCommentReply);
    const unsubscribeFriendAccepted = subscribe('friend_accepted', handleFriendAccepted);

    return () => {
      unsubscribePost();
      unsubscribeNewPost();
      unsubscribeWallPost();
      unsubscribePostComment();
      unsubscribeCommentReply();
      unsubscribeFriendAccepted();
    };
  }, [user, subscribe, addNotification]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      clearNotifications 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
