# WebSockets - Real-Time Notifications (Stretch Goal)

## Current State
We use **polling** - the frontend asks the server "any updates?" every 30 seconds. This works but has a delay.

## What Are WebSockets?

Traditional HTTP is like **sending letters**:
- Client sends request → Server responds → Connection closes
- Client has to keep asking "anything new?" (polling)

WebSockets are like **a phone call**:
- Client and server establish a persistent connection
- Either side can send messages instantly
- No waiting, no repeated asking

### Visual Comparison

```
POLLING (Current):
Client: "Any friend requests?" ────→ Server: "Nope"
         ... 30 seconds later ...
Client: "Any friend requests?" ────→ Server: "Nope"  
         ... 30 seconds later ...
Client: "Any friend requests?" ────→ Server: "Yes! Maria accepted!"
         (User waited up to 30 seconds to find out)

WEBSOCKETS (Stretch Goal):
Client ←─────── persistent connection ───────→ Server
         ... Maria accepts request ...
Server: "Hey! Maria accepted!" ────→ Client (INSTANT!)
```

## Why WebSockets Are Better

| Feature | Polling | WebSockets |
|---------|---------|------------|
| Speed | 0-30 second delay | Instant |
| Server load | Many unnecessary requests | Only when needed |
| Battery/data | Wasteful on mobile | Efficient |
| User experience | "Why isn't it updating?" | "Wow, that was fast!" |

## Use Cases for NUMENEON

1. **Friend request accepted** - Toast appears instantly
2. **New friend request received** - Badge updates immediately  
3. **New message received** - Real-time chat
4. **Post likes/comments** - Live engagement updates

## Backend Requirements (Django Channels)

### 1. Install Dependencies
```bash
pip install channels channels-redis
```

### 2. Update settings.py
```python
INSTALLED_APPS = [
    # ... existing apps
    'channels',
]

ASGI_APPLICATION = 'huddl.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
    },
}
```

### 3. Create WebSocket Consumer
```python
# friends/consumers.py
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class FriendsConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_name = f'user_{self.user.id}'
        
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        await self.accept()
    
    async def friend_request_accepted(self, event):
        # Send to WebSocket
        await self.send_json({
            'type': 'friend_accepted',
            'from_user': event['from_user'],
        })
```

### 4. Emit Event When Request Accepted
```python
# In friends/views.py accept_request endpoint
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def accept_friend_request(request, request_id):
    # ... existing accept logic ...
    
    # Notify the original sender via WebSocket
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'user_{friend_request.from_user.id}',
        {
            'type': 'friend_request_accepted',
            'from_user': {
                'id': request.user.id,
                'username': request.user.username,
            }
        }
    )
```

## Frontend Implementation (Once Backend Ready)

```jsx
// contexts/FriendsContext.jsx
useEffect(() => {
  if (!user) return;
  
  const ws = new WebSocket(`wss://api.numeneon.com/ws/friends/`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'friend_accepted') {
      // Show toast notification
      showFriendAcceptedToast(data.from_user.username);
      // Refresh friends list
      fetchFriends();
    }
    
    if (data.type === 'friend_request') {
      // Update pending requests
      fetchFriends();
    }
  };
  
  return () => ws.close();
}, [user]);
```

## Priority

**LOW** - Polling works fine for MVP. Implement WebSockets when:
- User base grows (polling becomes expensive)
- Real-time features become critical (chat)
- Team has time for backend infrastructure work

## Resources

- [Django Channels Documentation](https://channels.readthedocs.io/)
- [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Redis for Django Channels](https://channels.readthedocs.io/en/stable/topics/channel_layers.html)
