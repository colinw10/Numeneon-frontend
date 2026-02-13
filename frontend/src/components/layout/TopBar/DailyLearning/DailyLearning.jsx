// DailyLearning.jsx - Quick learning widget for TopBar or sidebar
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodayLearning, CATEGORIES } from '@data/dailyLearning';
import SyntaxHighlight from '@utils/syntaxHighlight';
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
    { key: 'mythology', icon: 'Ψ', label: 'Myth', data: today.mythology, color: '#fbbf24' },
  ];

  // Track known items from localStorage
  const getKnownItems = () => {
    try {
      return JSON.parse(localStorage.getItem('knownLearning') || '{}');
    } catch {
      return {};
    }
  };
  
  const [knownItems, setKnownItems] = useState(getKnownItems);
  
  // Track if user manually selected a tab (prevents auto-shift override)
  const [userSelected, setUserSelected] = useState(false);
  
  // Check if a category's current item is known
  const isKnown = (categoryKey, itemId) => knownItems[`${categoryKey}_${itemId}`];
  
  // Listen for localStorage changes (when Learn page updates)
  useEffect(() => {
    const handleStorage = () => setKnownItems(getKnownItems());
    window.addEventListener('storage', handleStorage);
    // Also check periodically for same-tab updates
    const interval = setInterval(() => setKnownItems(getKnownItems()), 1000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);
  
  // Auto-shift to first unlearned category ONLY when current item just became known
  // and user hasn't manually selected a tab
  useEffect(() => {
    if (userSelected) return; // Don't override user's choice
    
    const firstUnlearned = categories.findIndex(cat => !isKnown(cat.key, cat.data.id));
    if (firstUnlearned !== -1 && isKnown(categories[activeCategory].key, categories[activeCategory].data.id)) {
      setActiveCategory(firstUnlearned);
    }
  }, [knownItems]);

  const currentCat = categories[activeCategory];
  
  // Track if user has expanded the all-known minimized view
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContentClick = () => {
    // Navigate to /learn with the current category pre-selected
    navigate(`/learn?tab=${currentCat.key}`);
  };

  // SIDEBAR VARIANT - Card with letter tabs
  if (variant === 'sidebar') {
    // Check if ALL categories are known
    const allKnown = categories.every(cat => isKnown(cat.key, cat.data.id));
    
    return (
      <div className={`daily-learning-sidebar ${allKnown ? 'all-known' : ''} ${allKnown && !isExpanded ? 'minimized' : ''}`}>
        {/* Title + Letter tabs */}
        <div className="dls-left">
          <div className="dls-title">{allKnown ? 'Learned*' : 'Learn'}</div>
          <div className="dls-tabs">
            {categories.map((cat, idx) => {
              const catIsKnown = isKnown(cat.key, cat.data.id);
              return (
                <button
                  key={cat.key}
                  className={`dls-tab ${activeCategory === idx ? 'active' : ''} ${catIsKnown ? 'known' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserSelected(true); // User manually clicked, don't auto-shift
                    setActiveCategory(idx);
                  }}
                  title={catIsKnown ? `${cat.label} ✓` : cat.label}
                  style={{ 
                    borderColor: activeCategory === idx ? (catIsKnown ? '#4ade80' : cat.color) : 'transparent'
                  }}
                >
                  <span className="dls-tab-letter" style={{ color: cat.color }}>{cat.icon}</span>
                  {catIsKnown && <span className="dls-tab-dot">•</span>}
                </button>
              );
            })}
          </div>
          
          {/* Checkmark at end of row when all known */}
          {allKnown && (
            <span 
              className="dls-check-icon" 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              title={isExpanded ? 'collapse' : 'tap to review'}
            >
              ✓
            </span>
          )}
        </div>
        
        {/* Minimized state ONLY when ALL items are known */}
        {allKnown && !isExpanded ? null : (
          <>
            {/* Content - clickable to go to /learn */}
            <div className="dls-content" onClick={handleContentClick}>
              <div className="dls-term">{currentCat.data.term}</div>
              <div className="dls-definition">{currentCat.data.definition}</div>
              
              {/* Show extra fields if available */}
              {currentCat.data.code && (
                <SyntaxHighlight code={currentCat.data.code} className="dls-code" />
              )}
              {currentCat.data.gotcha && (
                <div className="dls-gotcha">⚠️ {currentCat.data.gotcha}</div>
              )}
              {currentCat.data.example && (
                <div className="dls-example">{currentCat.data.example}</div>
              )}
              {currentCat.data.myth && (
                <div className="dls-myth">{currentCat.data.myth}</div>
              )}
            </div>

            <div className="dls-footer" onClick={handleContentClick}>
              <span className="dls-cta">Tap to learn more →</span>
            </div>
            
            {/* Collapse button when expanded and all known */}
            {allKnown && isExpanded && (
              <button 
                className="dls-collapse-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              >
                Collapse
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  // TOPBAR VARIANT - Not used
  return null;
}

export default DailyLearning;
