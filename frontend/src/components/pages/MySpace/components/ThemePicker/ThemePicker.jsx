// ThemePicker.jsx - MySpace theme selection
import './ThemePicker.scss';

const THEME_OPTIONS = [
  { id: 'classic', name: 'Classic', preview: '#003366' },
  { id: 'emo', name: 'Emo', preview: '#1a0a0a' },
  { id: 'scene', name: 'Scene', preview: '#ff69b4' },
  { id: 'starry', name: 'Starry', preview: '#0a0a2e' },
  { id: 'glitter', name: 'Glitter', preview: '#2a1a00' },
];

function ThemePicker({ currentTheme, onUpdateField, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="theme-section">
      <h2 className="section-title">theme</h2>
      <div className="theme-picker">
        {THEME_OPTIONS.map(({ id, name, preview }) => (
          <button
            key={id}
            className={`theme-option ${currentTheme === id ? 'selected' : ''}`}
            onClick={() => onUpdateField('theme', id)}
            style={{ '--preview-color': preview }}
          >
            <span className="theme-preview" />
            <span className="theme-name">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemePicker;
