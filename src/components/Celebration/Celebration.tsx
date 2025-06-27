import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { DEFAULT_CELEBRATION_CONFIG } from '../../constants';

interface CelebrationProps {
  isActive: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
}

const Celebration: React.FC<CelebrationProps> = ({
  isActive,
  duration = DEFAULT_CELEBRATION_CONFIG.duration,
  particleCount = DEFAULT_CELEBRATION_CONFIG.particleCount,
  colors = DEFAULT_CELEBRATION_CONFIG.colors,
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isActive) {
      setShowConfetti(true);
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [isActive, duration]);

  if (!showConfetti) return null;

  return (
    <div className="confetti-container">
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={particleCount}
        colors={colors}
        gravity={0.1}
        initialVelocityY={20}
        initialVelocityX={5}
        wind={0.02}
        friction={0.99}
        opacity={0.8}
        recycle={false}
        run={showConfetti}
        confettiSource={{
          x: 0,
          y: 0,
          w: windowDimensions.width,
          h: 0,
        }}
      />
      
      {/* Additional balloon elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${15 + i * 15}%`,
              top: '20%',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s',
            }}
          >
            <div className="text-6xl opacity-80">
              {['🎈', '🎉', '🎊', '🎁', '⭐', '💫'][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Celebration;