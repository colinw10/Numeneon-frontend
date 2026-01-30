// 🔵 PABLO - UI/Styling | 🟢 COLIN - Post Creation Logic
// ComposerModal.jsx - Modal for creating new posts

import React, { useState } from 'react';
import './ComposerModal.scss';
import { useAuth, usePosts } from '@contexts';
import {
  MinimizeIcon,
  MaximizeIcon,
  CloseIcon,
  UserIcon,
  CircleIcon,
  ImageIcon,
  MessageBubbleIcon,
  FlagIcon,
  EmojiIcon,
  MapPinIcon
} from '@assets/icons';

function ComposerModal({ showComposer, setShowComposer, composerType, setComposerType, targetProfileId = null, targetDisplayName = null }) {
  const { user } = useAuth();
  const { createPost } = usePosts();
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Check if this is a wall post (posting on someone else's profile)
  const isWallPost = !!targetProfileId;
  
  if (!showComposer) return null;

  const handlePost = async () => {
    if (!content.trim() || isPosting) return;
    
    setIsPosting(true);
    
    // Map composerType to post type
    const postType = composerType === 'thought' ? 'thoughts' : 
                     composerType === 'media' ? 'media' : 'milestones';
    
    // Build post data - include target_profile_id for wall posts
    const postData = { content: content.trim(), type: postType };
    if (isWallPost) {
      postData.target_profile_id = targetProfileId;
    }
    
    const result = await createPost(postData);
    
    setIsPosting(false);
    
    if (result.success) {
      setContent('');
      setShowComposer(false);
    } else {
      alert(result.error || 'Failed to create post');
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handlePost();
    }
  };

  const getButtonText = () => {
    if (isPosting) return 'Posting...';
    if (isWallPost) return `Post to ${targetDisplayName}'s Wall`;
    if (composerType === 'thought') return 'Post Thought';
    if (composerType === 'media') return 'Post Media';
    return 'Post Milestone';
  };
  
  const getPlaceholderText = () => {
    if (isWallPost) {
      return `Write something on ${targetDisplayName}'s wall...`;
    }
    if (composerType === 'thought') return "What's on your mind?";
    if (composerType === 'media') return "Add a caption to your media...";
    return "Describe your milestone...";
  };
  
  const getTitleText = () => {
    if (isWallPost) return `Post to ${targetDisplayName}'s Wall`;
    if (composerType === 'thought') return 'Share Your Thoughts';
    if (composerType === 'media') return 'Post Media';
    return 'Add Milestone';
  };

  return (
    <div className="composer-modal-overlay" onClick={() => setShowComposer(false)}>
      <div className={`composer-modal-content ${isFullscreen ? 'fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="composer-modal-header">
          <h3 className="composer-modal-title">
            {getTitleText()}
          </h3>
          <div className="modal-header-actions">
            <button 
              className="fullscreen-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <MinimizeIcon size={18} /> : <MaximizeIcon size={18} />}
            </button>
            <button 
              className="close-btn-glow"
              onClick={() => setShowComposer(false)}
              aria-label="Close"
            >
              <CloseIcon size={20} />
            </button>
          </div>
        </div>

        <div className="composer-modal-body">
          <div className="composer-avatar-section">
            <div className="composer-avatar-small">
              <UserIcon size={40} />
            </div>
            <div className="composer-user-info">
              <span className="composer-user-name">{user?.username || 'User'}</span>
              <span className="composer-privacy">
                <CircleIcon size={12} />
                Public
              </span>
            </div>
          </div>

          <textarea 
            className={`composer-textarea ${composerType === 'media' ? 'media-mode' : ''}`}
            placeholder={getPlaceholderText()}
            rows={composerType === 'media' ? 2 : 6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={isPosting}
          />

          {composerType === 'media' && (
            <div className="media-upload-area">
              <div className="media-upload-placeholder">
                <ImageIcon size={48} />
                <p>Click to upload photo or video</p>
                <span>or drag and drop</span>
              </div>
            </div>
          )}

          {composerType === 'milestone' && (
            <div className="milestone-options">
              <input 
                type="date" 
                className="milestone-date-input"
                placeholder="When did this happen?"
              />
              <select className="milestone-category-select">
                <option value="">Select category...</option>
                <option value="career">Career</option>
                <option value="education">Education</option>
                <option value="personal">Personal</option>
                <option value="travel">Travel</option>
                <option value="achievement">Achievement</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          <div className="composer-type-toggle">
            <button 
              className={`type-toggle-btn type-toggle-thought ${composerType === 'thought' ? 'active' : ''}`}
              onClick={() => setComposerType('thought')}
            >
              <MessageBubbleIcon size={18} />
              Thought
            </button>
            <button 
              className={`type-toggle-btn type-toggle-media ${composerType === 'media' ? 'active' : ''}`}
              onClick={() => setComposerType('media')}
            >
              <ImageIcon size={18} />
              Media
            </button>
            <button 
              className={`type-toggle-btn type-toggle-milestone ${composerType === 'milestone' ? 'active' : ''}`}
              onClick={() => setComposerType('milestone')}
            >
              <FlagIcon size={18} />
              Milestone
            </button>
          </div>
        </div>

        <div className="composer-modal-footer">
          <div className="composer-actions-left">
            <button className="composer-icon-btn" aria-label="Add emoji">
              <EmojiIcon size={20} />
            </button>
            <button className="composer-icon-btn" aria-label="Add location">
              <MapPinIcon size={20} />
            </button>
          </div>
          <button 
            className="composer-post-btn"
            onClick={handlePost}
            disabled={!content.trim() || isPosting}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComposerModal;
