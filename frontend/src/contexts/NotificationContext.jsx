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

    const unsubscribePost = subscribe('new_post_notification', handleNewPost);
    const unsubscribeNewPost = subscribe('new_post', handleNewPost);
    const unsubscribeWallPost = subscribe('wall_post', handleWallPost);

    return () => {
      unsubscribePost();
      unsubscribeNewPost();
      unsubscribeWallPost();
    };
  }, [user, subscribe]);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

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
