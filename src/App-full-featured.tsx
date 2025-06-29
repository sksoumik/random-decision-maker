import React, { useState, useRef, useEffect } from 'react';
import Confetti from 'react-confetti';

interface Option {
  id: string;
  text: string;
  color: string;
}

interface HistoryEntry {
  id: string;
  winner: Option;
  timestamp: Date;
  totalOptions: number;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
];

function App() {
  const [options, setOptions] = useState<Option[]>([
    { id: '1', text: 'Choice A', color: COLORS[0] },
    { id: '2', text: 'Choice B', color: COLORS[1] },
    { id: '3', text: 'Choice C', color: COLORS[2] },
    { id: '4', text: 'Choice D', color: COLORS[3] }
  ]);
  
  const [newOption, setNewOption] = useState('');
  const [winner, setWinner] = useState<Option | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive spinner size
  const getSpinnerSize = () => {
    if (windowSize.width < 480) return 280; // Small mobile
    if (windowSize.width < 768) return 320; // Large mobile
    if (windowSize.width < 1024) return 350; // Tablet
    return 400; // Desktop
  };

  const addOption = () => {
    if (newOption.trim() && !options.find(opt => opt.text.toLowerCase() === newOption.trim().toLowerCase())) {
      const newOpt: Option = {
        id: Date.now().toString(),
        text: newOption.trim(),
        color: COLORS[options.length % COLORS.length]
      };
      setOptions([...options, newOpt]);
      setNewOption('');
      setShowHistory(false); // Switch back to options view to see the new option
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(opt => opt.id !== id));
    }
  };

  const clearAllOptions = () => {
    setOptions([]);
    setWinner(null);
    setRotation(0);
    setShowHistory(false); // Switch back to options view
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const drawSpinner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = getSpinnerSize();
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = Math.min(centerX, centerY) - 30;

    ctx.clearRect(0, 0, size, size);

    if (options.length === 0) {
      // Draw empty state
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#4A5568';
      ctx.fill();
      ctx.strokeStyle = '#A0AEC0';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw message
      ctx.fillStyle = '#E2E8F0';
      ctx.font = `bold ${isMobile ? 16 : 20}px Inter`;
      ctx.textAlign = 'center';
      ctx.fillText('Add Options', centerX, centerY - 10);
      ctx.fillText('to Start!', centerX, centerY + 15);

      return;
    }
    
    const anglePerOption = (2 * Math.PI) / options.length;
    
    // Draw outer decorative ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = isMobile ? 4 : 6;
    ctx.stroke();
    
    // Draw inner ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    options.forEach((option, index) => {
      const startAngle = index * anglePerOption - Math.PI / 2; // Start from top (12 o'clock)
      const endAngle = startAngle + anglePerOption;
      
      // Draw pie slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = option.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = isMobile ? 2 : 3;
      ctx.stroke();
      
      // Add subtle gradient effect
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw text
      const textAngle = startAngle + anglePerOption / 2;
      const textRadius = radius * 0.75;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;
      
      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.fillStyle = '#ffffff';
      const fontSize = isMobile ? 12 : 14;
      ctx.font = `bold ${fontSize}px Inter`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      const maxLength = isMobile ? 8 : 10;
      const displayText = option.text.length > maxLength ? option.text.substring(0, maxLength) + '...' : option.text;
      ctx.fillText(displayText, 0, 0);
      ctx.restore();
      
      // Draw section dividers
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(startAngle) * radius,
        centerY + Math.sin(startAngle) * radius
      );
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw center hub
    const hubSize = isMobile ? 20 : 25;
    ctx.beginPath();
    ctx.arc(centerX, centerY, hubSize, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, hubSize);
    centerGradient.addColorStop(0, '#FFD700');
    centerGradient.addColorStop(1, '#B8860B');
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw center circle details
    const innerSize = isMobile ? 8 : 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerSize, 0, 2 * Math.PI);
    ctx.fillStyle = '#8B4513';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };


  useEffect(() => {
    drawSpinner();
  }, [options, windowSize]);

  const spin = () => {
    if (isSpinning || options.length === 0 || options.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    setShowConfetti(false);
    
    // Simple random spin - let physics determine the winner
    const minSpins = 8;
    const maxSpins = 15;
    const extraSpins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomAngle = Math.random() * 360;
    const totalRotation = (360 * extraSpins) + randomAngle;
    
    const spinDuration = 6000;
    const startTime = Date.now();
    const startRotation = rotation;
    const finalRotation = startRotation + totalRotation;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // Realistic deceleration physics - like a real spinning wheel
      // Uses exponential decay for natural friction effect
      const easeOut = 1 - Math.pow(1 - progress, 3.5);
      
      const currentRotation = startRotation + (totalRotation * easeOut);
      setRotation(currentRotation);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Calculate winner based on final position
        const finalAngle = finalRotation % 360;
        const anglePerOption = 360 / options.length;
        
        // The pointer is at the top (0 degrees), so we need to find which segment is under it
        // Since segments start at -90 degrees (top), we add 90 to normalize
        const normalizedAngle = (finalAngle + 90) % 360;
        const winnerIndex = Math.floor(normalizedAngle / anglePerOption);
        
        const winningOption = options[winnerIndex];
        
        // Add to history
        const historyEntry: HistoryEntry = {
          id: Date.now().toString(),
          winner: winningOption,
          timestamp: new Date(),
          totalOptions: options.length
        };
        setHistory(prev => [historyEntry, ...prev.slice(0, 19)]); // Keep last 20 results
        
        setRotation(finalRotation);
        setWinner(winningOption);
        setIsSpinning(false);
        setShowConfetti(true);
        
        setTimeout(() => setShowConfetti(false), 8000);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={isMobile ? 150 : 300}
          recycle={false}
          colors={COLORS}
          gravity={0.1}
          wind={0.02}
        />
      )}
      
      <div className="relative z-10 p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse mb-2 sm:mb-4">
            🎯 Random Decision Maker
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light px-4">
            {isMobile ? "Spin until winner reaches the top!" : "Watch the wheel spin until your choice reaches the pointer!"}
          </p>
        </div>

        {/* Mobile Layout */}
        {isMobile ? (
          <div className="space-y-6">
            {/* Spinner Section - Mobile */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                
                {/* Fixed Pointer - Always stays at top */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                  <div className="relative">
                    {/* Pointer Shadow */}
                    <div 
                      className="absolute -translate-x-1/2 translate-x-1 translate-y-1"
                      style={{ 
                        width: 0,
                        height: 0,
                        borderLeft: `${isMobile ? 12 : 16}px solid transparent`,
                        borderRight: `${isMobile ? 12 : 16}px solid transparent`,
                        borderTop: `${isMobile ? 25 : 30}px solid rgba(0, 0, 0, 0.3)`,
                      }}
                    />
                    {/* Main Pointer */}
                    <div 
                      className="transform -translate-x-1/2 filter drop-shadow-lg"
                      style={{ 
                        width: 0,
                        height: 0,
                        borderLeft: `${isMobile ? 12 : 16}px solid transparent`,
                        borderRight: `${isMobile ? 12 : 16}px solid transparent`,
                        borderTop: `${isMobile ? 25 : 30}px solid #FF1744`,
                      }}
                    />
                    {/* Pointer Accent */}
                    <div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg"
                      style={{ 
                        width: isMobile ? 6 : 8,
                        height: isMobile ? 6 : 8,
                        marginTop: isMobile ? 22 : 30
                      }}
                    />
                  </div>
                </div>

                <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-4 border border-white/20 shadow-2xl">
                  <canvas
                    ref={canvasRef}
                    className="rounded-full cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={spin}
                  />
                </div>
              </div>
              
              {/* Spin Button - Mobile */}
              <button
                onClick={spin}
                disabled={isSpinning || options.length < 2}
                className={`
                  w-full max-w-xs px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 transform
                  ${isSpinning 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 hover:scale-105 active:scale-95'
                  }
                  text-white shadow-xl disabled:opacity-50 disabled:hover:scale-100
                `}
              >
                {isSpinning ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Spinning<span className="loading-dots"></span>
                  </span>
                ) : (
                  '🎲 SPIN!'
                )}
              </button>
            </div>

            {/* Winner Display - Mobile */}
            {winner && !isSpinning && (
              <div className="text-center animate-bounce px-4">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-2xl shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <h2 className="text-xl font-bold mb-2">🎉 WINNER! 🎉</h2>
                  <div 
                    className="text-2xl font-extrabold py-3 px-4 rounded-xl shadow-lg relative"
                    style={{ backgroundColor: winner.color }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                    <span className="relative z-10">{winner.text}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Options Management - Mobile */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4 text-center">
                ⚙️ Options
              </h2>
              
              {/* Add Option - Mobile */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Enter new option..."
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                  maxLength={20}
                />
                <button
                  onClick={addOption}
                  disabled={!newOption.trim() || options.length >= 12}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                >
                  ✅ ADD OPTION
                </button>
              </div>
              
              {/* Control Buttons - Mobile */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={clearAllOptions}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-2 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-xs"
                >
                  🗑️ CLEAR
                </button>
                <button
                  onClick={() => {
                    const defaultOptions = ['Option A', 'Option B', 'Option C', 'Option D'];
                    const newOptions = defaultOptions.map((text, index) => ({
                      id: (Date.now() + index).toString(),
                      text,
                      color: COLORS[index % COLORS.length]
                    }));
                    setOptions(newOptions);
                    setWinner(null);
                    setShowHistory(false); // Switch back to options view
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-2 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-xs"
                >
                  📋 SAMPLE
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-2 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-xs"
                >
                  📊 HISTORY
                </button>
              </div>
              
              {/* Toggle between Options and History - Mobile */}
              {!showHistory ? (
                /* Options List - Mobile */
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {options.map((option) => (
                    <div 
                      key={option.id} 
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                    >
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg flex-shrink-0"
                        style={{ backgroundColor: option.color }}
                      ></div>
                      <span className="flex-1 text-white font-semibold text-sm">{option.text}</span>
                      <button
                        onClick={() => removeOption(option.id)}
                        disabled={options.length <= 2}
                        className="text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 p-1"
                        title={options.length <= 2 ? "Need at least 2 options" : "Remove option"}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* History List - Mobile */
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-bold text-sm">Past Results</h3>
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {history.length === 0 ? (
                    <div className="text-center text-white/60 py-8 text-sm">
                      No spins yet! Start spinning to see your history.
                    </div>
                  ) : (
                    history.map((entry, index) => (
                      <div 
                        key={entry.id} 
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="text-white/60 text-xs font-mono w-6">
                          #{history.length - index}
                        </div>
                        <div 
                          className="w-4 h-4 rounded-full border border-white/50 flex-shrink-0"
                          style={{ backgroundColor: entry.winner.color }}
                        ></div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{entry.winner.text}</div>
                          <div className="text-white/50 text-xs">
                            {entry.timestamp.toLocaleTimeString()} • {entry.totalOptions} options
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              {/* Stats - Mobile */}
              <div className="mt-4 text-center">
                <p className="text-white/80 text-sm">
                  {options.length}/{12} options • {options.length >= 2 ? '✅ Ready!' : '❌ Need 2+'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
            {/* Spinner Section - Desktop */}
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                
                {/* Fixed Pointer - Always stays at top */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                  <div className="relative">
                    {/* Pointer Shadow */}
                    <div 
                      className="absolute -translate-x-1/2 translate-x-1 translate-y-1"
                      style={{ 
                        width: 0,
                        height: 0,
                        borderLeft: `20px solid transparent`,
                        borderRight: `20px solid transparent`,
                        borderTop: `35px solid rgba(0, 0, 0, 0.3)`,
                      }}
                    />
                    {/* Main Pointer */}
                    <div 
                      className="transform -translate-x-1/2 filter drop-shadow-lg"
                      style={{ 
                        width: 0,
                        height: 0,
                        borderLeft: `20px solid transparent`,
                        borderRight: `20px solid transparent`,
                        borderTop: `35px solid #FF1744`,
                      }}
                    />
                    {/* Pointer Accent */}
                    <div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg"
                      style={{ 
                        width: 10,
                        height: 10,
                        marginTop: 32
                      }}
                    />
                  </div>
                </div>

                <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-8 border border-white/20 shadow-2xl">
                  <canvas
                    ref={canvasRef}
                    className="rounded-full cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={spin}
                  />
                </div>
              </div>
              
              <button
                onClick={spin}
                disabled={isSpinning || options.length < 2}
                className={`
                  px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 transform
                  ${isSpinning 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 hover:scale-110 hover:shadow-2xl active:scale-95'
                  }
                  text-white shadow-xl disabled:opacity-50 disabled:hover:scale-100
                `}
              >
                {isSpinning ? (
                  <span className="flex items-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Spinning<span className="loading-dots"></span>
                  </span>
                ) : (
                  '🎲 SPIN THE WHEEL!'
                )}
              </button>
              
              {winner && !isSpinning && (
                <div className="mt-8 text-center animate-bounce">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    <h2 className="text-3xl font-bold mb-2">🎉 WINNER! 🎉</h2>
                    <div 
                      className="text-4xl font-extrabold py-4 px-8 rounded-xl shadow-lg relative"
                      style={{ backgroundColor: winner.color }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                      <span className="relative z-10">{winner.text}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Options Management - Desktop */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                ⚙️ Manage Options
              </h2>
              
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Enter new option..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                  maxLength={25}
                />
                <button
                  onClick={addOption}
                  disabled={!newOption.trim() || options.length >= 12}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                >
                  ✅ ADD
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={clearAllOptions}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-3 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
                >
                  🗑️ CLEAR ALL
                </button>
                <button
                  onClick={() => {
                    const defaultOptions = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F'];
                    const newOptions = defaultOptions.map((text, index) => ({
                      id: (Date.now() + index).toString(),
                      text,
                      color: COLORS[index % COLORS.length]
                    }));
                    setOptions(newOptions);
                    setWinner(null);
                    setShowHistory(false); // Switch back to options view
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-3 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
                >
                  📋 SAMPLE
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-3 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
                >
                  📊 HISTORY
                </button>
              </div>
              
              {/* Toggle between Options and History - Desktop */}
              {!showHistory ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {options.map((option) => (
                    <div 
                      key={option.id} 
                      className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 transform hover:scale-102 group"
                    >
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex-shrink-0 relative overflow-hidden"
                        style={{ backgroundColor: option.color }}
                      >
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-all duration-200"></div>
                      </div>
                      <span className="flex-1 text-white font-semibold text-lg">{option.text}</span>
                      <button
                        onClick={() => removeOption(option.id)}
                        disabled={options.length <= 2}
                        className="text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 p-2 hover:bg-red-500/20 rounded-lg group"
                        title={options.length <= 2 ? "Need at least 2 options" : "Remove option"}
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* History List - Desktop */
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">Past Results</h3>
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {history.length === 0 ? (
                    <div className="text-center text-white/60 py-12 text-lg">
                      No spins yet! Start spinning to see your history.
                    </div>
                  ) : (
                    history.map((entry, index) => (
                      <div 
                        key={entry.id} 
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="text-white/60 text-sm font-mono w-8">
                          #{history.length - index}
                        </div>
                        <div 
                          className="w-6 h-6 rounded-full border border-white/50 flex-shrink-0"
                          style={{ backgroundColor: entry.winner.color }}
                        ></div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-lg">{entry.winner.text}</div>
                          <div className="text-white/50 text-sm">
                            {entry.timestamp.toLocaleTimeString()} • {entry.totalOptions} options available
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-white/80">
                  {options.length}/{12} options • {options.length >= 2 ? '✅ Ready to spin!' : '❌ Need at least 2 options'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p className="text-sm sm:text-lg">✨ Made with love for better decision making ✨</p>
          {!isMobile && (
            <p className="text-xs sm:text-sm mt-2">🎯 Watch as your choice spins to the top!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;