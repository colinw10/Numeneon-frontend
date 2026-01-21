// =============================================================================
// 🟣 CRYSTAL - Friends Lead
// Friends.jsx - Friends list and requests page
// =============================================================================


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriends, useMessages } from '@contexts';
import DeleteConfirmModal from '@Home/components/DeleteConfirmModal/DeleteConfirmModal';
import { MessageBubbleIcon, UnlinkIcon, PlusIcon } from '@assets/icons';
import './Friends.scss';

const getColorVariant = (id) => {
  const variants = ["pink", "blue", "purple", "green"];
  return variants[id % variants.length];
};

const getInitials = (first, last, username) => {
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
  return username.slice(0, 2).toUpperCase();
};

const getDisplayName = (friend) => {
  if (friend.first_name) {
    return `${friend.first_name} ${friend.last_name || ""}`;
  }
  return friend.username;
};

/* ================== COMPONENT ================== */

function Friends() {
  const [activeTab, setActiveTab] = useState("all");
  const [friendToRemove, setFriendToRemove] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const navigate = useNavigate();
  const {
    friends,
    pendingRequests,
    isLoading,
    error,
    acceptRequest,
    declineRequest,
    removeFriend,
  } = useFriends();

  const { openMessages } = useMessages();

  /* ================== MOCK SUGGESTIONS ================== */

  const suggestions = [
    { id: 99, username: "nova" },
    { id: 98, username: "zenith" },
    { id: 97, username: "pixel" },
  ];

  /* ================== HANDLERS ================== */

  const handleFriendClick = (friend) => {
    navigate(`/profile/${friend.username}`);
  };

  const handleMessageFriend = (friend, e) => {
    e.stopPropagation();
    openMessages(friend);
  };

  const handleRemoveClick = (friend, e) => {
    e.stopPropagation();
    setFriendToRemove(friend);
  };

  const handleConfirmRemove = async () => {
    if (!friendToRemove) return;

    setIsRemoving(true);
    await removeFriend(friendToRemove.id);
    setIsRemoving(false);
    setFriendToRemove(null);
  };

  const handleAccept = async (id) => {
    await acceptRequest(id);
  };

  const handleDecline = async (id) => {
    await declineRequest(id);
  };

  /* ================== RENDER ================== */

  return (
    <div className="friends-page">

      {/* HEADER */}
      <div className="friends-header">
        <h1 className="friends-title">Friends</h1>

        <div className="friends-stats">
          <div className="stat-item">
            <span className="stat-value">{friends.length}</span>
            <span className="stat-label">connected</span>
          </div>

          <div className="stat-dot" />

          <div className="stat-item">
            <span className="stat-value">
              {pendingRequests.length}
            </span>
            <span className="stat-label">pending</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="friends-tabs">
        <button
          className={`tab-btn ${
            activeTab === "all" ? "active" : ""
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Friends
        </button>

        <button
          className={`tab-btn ${
            activeTab === "requests" ? "active" : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>

        <button
          className={`tab-btn ${
            activeTab === "suggestions" ? "active" : ""
          }`}
          onClick={() => setActiveTab("suggestions")}
        >
          Suggestions
        </button>
      </div>

      {/* CONTENT */}
      <div className="friends-content">

        {/* LOADING */}
        {isLoading && <p className="empty-state">Loading...</p>}

        {error && (
          <p className="empty-state error">{error}</p>
        )}

        {/* ALL FRIENDS */}
        {activeTab === "all" && (
          <div className="friends-grid">
            {friends.length === 0 && (
              <p className="empty-state">
                No friends yet 
              </p>
            )}

            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`friend-card card-${getColorVariant(
                  friend.id
                )}`}
                onClick={() =>
                  handleFriendClick(friend)
                }
              >
                <span className="scan-line" />

                <div className="friend-avatar">
                  <span>
                    {getInitials(
                      friend.first_name,
                      friend.last_name,
                      friend.username
                    )}
                  </span>
                  <span className="status-dot online" />
                </div>

                <div className="friend-info">
                  <h3 className="friend-name">
                    {getDisplayName(friend)}
                  </h3>
                  <p className="friend-username">
                    @{friend.username}
                  </p>
                  <p className="friend-mutual">
                    2 mutual friends
                  </p>
                </div>

                <button
                  className="friend-action-btn"
                  onClick={(e) =>
                    handleMessageFriend(friend, e)
                  }
                >
                  <MessageBubbleIcon />
                </button>

                <button
                  className="friend-remove-btn"
                  onClick={(e) =>
                    handleRemoveClick(friend, e)
                  }
                >
                  <UnlinkIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* REQUESTS */}
        {activeTab === "requests" && (
          <div className="friends-grid">
            {pendingRequests.length === 0 && (
              <p className="empty-state">
                No pending requests ✨
              </p>
            )}

            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="friend-card"
              >
                <span className="scan-line" />

                <div className="friend-info">
                  <h3 className="friend-name">
                    {req.from_user.username}
                  </h3>
                </div>

                <div className="request-actions">
                  <button
                    className="btn-accept"
                    onClick={() =>
                      handleAccept(req.id)
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="btn-decline"
                    onClick={() =>
                      handleDecline(req.id)
                    }
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SUGGESTIONS */}
        {activeTab === "suggestions" && (
          <div className="friends-grid">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className="friend-card"
              >
                <span className="scan-line" />

                <div className="friend-info">
                  <h3 className="friend-name">
                    {user.username}
                  </h3>
                </div>

                <button className="btn-add-friend">
                  <PlusIcon /> Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CONFIRM MODAL */}
      {friendToRemove && (
        <DeleteConfirmModal
          isOpen={true}
          title="Remove Friend"
          message={`Remove ${friendToRemove.username}?`}
          onCancel={() =>
            setFriendToRemove(null)
          }
          onConfirm={handleConfirmRemove}
          isLoading={isRemoving}
        />
      )}
    </div>
  );
}

export default Friends;