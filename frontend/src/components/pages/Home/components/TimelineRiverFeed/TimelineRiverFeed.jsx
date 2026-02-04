// 🔵 PABLO - UI/Styling | 🟢 COLIN + 🟠 TITO - Posts Data Logic
// TimelineRiverFeed.jsx - Main timeline feed with 3-column river layout
//
// ROW-CHUNKING: Posts are chunked into rows of max 12 per category.
// When a user posts 15 thoughts in a day, they get 2 rows: [3 newest] then [12 older].

import { groupPostsByUser, sortGroupedPosts } from '@components/pages/Home/utils/groupPosts';
import TimelineRiverRow from '../TimelineRiverRow';
import { MessageBubbleIcon, ClockIcon } from '@assets/icons';
import './TimelineRiverFeed.scss';

const CAROUSEL_LIMIT = 12;
// ↑ Max posts per category per row — design decision

/**
 * Chunk posts into groups of max CAROUSEL_LIMIT (12)
 * Newest posts in first chunk, older in subsequent chunks
 */
const chunkPostsIntoRows = (posts) => {
  // GUARD 1: No posts? Return one empty row
  if (!posts || posts.length === 0) return [[]];
  if (posts.length <= CAROUSEL_LIMIT) return [posts];// GUARD 2: 12 or fewer? No splitting needed — return as single row


  // MORE THAN 12 — need to split
  const rows = [];
  const totalPosts = posts.length;
  const remainder = totalPosts % CAROUSEL_LIMIT;
  // e.g. 13 % 12 = 1
  // IF there's leftover ↑ modulo gives us the "leftover" after dividing by 12
  if (remainder > 0) {
    // FIRST ROW: gets the remainder (the newest posts)
    rows.push(posts.slice(0, remainder));
    // ↑ posts.slice(0, 1) → grabs posts at index 0 up to (not including) index 1
    // since new post gets pushed to the front of array in PostsContext logic

    // REMAINING ROWS: get 12 each
    // i=1 start when the first row ends
    // keep going while i < totalPosts(13)
    for (let i = remainder; i < totalPosts; i += CAROUSEL_LIMIT) {
      rows.push(posts.slice(i, i + CAROUSEL_LIMIT));
      // ↑ posts.slice(1, 13) → grabs posts at index 1 through 12 to fill up the row that was left
    }
  } else {
    // EVENLY DIVISIBLE (e.g. 24 posts)
    for (let i = 0; i < totalPosts; i += CAROUSEL_LIMIT) {
      rows.push(posts.slice(i, i + CAROUSEL_LIMIT));
      // we
    }
  }
  
  return rows;
};

/**
 * Split a user's grouped data into multiple rows if ANY category exceeds 12 posts.
 * Returns an array of rowData objects, each with max 12 posts per category.
 * 
 * KEY DESIGN: When ANY category hits 12+, a new row is created for ALL categories.
 * This keeps the timeline synchronized - Row 0 always = newest posts across ALL types.
 * 
 * Example: 15 thoughts, 3 media, 1 milestone
 *   Row 0 (newest): thoughts[0-2], media[0-2], milestones[0]  ← all newest
 *   Row 1 (older):  thoughts[3-14], empty, empty              ← overflow from thoughts
 */
const splitGroupIntoRows = (groupData) => {
  const { user, thoughts = [], media = [], milestones = [] } = groupData;
  
  // Calculate how many rows we need based on the LARGEST category
  const maxCategoryLength = Math.max(thoughts.length, media.length, milestones.length);
  
  // If no category exceeds limit, single row
  if (maxCategoryLength <= CAROUSEL_LIMIT) {
    return [{
      user,
      thoughts,
      media,
      milestones,
      rowIndex: 0,
    }];
  }
  
  // Calculate row count based on largest category
  const rowCount = Math.ceil(maxCategoryLength / CAROUSEL_LIMIT);
  
  // Helper: chunk a single category's posts aligned to global row structure
  // Row 0 gets the "remainder" (newest), subsequent rows get 12 each
  const chunkAligned = (posts, totalRows) => {
    if (!posts || posts.length === 0) {
      return Array(totalRows).fill([]);
    }
    
    const chunks = [];
    const remainder = posts.length % CAROUSEL_LIMIT;
    
    // Row 0: gets remainder (or full 12 if evenly divisible)
    if (remainder > 0) {
      chunks.push(posts.slice(0, remainder));
      // Remaining rows get 12 each
      for (let i = remainder; i < posts.length; i += CAROUSEL_LIMIT) {
        chunks.push(posts.slice(i, i + CAROUSEL_LIMIT));
      }
    } else {
      // Evenly divisible - each row gets 12
      for (let i = 0; i < posts.length; i += CAROUSEL_LIMIT) {
        chunks.push(posts.slice(i, i + CAROUSEL_LIMIT));
      }
    }
    
    // Pad with empty arrays if this category has fewer rows than total
    while (chunks.length < totalRows) {
      chunks.push([]);
    }
    
    return chunks;
  };
  
  // Chunk each category aligned to the same row structure
  const thoughtChunks = chunkAligned(thoughts, rowCount);
  const mediaChunks = chunkAligned(media, rowCount);
  const milestoneChunks = chunkAligned(milestones, rowCount);
  
  // Build rows
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push({
      user,
      thoughts: thoughtChunks[i] || [],
      media: mediaChunks[i] || [],
      milestones: milestoneChunks[i] || [],
      rowIndex: i,
    });
  }
  
  return rows;
};


import { useMemo } from 'react';

function TimelineRiverFeed(props) {
  const {
    posts,
    activeCommentPostId,
    setActiveCommentPostId,
    commentText,
    setCommentText,
    onDeletePost,
    onUpdatePost,
  } = props;

  // Memoize grouped and sorted posts for performance
  const groupedAndSortedPosts = useMemo(() => {
    const grouped = groupPostsByUser(posts);
    return sortGroupedPosts(grouped);
  }, [posts]);

  // Handle comment toggle (open/close comment box)
  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
      setCommentText('');
    } else {
      setActiveCommentPostId(postId);
      setCommentText('');
    }
  };

  // Empty state: Show message if no posts
  if (!posts || posts.length === 0) {
    return (
      <div className="timeline-river-empty">
        <MessageBubbleIcon size={48} />
        <p>No posts yet. Be the first to share!</p>
      </div>
    );
  }

  // Main render: Loop through grouped posts
  return (
    <div className="timeline-river-feed">
      <div className="timeline-canopy"></div>
      {groupedAndSortedPosts.map(({ date, orderId, data }) => {
        const rowDataArray = splitGroupIntoRows(data);
        return (
          <div key={orderId} className="timeline-river-section">
            <div className="river-date-header">
              <div className="river-date-badge">
                <ClockIcon size={16} />
                Last active: {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              <div className="river-divider"></div>
            </div>
            {rowDataArray.map((rowData, rowIndex) => (
              <TimelineRiverRow
                key={`${orderId}-row-${rowIndex}`}
                rowData={rowData}
                onCommentClick={handleCommentClick}
                activeCommentPostId={activeCommentPostId}
                commentText={commentText}
                setCommentText={setCommentText}
                setActiveCommentPostId={setActiveCommentPostId}
                onDeletePost={onDeletePost}
                onUpdatePost={onUpdatePost}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default TimelineRiverFeed;
