# Wall Posting Feature

Post on a friend's profile, like Facebook wall posts.

---

## How It Works

1. User visits friend's profile
2. Composer appears (only if they're friends)
3. User writes post
4. Frontend sends `target_profile_id` with post data
5. Backend saves post with `target_profile` foreign key
6. On refresh, post shows on friend's profile

---

## Frontend Implementation

### Profile.jsx - Composer Logic

```javascript
// Show composer on own profile OR friend's profile
const canPost = isOwnProfile || isFriend;

// When posting on friend's wall, include their ID
const handleInlinePost = async () => {
  const postData = { 
    content: composerText.trim(), 
    type: 'thoughts'
  };
  
  // If posting on a friend's wall, include their user ID
  if (!isOwnProfile && isFriend && profileUser?.id) {
    postData.target_profile_id = profileUser.id;
  }
  
  const result = await createPost(postData);
  // ...
};
```

### Profile.jsx - Filtering Posts

```javascript
// Shows posts BY this user OR posts TO this user's wall
const profilePosts = posts.filter(p => 
  // Posts authored by profile owner
  p.author?.username === profileUser?.username || 
  // Wall posts - check multiple possible response formats
  p.target_profile_id === profileUser?.id ||
  p.target_profile?.id === profileUser?.id ||
  p.target_profile?.username === profileUser?.username
);
```

### PostsContext.jsx - Preserving target_profile_id

```javascript
// When creating post - attach target_profile_id if backend doesn't return it
const createPost = async (postData) => {
  const newPost = await postsService.create(postData);
  
  // Fallback: manually attach if backend doesn't return it
  if (postData.target_profile_id && !newPost.target_profile_id) {
    newPost.target_profile_id = postData.target_profile_id;
  }
  
  setPosts(prev => [newPost, ...prev]);
  return { success: true, post: newPost };
};

// When liking/updating - preserve target_profile_id
const likePost = async (postId) => {
  const updatedPost = await postsService.like(postId);
  setPosts(prev => prev.map(post =>
    post.id === postId 
      ? { ...updatedPost, target_profile_id: post.target_profile_id || updatedPost.target_profile_id }
      : post
  ));
};
```

---

## Backend Requirements

### Post Model
```python
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    type = models.CharField(max_length=20, default='thoughts')
    # NEW: For wall posts
    target_profile = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='wall_posts',
        null=True, 
        blank=True
    )
```

### PostSerializer
```python
class PostSerializer(serializers.ModelSerializer):
    target_profile_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='target_profile',
        required=False,
        allow_null=True
    )
    target_profile = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = [..., 'target_profile', 'target_profile_id']
```

---

## Request/Response Example

### POST /api/posts/
**Request:**
```json
{
  "content": "Hey, cool profile!",
  "type": "thoughts",
  "target_profile_id": 5
}
```

**Response:**
```json
{
  "id": 123,
  "author": { "id": 1, "username": "pablo" },
  "content": "Hey, cool profile!",
  "type": "thoughts",
  "target_profile": { "id": 5, "username": "crystal" },
  "created_at": "2026-01-30T12:00:00Z"
}
```

---

## Testing Checklist

- [ ] Can see composer on friend's profile
- [ ] Cannot see composer on non-friend's profile
- [ ] Post appears immediately after creating
- [ ] Post persists after page refresh
- [ ] Post appears on correct profile (friend's, not yours)
- [ ] Liking wall post doesn't break it
