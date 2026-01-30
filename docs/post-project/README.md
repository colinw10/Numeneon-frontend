# Post-Project Documentation

This folder contains all bug fixes, improvements, and features added after the main project build.

## Contents

| File | Description |
|------|-------------|
| [messaging-fixes.md](messaging-fixes.md) | All messaging system fixes |
| [wall-posting.md](wall-posting.md) | Wall posting feature (post on friend's profile) |
| [chat-header-bulletproof.md](chat-header-bulletproof.md) | Chat header visibility fixes |
| [backend-requirements.md](backend-requirements.md) | What the backend needs for features to work |

---

## Quick Reference

### Issues Fixed
1. ✅ Messages not sending (`receiver_id` typo)
2. ✅ WebSocket not connecting in production
3. ✅ Chat header hidden/disappearing
4. ✅ Wall posts not persisting (backend fix)
5. ✅ `markAllAsRead` using wrong HTTP method (PATCH → POST)
6. ✅ Username not showing immediately when opening chat

### Features Added
1. ✅ Wall posting on friend profiles
2. ✅ Empty timeline categories auto-hide
3. ✅ Notification context for post notifications (frontend ready, needs backend WebSocket events)
