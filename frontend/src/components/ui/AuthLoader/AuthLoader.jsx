/**
 * AuthLoader - Teleporting/Warping loading overlay for auth operations
 * Shows a cool holographic portal effect with rotating messages
 */
import { useState, useEffect } from 'react';
import './AuthLoader.scss';

// Fun messages that rotate during loading
const LOADING_MESSAGES = {
  login: [
    "Initializing neural link...",
    "Scanning credentials...",
    "Opening dimensional rift...",
    "Aligning quantum particles...",
    "Establishing secure tunnel...",
    "Welcome back, traveler...",
  ],
  signup: [
    "Generating unique ID...",
    "Weaving digital DNA...",
    "Creating your dimension...",
    "Calibrating neural patterns...",
    "Registering in the Numeneon...",
    "Preparing your journey...",
  ],
};

function AuthLoader({ isVisible, mode = 'login' }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = LOADING_MESSAGES[mode] || LOADING_MESSAGES.login;

  // Rotate through messages only when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      // Reset index when unmounting/hiding
      setMessageIndex(0);
    };
  }, [isVisible, messages.length]);

  if (!isVisible) return null;

  return (
    <div className="auth-loader-overlay">
      <div className="auth-loader-content">
        {/* Outer ring - rotating */}
        <div className="portal-ring outer-ring">
          <div className="ring-glow"></div>
        </div>
        
        {/* Middle ring - counter-rotating */}
        <div className="portal-ring middle-ring">
          <div className="ring-glow"></div>
        </div>
        
        {/* Inner ring - fast rotating */}
        <div className="portal-ring inner-ring">
          <div className="ring-glow"></div>
        </div>
        
        {/* Core pulse */}
        <div className="portal-core">
          <div className="core-pulse"></div>
          <div className="core-pulse delay-1"></div>
          <div className="core-pulse delay-2"></div>
        </div>
        
        {/* Particle effects */}
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
        
        {/* Loading message */}
        <div className="loader-message">
          <span className="message-text">{messages[messageIndex]}</span>
          <div className="message-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLoader;
