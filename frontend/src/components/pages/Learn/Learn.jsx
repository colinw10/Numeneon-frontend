// Learn.jsx - Full daily learning page with detailed explanations
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getTodayLearning, CATEGORIES } from '@data/dailyLearning';
import { ChevronLeftIcon } from '@assets/icons';
import './Learn.scss';

function Learn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const today = getTodayLearning();
  
  // Get tab from URL or default to techJargon
  const tabFromUrl = searchParams.get('tab');
  const validTabs = ['techJargon', 'bigO', 'loop', 'method', 'vocabulary'];
  const initialTab = validTabs.includes(tabFromUrl) ? tabFromUrl : 'techJargon';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Update tab if URL changes
  useEffect(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  
  // Get known items from localStorage
  const getKnownItems = () => {
    try {
      return JSON.parse(localStorage.getItem('knownLearning') || '{}');
    } catch {
      return {};
    }
  };

  const [knownItems, setKnownItems] = useState(getKnownItems);

  const markAsKnown = (category, id) => {
    const key = `${category}_${id}`;
    const updated = { ...knownItems, [key]: true };
    setKnownItems(updated);
    localStorage.setItem('knownLearning', JSON.stringify(updated));
  };

  const unmarkAsKnown = (category, id) => {
    const key = `${category}_${id}`;
    const updated = { ...knownItems };
    delete updated[key];
    setKnownItems(updated);
    localStorage.setItem('knownLearning', JSON.stringify(updated));
  };

  const isKnown = (category, id) => knownItems[`${category}_${id}`];

  // Get current item based on active tab
  const getCurrentItem = () => {
    switch (activeTab) {
      case 'techJargon': return today.techJargon;
      case 'bigO': return today.bigO;
      case 'loop': return today.loop;
      case 'method': return today.method;
      case 'vocabulary': return today.vocabulary;
      default: return today.techJargon;
    }
  };

  const currentItem = getCurrentItem();
  const currentCategory = CATEGORIES.find(c => c.id === activeTab);

  return (
    <div className="learn-page">
      <header className="learn-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeftIcon size={20} />
        </button>
        <h1>Daily Learning</h1>
        <span className="learn-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </header>

      {/* Category Tabs */}
      <nav className="learn-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`learn-tab ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="learn-content">
        <div className={`learn-card ${isKnown(activeTab, currentItem.id) ? 'known' : ''}`}>
          {/* Card Header */}
          <div className="card-header">
            <span className="card-category">
              {currentCategory?.name}
            </span>
            <button
              className={`know-btn ${isKnown(activeTab, currentItem.id) ? 'known' : ''}`}
              onClick={() => 
                isKnown(activeTab, currentItem.id) 
                  ? unmarkAsKnown(activeTab, currentItem.id)
                  : markAsKnown(activeTab, currentItem.id)
              }
            >
              {isKnown(activeTab, currentItem.id) ? '✓ Known' : 'Mark as Known'}
            </button>
          </div>

          {/* Term */}
          <h2 className="card-term">{currentItem.term}</h2>
          
          {/* Pronunciation (for vocabulary) */}
          {currentItem.pronunciation && (
            <div className="card-pronunciation">{currentItem.pronunciation}</div>
          )}

          {/* Definition */}
          <p className="card-definition">{currentItem.definition}</p>

          {/* Example/Sentence */}
          {currentItem.example && (
            <div className="card-section">
              <h3>Example</h3>
              <p>{currentItem.example}</p>
            </div>
          )}

          {currentItem.sentence && (
            <div className="card-section">
              <h3>In a Sentence</h3>
              <p className="card-sentence">"{currentItem.sentence}"</p>
            </div>
          )}

          {/* Code Example */}
          {currentItem.code && (
            <div className="card-section">
              <h3>Code Example</h3>
              <pre className="card-code"><code>{currentItem.code}</code></pre>
            </div>
          )}

          {/* Best For (loops) */}
          {currentItem.bestFor && (
            <div className="card-section">
              <h3>Best For</h3>
              <p>{currentItem.bestFor}</p>
            </div>
          )}

          {/* Gotcha */}
          {currentItem.gotcha && (
            <div className="card-section card-gotcha">
              <h3>⚠️ Watch Out</h3>
              <p>{currentItem.gotcha}</p>
            </div>
          )}

          {/* Real World (Big O) */}
          {currentItem.realWorld && (
            <div className="card-section">
              <h3>Real World Analogy</h3>
              <p>{currentItem.realWorld}</p>
            </div>
          )}

          {/* Synonyms (vocabulary) */}
          {currentItem.synonyms && (
            <div className="card-section">
              <h3>Synonyms</h3>
              <div className="card-synonyms">
                {currentItem.synonyms.map((syn, i) => (
                  <span key={i} className="synonym-tag">{syn}</span>
                ))}
              </div>
            </div>
          )}

          {/* Category badge (methods) */}
          {currentItem.category && (
            <div className="card-type-badge">{currentItem.category}</div>
          )}
        </div>

        {/* Stats */}
        <div className="learn-stats">
          <div className="stat">
            <span className="stat-value">{Object.keys(knownItems).length}</span>
            <span className="stat-label">Words Learned</span>
          </div>
          <div className="stat">
            <span className="stat-value">{CATEGORIES.reduce((acc, c) => acc + c.data.length, 0)}</span>
            <span className="stat-label">Total Terms</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Learn;
