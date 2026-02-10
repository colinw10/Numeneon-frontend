# PWA Badge Notifications

## Overview

The app icon displays a badge with the unread notification count when installed as a PWA. This provides users with at-a-glance visibility of pending notifications without opening the app.

## Implementation

### Frontend (Complete)

**NotificationContext.jsx** - Auto-updates badge based on unread count:

```javascript
useEffect(() => {
  if ("setAppBadge" in navigator) {
    if (unreadCount > 0) {
      navigator.setAppBadge(unreadCount);
    } else {
      navigator.clearAppBadge();
    }
  }
}, [unreadCount]);
```

**sw.js (Service Worker)** - Handles push notifications and badge updates:

- Listens for push events from server
- Updates badge count from push data
- Accepts messages from main app to sync badge

### Backend (Stretch Goal)

For notifications when app is **completely closed**, backend needs:

1. **Generate VAPID keys** (one-time)

   ```bash
   npx web-push generate-vapid-keys
   ```

2. **Store push subscriptions** - New endpoint to save browser subscription

   ```
   POST /api/push-subscriptions/
   Body: { endpoint, keys: { p256dh, auth } }
   ```

3. **Send push notifications** - When events occur, use Web Push API
   ```python
   from pywebpush import webpush
   webpush(subscription_info, data, vapid_private_key, vapid_claims)
   ```

## Browser Support

| Platform              | Badge Support    |
| --------------------- | ---------------- |
| Android (Chrome/Edge) | ✅ Full          |
| Windows (Chrome/Edge) | ✅ Full          |
| macOS (Chrome/Edge)   | ✅ Full          |
| iOS Safari            | ❌ Not supported |

## Requirements

1. App must be **installed as a PWA** (Add to Home Screen)
2. For push notifications: User must grant notification permission

## Files Modified

- `src/contexts/NotificationContext.jsx` - Badge API integration
- `public/sw.js` - Push notification handling

## Testing

1. Install app as PWA (browser menu → "Install app")
2. Trigger a notification (receive a message, friend request, etc.)
3. Badge should appear on app icon with count
4. Mark notifications as read → badge clears

## API Reference

```javascript
// Set badge with count
navigator.setAppBadge(5);

// Set badge without count (dot indicator)
navigator.setAppBadge();

// Clear badge
navigator.clearAppBadge();

// Request notification permission (for push)
const permission = await Notification.requestPermission();
```
