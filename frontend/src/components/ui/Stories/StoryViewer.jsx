import { useState, useEffect, useRef, useCallback } from 'react';
import { useStories } from '@contexts/StoriesContext';
import { useAuth } from '@contexts/AuthContext';
import {
  CloseIcon,
  HeartDynamicIcon,
  BoltDynamicIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@assets/icons';
import { getInitials } from '@utils/helpers';
// Reuse existing styles
import '@pages/Home/Home.scss';
import '@Profile/components/ComposerModal/ComposerModal.scss';

function StoryViewer({ isOpen, onClose, initialUserIndex = 0, storyGroups }) {
  const { user } = useAuth();
  const { markStoryViewed, reactToStory, isStoryViewed } = useStories();
  
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressInterval = useRef(null);
  const touchStartX = useRef(0);

  const STORY_DURATION = 5000; // 5 seconds per story

  // Current user's story group
  const currentGroup = storyGroups?.[currentUserIndex];
  const currentStory = currentGroup?.stories?.[currentStoryIndex];

  // Navigate to next story
  const goToNextStory = useCallback(() => {
    if (!currentGroup) return;
    
    if (currentStoryIndex < currentGroup.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else if (currentUserIndex < storyGroups.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
    setProgress(0);
  }, [currentStoryIndex, currentUserIndex, currentGroup, storyGroups, onClose]);

  // Navigate to previous story
  const goToPrevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else if (currentUserIndex > 0) {
      const prevGroup = storyGroups[currentUserIndex - 1];
      setCurrentUserIndex(prev => prev - 1);
      setCurrentStoryIndex(prevGroup.stories.length - 1);
    }
    setProgress(0);
  }, [currentStoryIndex, currentUserIndex, storyGroups]);

  // Reset when opening with new user
  useEffect(() => {
    if (isOpen) {
      setCurrentUserIndex(initialUserIndex);
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  }, [isOpen, initialUserIndex]);

  // Auto-advance progress bar
  useEffect(() => {
    if (!isOpen || !currentStory || isPaused) return;

    setProgress(0);
    const startTime = Date.now();
    
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / STORY_DURATION) * 100;
      
      if (newProgress >= 100) {
        goToNextStory();
      } else {
        setProgress(newProgress);
      }
    }, 50);

    // Mark as viewed
    if (currentStory && !isStoryViewed(currentStory.id)) {
      markStoryViewed(currentStory.id);
    }

    return () => clearInterval(progressInterval.current);
  }, [isOpen, currentUserIndex, currentStoryIndex, isPaused, currentStory, goToNextStory, isStoryViewed, markStoryViewed]);

  // Handle tap navigation (left 30% = prev, right 70% = next)
  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const threshold = rect.width * 0.3;
    
    if (x < threshold) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  // Swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextStory();
      } else {
        goToPrevStory();
      }
    }
    setIsPaused(false);
  };

  // Handle reactions
  const handleReaction = async (type) => {
    if (!currentStory) return;
    await reactToStory(currentStory.id, type);
  };

  if (!isOpen || !currentGroup || !currentStory) return null;

  const storyUser = currentGroup.user;

  // Inline styles for viewer-specific elements (reusing CSS variables)
  const viewerStyles = {
    container: {
      position: 'fixed',
      inset: 0,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
    },
    progressContainer: {
      display: 'flex',
      gap: '4px',
      padding: '12px 12px 8px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    progressBar: {
      flex: 1,
      height: '3px',
      background: 'rgba(255,255,255,0.3)',
      borderRadius: '2px',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: 'var(--cyan)',
      transition: 'width 0.05s linear',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      position: 'absolute',
      top: '24px',
      left: 0,
      right: 0,
      zIndex: 10,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    username: {
      color: '#fff',
      fontWeight: 600,
      fontSize: 'var(--font-size-body)',
    },
    time: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 'var(--font-size-sm)',
      marginLeft: '8px',
    },
    content: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    media: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
    caption: {
      position: 'absolute',
      bottom: '100px',
      left: '16px',
      right: '16px',
      color: '#fff',
      textAlign: 'center',
      fontSize: 'var(--font-size-body)',
      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
      padding: '12px',
      background: 'rgba(0,0,0,0.4)',
      borderRadius: '8px',
    },
    navBtn: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      border: 'none',
      color: '#fff',
      padding: '12px',
      cursor: 'pointer',
      borderRadius: '50%',
      display: 'flex',
      opacity: 0.7,
      transition: 'opacity 0.2s',
    },
    reactions: {
      position: 'absolute',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '24px',
    },
    reactionBtn: {
      background: 'rgba(0,0,0,0.6)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '50%',
      padding: '12px',
      cursor: 'pointer',
      color: '#fff',
      display: 'flex',
      transition: 'all 0.2s',
    },
  };

  return (
    <div style={viewerStyles.container}>
      {/* Progress bars */}
      <div style={viewerStyles.progressContainer}>
        {currentGroup.stories.map((story, idx) => (
          <div key={story.id} style={viewerStyles.progressBar}>
            <div 
              style={{ 
                ...viewerStyles.progressFill,
                width: idx < currentStoryIndex ? '100%' : 
                       idx === currentStoryIndex ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={viewerStyles.header}>
        <div style={viewerStyles.userInfo}>
          <div className="story-avatar" style={{ width: '40px', height: '40px' }}>
            {storyUser.profile_picture ? (
              <img src={storyUser.profile_picture} alt={storyUser.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <span className="story-initial-1">{getInitials(storyUser)}</span>
            )}
          </div>
          <div>
            <span style={viewerStyles.username}>{storyUser.username}</span>
            <span style={viewerStyles.time}>
              {new Date(currentStory.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <button 
          className="close-btn-glow" 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <CloseIcon size={24} />
        </button>
      </div>

      {/* Story content - tap to navigate */}
      <div 
        style={viewerStyles.content}
        onClick={handleTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {currentStory.media_type === 'video' ? (
          <video 
            src={currentStory.media_url} 
            autoPlay 
            muted 
            playsInline
            style={viewerStyles.media}
            onEnded={goToNextStory}
          />
        ) : (
          <img src={currentStory.media_url} alt="Story" style={viewerStyles.media} />
        )}
        
        {currentStory.caption && (
          <div style={viewerStyles.caption}>{currentStory.caption}</div>
        )}
      </div>

      {/* Navigation arrows (desktop) */}
      <button 
        style={{ ...viewerStyles.navBtn, left: '12px' }}
        onClick={(e) => { e.stopPropagation(); goToPrevStory(); }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.7}
      >
        <ChevronLeftIcon size={28} />
      </button>
      <button 
        style={{ ...viewerStyles.navBtn, right: '12px' }}
        onClick={(e) => { e.stopPropagation(); goToNextStory(); }}
        onMouseEnter={(e) => e.target.style.opacity = 1}
        onMouseLeave={(e) => e.target.style.opacity = 0.7}
      >
        <ChevronRightIcon size={28} />
      </button>

      {/* Reactions - only show if not your own story */}
      {storyUser.id !== user?.id && (
        <div style={viewerStyles.reactions}>
          <button 
            style={{
              ...viewerStyles.reactionBtn,
              borderColor: currentStory.user_reaction === 'heart' ? 'var(--cyan)' : 'rgba(255,255,255,0.2)',
              background: currentStory.user_reaction === 'heart' ? 'rgba(79,255,255,0.2)' : 'rgba(0,0,0,0.6)',
            }}
            onClick={(e) => { e.stopPropagation(); handleReaction('heart'); }}
          >
            <HeartDynamicIcon size={28} filled={currentStory.user_reaction === 'heart'} />
          </button>
          <button 
            style={{
              ...viewerStyles.reactionBtn,
              borderColor: currentStory.user_reaction === 'thunder' ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              background: currentStory.user_reaction === 'thunder' ? 'rgba(26,231,132,0.2)' : 'rgba(0,0,0,0.6)',
            }}
            onClick={(e) => { e.stopPropagation(); handleReaction('thunder'); }}
          >
            <BoltDynamicIcon size={28} filled={currentStory.user_reaction === 'thunder'} />
          </button>
        </div>
      )}
    </div>
  );
}

export default StoryViewer;
