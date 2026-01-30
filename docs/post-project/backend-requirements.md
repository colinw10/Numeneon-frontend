# Backend Requirements

What the Django backend needs for frontend features to work.

---

## 1. Messages - Required Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/messages/conversations/` | List all conversations |
| `GET` | `/api/messages/conversation/{user_id}/` | Get messages with specific user |
| `POST` | `/api/messages/` | Send a message |
| `POST` | `/api/messages/read_all/?user_id=X` | Mark all messages from user as read |

### Send Message Request Body
```json
{
  "receiver_id": 5,
  "content": "Hello!"
}
```

### Conversations Response
```json
[
  {
    "user": { "id": 5, "username": "crystal", "first_name": "Crystal" },
    "last_message": { "content": "Hey!", "created_at": "..." },
    "unread_count": 2
  }
]
```

---

## 2. Posts - Wall Posting

### Model Field Required
```python
class Post(models.Model):
    # ... existing fields ...
    target_profile = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='wall_posts',
        null=True, 
        blank=True
    )
```

### Serializer
```python
class PostSerializer(serializers.ModelSerializer):
    target_profile_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='target_profile',
        required=False,
        allow_null=True
    )
    target_profile = UserSerializer(read_only=True)
```

### Migration
```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 3. WebSocket - Real-time Notifications

### Connection URL
```
wss://numeneon-backend.onrender.com/ws/notifications/?token=JWT_TOKEN
```

### Event Types Expected by Frontend

#### New Message
```json
{
  "type": "new_message",
  "data": {
    "id": 123,
    "sender": { "id": 5, "username": "crystal" },
    "content": "Hey!",
    "created_at": "2026-01-30T12:00:00Z"
  }
}
```

#### Friend Request
```json
{
  "type": "friend_request",
  "data": {
    "request_id": 456,
    "from_user": { "id": 5, "username": "crystal" }
  }
}
```

#### Friend Accepted
```json
{
  "type": "friend_accepted",
  "data": {
    "friend": { "id": 5, "username": "crystal", "first_name": "Crystal" }
  }
}
```

#### New Post (for notifications)
```json
{
  "type": "new_post",
  "data": {
    "id": 789,
    "author": { "id": 5, "username": "crystal" },
    "message": "posted something new"
  }
}
```

---

## 4. Database Persistence

### Problem
On Render free tier, SQLite file resets on deploy. Seeded data survives (recreated), user data doesn't.

### Solution
Use **Render Postgres** instead of SQLite:

1. Create Postgres database on Render
2. Get connection string
3. Update Django settings:
```python
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL')
    )
}
```

---

## 5. CORS Configuration

Backend must allow frontend origin:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://numeneon.vercel.app",
    # Add your Vercel URL
]
```

---

## Quick Debug Checklist

| Issue | Check |
|-------|-------|
| Messages not sending | Is `receiver_id` in request? |
| Messages not persisting | Using Postgres or SQLite? |
| Wall posts not saving | Does Post model have `target_profile` field? |
| WebSocket not connecting | Is URL correct? Is token valid? |
| 405 errors | Check HTTP method matches backend view |
| CORS errors | Is frontend origin in CORS_ALLOWED_ORIGINS? |
