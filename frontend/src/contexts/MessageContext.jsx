// 🔵 PABLO - UI Architect
// MessageContext.jsx - Shared state for messaging system (API-connected)
//
// UPDATED WITH WEBSOCKETS 
// Now receives real-time message notifications instead of polling

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useWebSocket } from "./WebSocketContext";
import messagesService from "@services/messagesService";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const { subscribe } = useWebSocket();

  // Modal visibility
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Conversations list from API
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Currently selected conversation
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  
  // NEW: Store user info for new conversations (before any messages exist)
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);

  // NEW: Notification state for new messages
  const [newMessageNotification, setNewMessageNotification] = useState(null);

  // Fetch conversations when user logs in, clear on logout
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchConversations();
    } else {
      setConversations([]);
      setSelectedUserId(null);
      setSelectedMessages([]);
    }
  }, [isAuthenticated, user]);

  // ✨ WEBSOCKET: Listen for new message events
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribe('new_message', (data) => {
      console.log('📩 New message from:', data.sender.username);
      
      const senderId = data.sender.id;

      // If this is the currently open conversation, add message immediately
      if (selectedUserId === senderId) {
        setSelectedMessages(prev => [...prev, {
          id: data.id,
          sender: data.sender,
          content: data.content,
          created_at: data.created_at,
          is_read: false,
        }]);
      }

      // Refresh conversations to update last_message and unread count
      fetchConversations();

      // Show notification (unless it's the currently open conversation)
      if (selectedUserId !== senderId) {
        setNewMessageNotification({
          senderId: senderId,
          senderUsername: data.sender.username,
          content: data.content,
        });

        // Clear notification after 5 seconds
        setTimeout(() => {
          setNewMessageNotification(null);
        }, 5000);
      }
    });

    return unsubscribe;
  }, [user, subscribe, selectedUserId]);

  // GET /api/messages/conversations/ - Load all conversations
  const fetchConversations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await messagesService.getConversations();
      setConversations(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch conversations");
      console.error("Failed to fetch conversations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // GET /api/messages/conversation/?user_id=X - Load messages for one conversation
  const fetchConversation = async (userId) => {
    try {
      const messages = await messagesService.getConversation(userId);
      setSelectedMessages(messages);
      setSelectedUserId(userId);
    } catch (err) {
      console.error("Failed to fetch conversation:", err);
    }
  };

  // Open the messages modal
  const openMessages = async (targetUser = null) => {
    if (targetUser) {
      // SET USER INFO FIRST - before opening modal!
      // This ensures the header shows immediately
      const userInfo = {
        id: targetUser.id,
        username: targetUser.username,
        first_name: targetUser.first_name,
        last_name: targetUser.last_name,
        displayName: targetUser.displayName || targetUser.display_name || 
          (targetUser.first_name && targetUser.last_name 
            ? `${targetUser.first_name} ${targetUser.last_name}` 
            : targetUser.username),
      };
      
      console.log('📬 Opening messages with user:', userInfo);
      
      // Set ALL user state BEFORE opening modal
      setSelectedUserInfo(userInfo);
      setSelectedUserId(targetUser.id);
      setSelectedMessages([]);
      
      // NOW open the modal - user info is already set
      setIsMessageModalOpen(true);
      
      // Try to fetch existing messages (may return empty for new conversations)
      try {
        const messages = await messagesService.getConversation(targetUser.id);
        setSelectedMessages(messages || []);
      } catch (err) {
        // No existing conversation - that's fine, we'll start fresh
        setSelectedMessages([]);
      }
    } else {
      // No target user - just open modal
      setIsMessageModalOpen(true);
      
      if (conversations.length > 0 && !selectedUserId) {
        await fetchConversation(conversations[0].user.id);
      }
    }
  };

  const closeMessages = () => {
    setIsMessageModalOpen(false);
  };

  // Select a conversation and mark as read
  const selectConversation = async (userId, userObj = null) => {
    // If userObj provided, set it immediately for header display
    if (userObj) {
      setSelectedUserInfo({
        id: userObj.id,
        username: userObj.username,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        displayName: userObj.displayName || userObj.display_name ||
          (userObj.first_name && userObj.last_name 
            ? `${userObj.first_name} ${userObj.last_name}` 
            : userObj.username),
      });
    } else {
      // Try to find user info from conversations list
      const conv = conversations.find(c => c.user?.id === userId);
      if (conv?.user) {
        setSelectedUserInfo({
          id: conv.user.id,
          username: conv.user.username,
          first_name: conv.user.first_name,
          last_name: conv.user.last_name,
          displayName: conv.user.displayName || 
            (conv.user.first_name && conv.user.last_name 
              ? `${conv.user.first_name} ${conv.user.last_name}` 
              : conv.user.username),
        });
      }
    }
    
    await fetchConversation(userId);
    try {
      await messagesService.markAllAsRead(userId);
      fetchConversations();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // POST /api/messages/ - Send a message
  const sendMessage = async (text) => {
    if (!text.trim() || !selectedUserId) return { success: false };

    try {
      const newMessage = await messagesService.sendMessage(
        selectedUserId,
        text.trim()
      );

      // Optimistically add to local state
      setSelectedMessages((prev) => [...prev, newMessage]);

      // Refresh conversations to update last_message preview
      fetchConversations();

      return { success: true };
    } catch (err) {
      console.error("Failed to send message:", err);
      return {
        success: false,
        error: err.response?.data?.detail || "Failed to send",
      };
    }
  };

  // Find the conversation object for the currently selected user
  const getSelectedConversation = () => {
    // First check if there's an existing conversation
    const existing = conversations.find((c) => c.user.id === selectedUserId);
    if (existing) return existing;
    
    // If no existing conversation but we have user info, create a fake conversation object
    // This allows the UI to display properly for new conversations
    if (selectedUserId && selectedUserInfo) {
      return {
        user: selectedUserInfo,
        messages: selectedMessages,
        last_message: null,
      };
    }
    return null;
  };

  // Helper: Build display name from user object
  const getDisplayName = (userObj) => {
    if (!userObj) return "Unknown";
    if (userObj.first_name && userObj.last_name) {
      return `${userObj.first_name} ${userObj.last_name}`;
    }
    return userObj.username;
  };

  // Helper: Get initials for avatar display
  const getInitials = (userObj) => {
    if (!userObj) return "??";
    if (userObj.first_name && userObj.last_name) {
      return `${userObj.first_name[0]}${userObj.last_name[0]}`.toUpperCase();
    }
    return userObj.username.slice(0, 2).toUpperCase();
  };

  return (
    <MessageContext.Provider
      value={{
        // State
        isMessageModalOpen,
        isLoading,
        error,
        conversations,
        selectedUserId,
        selectedMessages,
        selectedConversation: getSelectedConversation(),
        newMessageNotification,

        // Actions
        openMessages,
        closeMessages,
        selectConversation,
        sendMessage,
        fetchConversations,

        // Helpers
        getDisplayName,
        getInitials,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
}