import React, { useState, useRef, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';

interface Option {
  id: string;
  text: string;
  color: string;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
];

function App() {
  const [options, setOptions] = useState<Option[]>([
    { id: '1', text: 'Pizza', color: COLORS[0] },
    { id: '2', text: 'Burger', color: COLORS[1] },
    { id: '3', text: 'Sushi', color: COLORS[2] },
    { id: '4', text: 'Tacos', color: COLORS[3] }
  ]);
  
  const [newOption, setNewOption] = useState('');
  const [winner, setWinner] = useState<Option | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addOption = () => {
    if (newOption.trim() && !options.find(opt => opt.text.toLowerCase() === newOption.trim().toLowerCase())) {
      const newOpt: Option = {
        id: Date.now().toString(),
        text: newOption.trim(),
        color: COLORS[options.length % COLORS.length]
      };
      setOptions([...options, newOpt]);
      setNewOption('');
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(opt => opt.id !== id));
    }
  };

  const drawSpinner = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || options.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const anglePerOption = (2 * Math.PI) / options.length;
    
    options.forEach((option, index) => {
      const startAngle = index * anglePerOption;
      const endAngle = startAngle + anglePerOption;
      
      // Draw pie slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = option.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw text
      const textAngle = startAngle + anglePerOption / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;
      
      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 2;
      ctx.fillText(option.text.length > 8 ? option.text.substring(0, 8) + '...' : option.text, 0, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#2c3e50';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [options]);

  useEffect(() => {
    drawSpinner();
  }, [drawSpinner]);

  const spin = () => {
    if (isSpinning || options.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    setShowConfetti(false);
    
    const spinDuration = 3000;
    const extraSpins = 5 + Math.random() * 5;
    const finalRotation = rotation + (360 * extraSpins) + Math.random() * 360;
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const anglePerOption = 360 / options.length;
      const winnerIndex = Math.floor((360 - normalizedRotation + anglePerOption / 2) / anglePerOption) % options.length;
      
      setWinner(options[winnerIndex]);
      setIsSpinning(false);
      setShowConfetti(true);
      
      setTimeout(() => setShowConfetti(false), 5000);
    }, spinDuration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 to-violet-500 animate-pulse"></div>
      </div>
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          colors={COLORS}
        />
      )}
      
      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse mb-4">
            🎯 Decision Spinner
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">
            Let fate decide your next move!
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Spinner Section */}
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              
              {/* Main spinner container */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-8 border border-white/20 shadow-2xl">
                {/* Pointer */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-transparent border-b-yellow-400 drop-shadow-lg"></div>
                </div>
                
                {/* Spinner Canvas */}
                <canvas
                  ref={canvasRef}
                  width={350}
                  height={350}
                  className="rounded-full cursor-pointer transition-transform duration-3000 ease-out shadow-2xl"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  onClick={spin}
                />
              </div>
            </div>
            
            {/* Spin Button */}
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
                  Spinning...
                </span>
              ) : (
                '🎲 SPIN THE WHEEL!'
              )}
            </button>
            
            {/* Winner Display */}
            {winner && !isSpinning && (
              <div className="mt-8 text-center animate-bounce">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-2xl border-4 border-yellow-400">
                  <h2 className="text-3xl font-bold mb-2">🎉 WINNER! 🎉</h2>
                  <div 
                    className="text-4xl font-extrabold py-4 px-8 rounded-xl shadow-lg"
                    style={{ backgroundColor: winner.color }}
                  >
                    {winner.text}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Options Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              ⚙️ Manage Options
            </h2>
            
            {/* Add Option */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Enter new option..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent backdrop-blur-sm"
                onKeyPress={(e) => e.key === 'Enter' && addOption()}
                maxLength={20}
              />
              <button
                onClick={addOption}
                disabled={!newOption.trim() || options.length >= 12}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
              >
                ✅ ADD
              </button>
            </div>
            
            {/* Options List */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {options.map((option) => (
                <div 
                  key={option.id} 
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 transform hover:scale-102"
                >
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex-shrink-0"
                    style={{ backgroundColor: option.color }}
                  ></div>
                  <span className="flex-1 text-white font-semibold text-lg">{option.text}</span>
                  <button
                    onClick={() => removeOption(option.id)}
                    disabled={options.length <= 2}
                    className="text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 p-2 hover:bg-red-500/20 rounded-lg"
                    title={options.length <= 2 ? "Need at least 2 options" : "Remove option"}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="mt-6 text-center">
              <p className="text-white/80">
                {options.length}/{12} options • {options.length >= 2 ? '✅ Ready to spin!' : '❌ Need at least 2 options'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-white/60">
          <p className="text-lg">✨ Made with love for better decision making ✨</p>
        </div>
      </div>
    </div>
  );
}

export default App;