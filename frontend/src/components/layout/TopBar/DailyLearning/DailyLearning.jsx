// DailyLearning.jsx - Quick learning widget for TopBar or sidebar
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodayLearning, CATEGORIES } from '@data/dailyLearning';
import './DailyLearning.scss';

function DailyLearning({ variant = 'topbar' }) {
  const navigate = useNavigate();
  const today = getTodayLearning();
  const [activeCategory, setActiveCategory] = useState(0);
  
  // Categories with colors
  const categories = [
    { key: 'techJargon', icon: 'T', label: 'Tech', data: today.techJargon, color: '#00ffff' },
    { key: 'bigO', icon: 'O', label: 'Big O', data: today.bigO, color: '#ff00ff' },
    { key: 'loop', icon: 'L', label: 'Loop', data: today.loop, color: '#4ade80' },
    { key: 'method', icon: 'M', label: 'Method', data: today.method, color: '#f97316' },
    { key: 'vocabulary', icon: 'V', label: 'Vocab', data: today.vocabulary, color: '#a78bfa' },
  ];

  const currentCat = categories[activeCategory];

  const handleContentClick = () => {
    // Navigate to /learn with the current category pre-selected
    navigate(`/learn?tab=${currentCat.key}`);
  };

  // SIDEBAR VARIANT - Card with letter tabs
  if (variant === 'sidebar') {
    return (
      <div className="daily-learning-sidebar">
        {/* Letter tabs */}
        <div className="dls-tabs">
          {categories.map((cat, idx) => (
            <button
              key={cat.key}
              className={`dls-tab ${activeCategory === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCategory(idx);
              }}
              title={cat.label}
              style={{ 
                color: cat.color,
                borderColor: activeCategory === idx ? cat.color : 'transparent'
              }}
            >
              {cat.icon}
            </button>
          ))}
        </div>
        
        {/* Content - clickable to go to /learn */}
        <div className="dls-content" onClick={handleContentClick}>
          <div className="dls-term">{currentCat.data.term}</div>
          <div className="dls-definition">{currentCat.data.definition}</div>
        </div>

        <div className="dls-footer" onClick={handleContentClick}>
          <span className="dls-cta">Tap to learn more →</span>
        </div>
      </div>
    );
  }

  // TOPBAR VARIANT - Not used
  return null;
}

export default DailyLearning;
