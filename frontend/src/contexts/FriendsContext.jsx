// =============================================================================
// 🟣 CRYSTAL - Friends Lead
// FriendsContext.jsx - Global friends state management
// =============================================================================
//
// TODO: Create a context that manages friends and friend requests
//
// This context tracks who you're friends with and pending requests.
//
// STATE:
// - friends: Array of friend user objects (confirmed friendships)
// - pendingRequests: Array of incoming friend requests waiting for response
// - isLoading: Boolean, true while fetching
// - error: Error message string or null
//
// FUNCTIONS TO PROVIDE:
// - fetchFriends(): Get friends list AND pending requests
// - sendRequest(userId): Send friend request to another user
// - acceptRequest(requestId): Accept incoming friend request
// - declineRequest(requestId): Decline incoming friend request
// - removeFriend(userId): Remove existing friend
//
// FETCH ON AUTH:
// - useEffect that watches AuthContext's user state
// - When user logs in, fetch friends and pending requests
// - When user logs out, clear both arrays
//
// STATE UPDATES:
// - acceptRequest: Add new friend to friends[], remove from pendingRequests[]
// - declineRequest: Remove from pendingRequests[]
// - removeFriend: Remove from friends[]
//
// Think about:
// - Friends list shows confirmed friendships
// - Pending requests are INCOMING (others requesting to be your friend)
// - Outgoing requests (you sent) are not tracked here (could be future feature)
//
// Hint: const { user, isLoading: authLoading } = useAuth();
// Hint: Use Promise.all to fetch friends and pending in parallel
// Hint: Always return { success, error } from async functions
// =============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import friendsService from '@services/friendsService';
import { useAuth } from './AuthContext';

const FriendsContext = createContext(null);

export const FriendsProvider = ({ children }) => {
  const { user, isLoading: authLoading } = useAuth();

  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (authLoading) return;

    if (user) {
      fetchFriends();
    } else {
      setFriends([]);
      setPendingRequests([]);
    }

  }, [user, authLoading]);

  const fetchFriends = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [friendsData, pendingData] = await Promise.all ([
        friendsService.getAll(),
        friendsService.getPendingRequests(),
      ]);
      setFriends(friendsData);
      setPendingRequests(pendingData);

      return { success: true};
    } catch (err) {
      setError('Failed to load friends');
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  const sendRequest = async (userId) => {
    try {
      await friendsService.sendRequest(userId);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const newFriend = await friendsService.acceptRequest(requestId);

      setFriends((prev) => [...prev, newFriend]);
      setPendingRequests((prev) =>
        prev.filter((req) => req.id !== requestId)
      );

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  const declineRequest = async (requestId) => {
    try {
      await friendsService.declineRequest(requestId);

      setPendingRequests((prev) => 
        prev.filter((req) => req.id !== requestId)
      );

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };


  const removeFriend = async (userId) => {
    try {
      await friendsService.remove(userId);

      setFriends((prev) => 
        prev.filter((friend) => friend.id !== userId)
      );

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        pendingRequests,
        isLoading,
        error,
        fetchFriends,
        sendRequest,
        acceptRequest,
        declineRequest,
        removeFriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
  
};

export const useFriends = () => {
  const context = useContext(FriendsContext);


  if(!context) {
    throw new Error (
      'userFriends must be used within a FriendsProvider'
    );
  }
  return context;
};

export default FriendsContext;