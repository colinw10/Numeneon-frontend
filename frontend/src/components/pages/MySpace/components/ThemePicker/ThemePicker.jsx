// ThemePicker.jsx - MySpace theme selection
import './ThemePicker.scss';

// Import wallpapers
import bipolarInvert from '@assets/wallpapers/Bipolar-invert.png';
import bipolarPink from '@assets/wallpapers/Bipolar-pink.png';
import bipolarTeal from '@assets/wallpapers/Bipolar-teal.png';

const THEME_OPTIONS = [
  { id: 'classic', name: 'Classic', preview: '#003366' },
  { id: 'emo', name: 'Emo', preview: '#1a0a0a' },
  { id: 'scene', name: 'Scene', preview: '#ff69b4' },
  { id: 'starry', name: 'Starry', preview: '#0a0a2e' },
  { id: 'glitter', name: 'Glitter', preview: '#2a1a00' },
];

const WALLPAPER_OPTIONS = [
  { id: 'none', name: 'none', src: null },
  { id: 'invert', name: 'invert', src: bipolarInvert },
  { id: 'pink', name: 'pink', src: bipolarPink },
  { id: 'teal', name: 'teal', src: bipolarTeal },
];

function ThemePicker({ currentTheme, currentWallpaper, onUpdateField, isVisible }) {
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

      <h2 className="section-title">wallpaper</h2>
      <div className="wallpaper-picker">
        {WALLPAPER_OPTIONS.map(({ id, name, src }) => (
          <button
            key={id}
            className={`wallpaper-option ${currentWallpaper === id ? 'selected' : ''}`}
            onClick={() => onUpdateField('wallpaper', id)}
          >
            <span 
              className="wallpaper-preview"
              style={src ? { backgroundImage: `url(${src})` } : {}}
            />
            <span className="wallpaper-name">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemePicker;
