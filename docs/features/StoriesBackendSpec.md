# Stories Feature - Backend Specification

## Overview

Instagram-style stories that expire after 24 hours. Users can upload images/videos, view friends' stories, and react with heart or thunder.

---

## Models

### Story

```python
class Story(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stories')
    media_url = models.URLField()  # Cloudinary URL
    media_type = models.CharField(max_length=10, choices=[('image', 'Image'), ('video', 'Video')])
    caption = models.TextField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()  # Set to created_at + 24 hours on save

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(hours=24)
        super().save(*args, **kwargs)

    @property
    def is_expired(self):
        return timezone.now() > self.expires_at
```

### StoryView

```python
class StoryView(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='views')
    viewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='viewed_stories')
    viewed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['story', 'viewer']
```

### StoryReaction

```python
class StoryReaction(models.Model):
    REACTION_CHOICES = [
        ('heart', 'Heart'),
        ('thunder', 'Thunder'),
    ]

    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='story_reactions')
    reaction_type = models.CharField(max_length=10, choices=REACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['story', 'user']  # One reaction per user per story
```

---

## API Endpoints

### GET `/api/stories/`

Get all non-expired stories from friends (or all users).

**Response:**

```json
{
  "stories": [
    {
      "id": "uuid",
      "user": {
        "id": 1,
        "username": "johndoe",
        "profile_picture": "https://..."
      },
      "media_url": "https://cloudinary.com/...",
      "media_type": "image",
      "caption": "Hello world!",
      "created_at": "2026-02-10T12:00:00Z",
      "expires_at": "2026-02-11T12:00:00Z",
      "view_count": 15,
      "is_viewed": false,
      "my_reaction": null
    }
  ]
}
```

**Notes:**

- Filter out expired stories (`expires_at > now`)
- Group by user for frontend display
- `is_viewed` is true if current user has viewed
- `my_reaction` is `"heart"`, `"thunder"`, or `null`

---

### GET `/api/stories/user/<userId>/`

Get all non-expired stories from a specific user.

**Response:** Same structure as above, filtered to one user.

---

### POST `/api/stories/`

Create a new story.

**Request Body:**

```json
{
  "media_url": "https://cloudinary.com/...",
  "media_type": "image",
  "caption": "Optional caption"
}
```

**Response:**

```json
{
  "id": "uuid",
  "user": { ... },
  "media_url": "https://...",
  "media_type": "image",
  "caption": "Optional caption",
  "created_at": "2026-02-10T12:00:00Z",
  "expires_at": "2026-02-11T12:00:00Z"
}
```

---

### DELETE `/api/stories/<id>/`

Delete your own story.

**Response:** `204 No Content`

**Errors:**

- `403 Forbidden` if not story owner
- `404 Not Found` if story doesn't exist

---

### POST `/api/stories/<id>/view/`

Mark a story as viewed by current user.

**Response:**

```json
{
  "success": true,
  "view_count": 16
}
```

**Notes:**

- Creates StoryView record (idempotent - ignore if already viewed)
- Don't count self-views

---

### POST `/api/stories/<id>/react/`

Add or update reaction to a story.

**Request Body:**

```json
{
  "reaction_type": "heart"
}
```

**Response:**

```json
{
  "success": true,
  "reaction_type": "heart",
  "heart_count": 5,
  "thunder_count": 3
}
```

**Notes:**

- If user already reacted, update the reaction type
- Send notification to story owner

---

### DELETE `/api/stories/<id>/react/`

Remove your reaction from a story.

**Response:** `204 No Content`

---

## Serializers

### StorySerializer

```python
class StorySerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True)
    is_viewed = serializers.SerializerMethodField()
    my_reaction = serializers.SerializerMethodField()
    view_count = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = ['id', 'user', 'media_url', 'media_type', 'caption',
                  'created_at', 'expires_at', 'is_viewed', 'my_reaction', 'view_count']

    def get_is_viewed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.views.filter(viewer=request.user).exists()
        return False

    def get_my_reaction(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            reaction = obj.reactions.filter(user=request.user).first()
            return reaction.reaction_type if reaction else None
        return None

    def get_view_count(self, obj):
        return obj.views.count()
```

---

## Background Job (Optional)

Set up a periodic task to clean up expired stories:

```python
# Celery task or Django management command
from django.core.management.base import BaseCommand
from django.utils import timezone
from stories.models import Story

class Command(BaseCommand):
    def handle(self, *args, **options):
        deleted, _ = Story.objects.filter(expires_at__lt=timezone.now()).delete()
        self.stdout.write(f'Deleted {deleted} expired stories')
```

Run via cron: `0 * * * * python manage.py cleanup_expired_stories`

---

## Frontend Service Reference

See: `frontend/src/services/storiesService.js`

---

## Story Reply via DM (Enhancement)

When users reply to a story, the message is sent as a DM with story context attached.

### Message Model Addition

```python
# Add to Message model
reply_to_story = models.ForeignKey(
    'stories.Story',
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name='replies'
)
# Cache story thumbnail in case story expires
reply_to_story_thumbnail = models.URLField(null=True, blank=True)
```

### Send Message with Story Context

**POST `/api/messages/`**

```json
{
  "recipient_id": 5,
  "content": "This is fire!",
  "reply_to_story": "story-uuid"
}
```

**Response includes:**

```json
{
  "id": 123,
  "sender": { ... },
  "recipient": { ... },
  "content": "This is fire!",
  "reply_to_story": {
    "id": "story-uuid",
    "media_url": "https://...",
    "media_type": "image"
  },
  "created_at": "..."
}
```

### Notification

When someone replies to your story, send notification:

- Type: `story_reply`
- Text: `"@username replied to your story"`
- Links to DM thread

---

## Notes

- Media is uploaded to Cloudinary on frontend before calling POST `/api/stories/`
- 24-hour expiration is calculated server-side
- Consider WebSocket notifications when someone reacts to your story
