# Smart Feed Algorithm (Boost System)

## Status: 📋 PLANNED

---

## Overview

A "boost" algorithm that surfaces underexposed posts so every voice gets heard. Instead of pure chronological or pure engagement-based feeds, Numeneon blends multiple signals to create a fair, balanced timeline.

---

## The Problem

Traditional social feeds have two extremes:

| Approach | Problem |
|----------|---------|
| **Pure Chronological** | Popular users dominate; new/small creators get buried |
| **Pure Engagement** | Rich get richer; viral posts crowd out everything else |

**Numeneon's Solution:** A hybrid approach that gives underseen posts a "boost" while preserving chronological context.

---

## How It Works

### Default Feed Composition (Blended)

```
On Refresh → Blended feed:
├── 30% Boosted (underseen posts get fair exposure)
├── 20% Hot (high engagement from your network)  
└── 50% Chronological (latest from who you follow)
```

The user never has to think about it — they just get a balanced feed.

---

## Boost Score Calculation

### Formula

```python
exposure_ratio = views / (poster.follower_count + 1)
time_factor = 1 / (hours_since_posted + 1)
boost_score = (1 - min(exposure_ratio, 1)) * time_factor
```

### What This Means

| Variable | Purpose |
|----------|---------|
| `exposure_ratio` | How "seen" is this post relative to the poster's reach? |
| `+1` in denominator | Prevents division by zero for new users |
| `min(..., 1)` | Caps ratio so viral posts don't get negative scores |
| `time_factor` | Older unseen posts get priority, but decay over time |
| `boost_score` | Higher = more boosted (shown earlier in feed) |

### Examples

| Scenario | Views | Followers | Hours Old | Boost Score | Result |
|----------|-------|-----------|-----------|-------------|--------|
| New user, unseen post | 0 | 5 | 2 | 0.33 | HIGH boost |
| Popular user, underseen | 50 | 10,000 | 1 | 0.50 | HIGH boost |
| Normal engagement | 100 | 200 | 4 | 0.10 | LOW boost |
| Viral post | 5,000 | 100 | 1 | 0.00 | NO boost |

---

## View Tracking System

### The Challenge

Incrementing `view_count` on every viewport entry = too many API calls.

### Solution: Batched Tracking

```
┌─────────────────────────────────────────────────────────────┐
│                    VIEW TRACKING FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Client tracks viewport events locally                   │
│     - Post enters viewport → start timer                    │
│     - Post exits viewport → record duration                 │
│     - "View" = 2+ seconds in viewport                       │
│                                                             │
│  2. Batch send to server every 10 seconds                   │
│     POST /api/views/batch/                                  │
│     { views: [{ post_id, duration }, ...] }                 │
│                                                             │
│  3. Server writes to Redis (fast)                           │
│     HINCRBY post:{id}:views 1                               │
│                                                             │
│  4. Async job syncs Redis → PostgreSQL every minute         │
│     UPDATE posts SET view_count = view_count + delta        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## API Design

### Refresh Endpoint

```
GET /api/feed/
Authorization: Bearer {token}
Query params:
  - seen_post_ids[] (optional) - posts to exclude from boost
  - mode (optional) - "balanced" | "discover" | "trending" | "latest"
```

### Response

```json
{
  "posts": [
    { "id": 1, "boost_type": "underseen", ... },
    { "id": 2, "boost_type": "hot", ... },
    { "id": 3, "boost_type": null, ... }
  ],
  "meta": {
    "boosted_count": 5,
    "total_count": 20
  }
}
```

---

## Optional: Power User Modes

For users who want control, add a subtle toggle:

```
┌─────────────────────────────────────┐
│  🌊 River Timeline        [⚙️ ▾]   │
├─────────────────────────────────────┤
│  ● Balanced (default)               │
│  ○ Discover (underseen posts)       │
│  ○ Trending (hot right now)         │
│  ○ Latest (pure chronological)      │
└─────────────────────────────────────┘
```

**Note:** Keep this hidden/subtle. Data shows <10% of users ever change feed settings.

---

## Constraints & Requirements

### Business Rules

- **Minimum age:** Only boost posts older than 1 hour (give new posts organic chance)
- **Maximum age:** Don't boost posts older than 7 days (they're dead)
- **Batch size:** Max 10 boosted posts per refresh
- **Exclude seen:** Client sends `seen_post_ids[]` to avoid re-boosting

### Performance

- Boost query must complete in **<100ms** for 1000 followed users
- Database indexes required: `(poster_id, created_at, view_count)`
- Use Redis for hot counters, PostgreSQL for persistence

---

## Implementation Phases

### Phase 1: View Tracking
- [ ] Add `view_count` field to Post model
- [ ] Create batch view endpoint
- [ ] Implement client-side viewport observer
- [ ] Set up Redis for fast increments

### Phase 2: Boost Algorithm
- [ ] Implement boost score calculation
- [ ] Create `/api/feed/` endpoint with blended results
- [ ] Add `boost_type` to response for UI indicators

### Phase 3: UI Integration
- [ ] Add "✨ Surfaced for you" badge on boosted posts (optional)
- [ ] Implement power user mode toggle (optional)
- [ ] A/B test boost percentages

---

## Why This Matters

Most feeds optimize for **engagement** (showing you what's already popular). This creates:

- Echo chambers
- Rich-get-richer dynamics  
- Small creators feeling invisible

Numeneon's boost algorithm ensures **smaller voices aren't drowned out** — aligning with the River Timeline philosophy of organized, equitable content flow.

> *"Numeneon's River surfaces posts that might've slipped through the cracks, so every voice gets heard."*

---

## Related Docs

- [River Timeline](../features/RiverTimeline.md) — The feed architecture this builds on
- [WebSockets](../features/WebSocketsStretchGoal.md) — Real-time updates for new posts
