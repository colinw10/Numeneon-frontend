# Chat Header - Bulletproof CSS

The chat header kept disappearing or getting covered. Here's how we made it bulletproof.

---

## The Problem

The chat header (showing username) would:

1. Get pushed off screen by flexbox
2. Be covered by the composer
3. Not show immediately when opening chat

---

## The Solution

### Base Styles (Desktop)

`frontend/src/components/layout/TopBar/MessageModal/styles/_chat.scss`

```scss
.chat-header {
  /* REQUIRED: Fixed dimensions - never shrink */
  height: 56px !important;
  min-height: 56px !important;
  max-height: 56px !important;

  /* REQUIRED: Prevent flexbox from messing with it */
  flex-shrink: 0 !important;
  flex-grow: 0 !important;
  flex-basis: 56px !important;

  /* REQUIRED: Always on top */
  position: sticky;
  top: 0;
  z-index: 100;

  /* Styling */
  padding: 0 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);

  /* Layout */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Force visibility */
  visibility: visible !important;
  opacity: 1 !important;
}

.chat-username {
  font-family: var(--font-title);
  font-weight: 600;
  font-size: 18px;
  color: #4fffff !important;

  /* Force visibility */
  visibility: visible !important;
  opacity: 1 !important;
  display: inline-block !important;

  /* Fallback if empty */
  &:empty::after {
    content: "Loading...";
    color: rgba(79, 255, 255, 0.5);
  }
}
```

### Mobile Styles (768px and below)

`frontend/src/components/layout/TopBar/MessageModal/styles/_responsive.scss`

```scss
@media (max-width: 768px) {
  .chat-header {
    height: 56px !important;
    min-height: 56px !important;
    max-height: 56px !important;
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 100 !important;
    padding: 0 3.5rem !important; /* Room for back/close buttons */
    visibility: visible !important;
    opacity: 1 !important;
    display: flex !important;
  }

  .chat-username {
    font-size: 16px !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
}

@media (max-width: 414px) {
  .chat-header {
    height: 50px !important;
    min-height: 50px !important;
    max-height: 50px !important;
    padding: 0 3rem !important;
  }

  .chat-username {
    font-size: 14px !important;
    max-width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
```

---

## Why !important?

Normally `!important` is bad practice. Here it's justified because:

1. This is a **critical UI element** that MUST be visible
2. Other styles were overriding it unexpectedly
3. We need to guarantee it works across all breakpoints

---

## Username Display Logic

`frontend/src/components/layout/TopBar/MessageModal/MessageModal.jsx`

```javascript
// BULLETPROOF: Get display name - try EVERY possible source
const user = selectedConversation.user || {};
const chatDisplayName =
  user.displayName || // Direct displayName
  user.display_name || // Snake case variant
  (user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`.trim()
    : null) || // Full name
  user.first_name || // Just first name
  user.username || // Username fallback
  "Unknown User"; // Ultimate fallback

console.log("📛 Chat header display name:", chatDisplayName);
```

---

## Timing Fix

Username must be set BEFORE modal opens:

```javascript
// MessageContext.jsx
const openMessages = async (targetUser = null) => {
  if (targetUser) {
    // SET USER INFO FIRST
    setSelectedUserInfo(userInfo);
    setSelectedUserId(targetUser.id);
    setSelectedMessages([]);

    // THEN open modal
    setIsMessageModalOpen(true);
  }
};
```

---

## Debugging

If header still doesn't show, check DevTools console for:

```
📛 Chat header display name: [name] | User object: {...}
```

If `User object` is empty `{}`, the issue is in how `openMessages` is being called.
