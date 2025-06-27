import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Option, SpinnerProps } from '../../types';
import { DEFAULT_SPINNER_SIZE } from '../../constants';
import { getResponsiveSpinnerSize } from '../../utils';

const Spinner: React.FC<SpinnerProps> = ({
  options,
  onSpinComplete,
  config,
  size,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [spinnerSize, setSpinnerSize] = useState(size || DEFAULT_SPINNER_SIZE);

  useEffect(() => {
    const handleResize = () => {
      if (!size) {
        setSpinnerSize(getResponsiveSpinnerSize());
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  useEffect(() => {
    drawSpinner();
  }, [options, spinnerSize]);

  const drawSpinner = () => {
    const canvas = canvasRef.current;
    if (!canvas || options.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = spinnerSize / 2;
    const centerY = spinnerSize / 2;
    const radius = spinnerSize / 2 - 10;

    canvas.width = spinnerSize;
    canvas.height = spinnerSize;

    ctx.clearRect(0, 0, spinnerSize, spinnerSize);

    const sectionAngle = (2 * Math.PI) / options.length;

    options.forEach((option, index) => {
      const startAngle = index * sectionAngle - Math.PI / 2;
      const endAngle = startAngle + sectionAngle;

      // Draw section
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = option.color || '#3B82F6';
      ctx.fill();
      
      // Add border between sections
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      const textAngle = startAngle + sectionAngle / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(12, spinnerSize / 30)}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      const maxLength = Math.floor(spinnerSize / 40);
      const displayText = option.text.length > maxLength 
        ? option.text.substring(0, maxLength) + '...' 
        : option.text;
      
      ctx.fillText(displayText, 0, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#1F2937';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const spin = async (targetAngle: number) => {
    if (isAnimating || disabled) return;

    setIsAnimating(true);
    const duration = config?.duration || 3000;
    const startAngle = currentAngle;
    const totalRotation = targetAngle + (360 * (config?.minSpins || 5));
    
    const animate = (progress: number) => {
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const angle = startAngle + (totalRotation * easeOut);
      setCurrentAngle(angle);
      
      if (canvasRef.current) {
        canvasRef.current.style.transform = `rotate(${angle}deg)`;
      }
    };

    const startTime = Date.now();
    const animationFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      animate(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      } else {
        const finalAngle = (startAngle + totalRotation) % 360;
        const normalizedAngle = finalAngle < 0 ? 360 + finalAngle : finalAngle;
        const sectionAngle = 360 / options.length;
        const winnerIndex = Math.floor((360 - normalizedAngle + sectionAngle / 2) / sectionAngle) % options.length;
        
        setIsAnimating(false);
        onSpinComplete(options[winnerIndex]);
      }
    };

    requestAnimationFrame(animationFrame);
  };

  if (options.length === 0) {
    return (
      <div className="spinner-container" style={{ width: spinnerSize, height: spinnerSize }}>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-center">
            Add some options to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container" style={{ width: spinnerSize, height: spinnerSize }}>
      {/* Spinner Pointer */}
      <div
        className="spinner-pointer"
        style={{
          top: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderBottom: '20px solid #EF4444',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
          zIndex: 10,
        }}
      />
      
      {/* Spinner Canvas */}
      <AnimatePresence>
        <motion.canvas
          ref={canvasRef}
          className="spinner-wheel cursor-pointer"
          style={{
            width: spinnerSize,
            height: spinnerSize,
            filter: disabled ? 'opacity(0.6)' : 'none',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => !disabled && spin(Math.random() * 360)}
        />
      </AnimatePresence>
      
      {/* Loading indicator */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full p-4">
            <div className="loading-spinner" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Spinner;