# Messaging System Fixes

## Problem Summary

- Messages weren't sending (wrong field name)
- WebSocket connected to `localhost` in production
- Chat header username hidden by CSS
- `markAllAsRead` returning 405 error

---

## Fix 1: Message Not Sending

### Root Cause

Typo in field name: `recieverId` instead of `receiver_id`

### File

`frontend/src/services/messagesService.js`

### Before

```javascript
sendMessage: async (recieverId, content) => {
  const response = await apiClient.post("/messages/", {
    recieverId, // ❌ Wrong field name
    content,
  });
  return response.data;
};
```

### After

```javascript
sendMessage: async (receiverId, content) => {
  const response = await apiClient.post("/messages/", {
    receiver_id: receiverId, // ✅ Matches backend expectation
    content,
  });
  return response.data;
};
```

---

## Fix 2: WebSocket Production URL

### Root Cause

WebSocket was trying to connect to `localhost:8000` even on deployed site

### File

`frontend/src/contexts/WebSocketContext.jsx`

### Before

```javascript
const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const host = window.location.host; // ❌ Uses frontend host, not backend
```

### After

```javascript
const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const host =
  window.location.hostname === "localhost"
    ? "localhost:8000"
    : "numeneon-backend.onrender.com"; // ✅ Hardcoded backend host for production
```

---

## Fix 3: markAllAsRead 405 Error

### Root Cause

Frontend used `PATCH` but backend expects `POST`

### File

`frontend/src/services/messagesService.js`

### Before

```javascript
markAllAsRead: async (userId) => {
  const response = await apiClient.patch(
    // ❌ Wrong method
    `/messages/read_all/?user_id=${userId}`,
  );
  return response.data;
};
```

### After

```javascript
markAllAsRead: async (userId) => {
  const response = await apiClient.post(
    // ✅ Correct method
    `/messages/read_all/?user_id=${userId}`,
  );
  return response.data;
};
```

### Why POST not PATCH?

- `PATCH` = partial update of ONE resource
- `POST` = create something OR trigger an action
- `read_all` is a bulk ACTION on multiple messages, not a partial update

---

## Fix 4: Username Shows Immediately

### Root Cause

Modal opened BEFORE user info was set in state

### File

`frontend/src/contexts/MessageContext.jsx`

### Before

```javascript
const openMessages = async (targetUser = null) => {
  setIsMessageModalOpen(true); // ❌ Opens first
  if (targetUser) {
    setSelectedUserInfo(userInfo); // Set after - header shows "Unknown"
    // ...
  }
};
```

### After

```javascript
const openMessages = async (targetUser = null) => {
  if (targetUser) {
    setSelectedUserInfo(userInfo);
    setSelectedUserId(targetUser.id);
    setSelectedMessages([]);
    setIsMessageModalOpen(true); // ✅ Opens AFTER user info is set
    // ...
  } else {
    setIsMessageModalOpen(true);
  }
};
```

---

## HTTP Methods Reference

| Action            | Method  | Endpoint                           | Why                                 |
| ----------------- | ------- | ---------------------------------- | ----------------------------------- |
| Send message      | `POST`  | `/api/messages/`                   | Creating new resource               |
| Get conversations | `GET`   | `/api/messages/conversations/`     | Reading data                        |
| Get conversation  | `GET`   | `/api/messages/conversation/{id}/` | Reading data                        |
| Mark one as read  | `PATCH` | `/api/messages/{id}/read/`         | Partial update of one message       |
| Mark all as read  | `POST`  | `/api/messages/read_all/`          | Bulk action (not a resource update) |
