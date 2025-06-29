import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Spinner,
  OptionsManager,
  WinnerAnnouncement,
  Celebration,
  LoadingSpinner,
} from '../components';
import type { SpinnerRef } from '../components/Spinner';
import { useSpinner } from '../hooks/useSpinner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Option, HistoryEntry } from '../types';
import { STORAGE_KEYS, DEFAULT_OPTION_COLORS } from '../constants';
import { createOption, getResponsiveSpinnerSize } from '../utils';

const defaultOptions: Option[] = [
  createOption('Pizza', DEFAULT_OPTION_COLORS[0]),
  createOption('Burger', DEFAULT_OPTION_COLORS[1]),
  createOption('Sushi', DEFAULT_OPTION_COLORS[2]),
  createOption('Tacos', DEFAULT_OPTION_COLORS[3]),
];

const DecisionSpinner: React.FC = () => {
  const [savedOptions, setSavedOptions] = useLocalStorage<Option[]>(
    STORAGE_KEYS.OPTIONS,
    defaultOptions
  );
  
  const [savedHistory, setSavedHistory] = useLocalStorage<HistoryEntry[]>(
    'decision-spinner-history',
    []
  );
  
  const {
    options,
    winner,
    isSpinning,
    showCelebration,
    error,
    spin,
    reset,
    updateOptions,
    clearError,
  } = useSpinner(savedOptions);

  const [showWinner, setShowWinner] = useState(false);
  const [spinnerSize, setSpinnerSize] = useState(getResponsiveSpinnerSize());
  const [isLoading, setIsLoading] = useState(true);
  // Convert timestamps to Date objects when loading from localStorage
  const convertHistoryDates = (history: HistoryEntry[]): HistoryEntry[] => {
    return history.map(entry => ({
      ...entry,
      timestamp: new Date(entry.timestamp)
    }));
  };

  const [history, setHistory] = useState<HistoryEntry[]>(() => 
    convertHistoryDates(savedHistory)
  );
  const spinnerRef = useRef<SpinnerRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSpinnerSize(getResponsiveSpinnerSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSavedOptions(options);
  }, [options, setSavedOptions]);
  
  useEffect(() => {
    setSavedHistory(history);
  }, [history, setSavedHistory]);

  useEffect(() => {
    if (winner && !isSpinning) {
      setShowWinner(true);
      
      // Add to history
      const historyEntry: HistoryEntry = {
        id: Date.now().toString(),
        winner,
        timestamp: new Date(),
        totalOptions: options.length
      };
      setHistory(prev => [historyEntry, ...prev.slice(0, 19)]); // Keep last 20 results
    }
  }, [winner, isSpinning, options.length]);

  const handleSpin = async () => {
    if (isSpinning || options.length < 2) return;
    
    clearError();
    setShowWinner(false);
    
    try {
      // Trigger the visual spinner animation immediately
      if (spinnerRef.current) {
        spinnerRef.current.spin();
      }
      
      // Use the hook's spin function which handles all the logic
      await spin();
    } catch (err) {
      console.error('Spin error:', err);
    }
  };

  const handleSpinComplete = () => {
    console.log('Spin animation completed');
    // The winner is already handled by the useSpinner hook
    // Just update history when we have a winner from the hook
  };

  const handleOptionsChange = (newOptions: Option[]) => {
    updateOptions(newOptions);
    if (winner) {
      reset();
    }
  };

  const handleCloseWinner = () => {
    setShowWinner(false);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };
  
  const handleClearAllOptions = () => {
    updateOptions([]); // Clear all options
    reset();
    setShowWinner(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Decision Spinner..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse mb-2 sm:mb-4">
          🎯 Random Decision Maker
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light px-4">
          Watch the wheel spin until your choice reaches the pointer!
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Spinner Section */}
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <Spinner
              ref={spinnerRef}
              options={options}
              onSpinComplete={handleSpinComplete}
              size={spinnerSize}
              disabled={isSpinning || options.length < 2}
            />
                
                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="error-message mt-4"
                  >
                    {error}
                  </motion.div>
                )}
                
          </div>
          
          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || options.length < 2}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-extrabold py-4 px-8 rounded-2xl text-xl shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6"
          >
            {isSpinning ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Spinning<span className="loading-dots"></span>
              </span>
            ) : (
              '🎲 SPIN THE WHEEL!'
            )}
          </button>

          {/* Winner Display */}
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
        </div>

        {/* Options Management Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl">
          <OptionsManager
            options={options}
            onOptionsChange={handleOptionsChange}
            history={history}
            onClearHistory={handleClearHistory}
            onClearAllOptions={handleClearAllOptions}
          />
          
          {/* Stats */}
          <div className="mt-4 text-center">
            <p className="text-white/80 text-sm">
              {options.length}/12 options • {options.length >= 2 ? '✅ Ready!' : '❌ Need 2+'}
            </p>
          </div>
        </div>
      </div>

      {/* Winner Announcement Modal */}
      <WinnerAnnouncement
        winner={winner}
        isVisible={showWinner}
        onClose={handleCloseWinner}
      />

      {/* Celebration Effect */}
      <Celebration isActive={showCelebration} />

      {/* Footer */}
      <footer className="py-6 text-center text-white/60 text-sm">
        <p>
          ✨ Made with love for better decision making ✨
        </p>
        <p className="mt-1 text-white/40">
          ⬇️ Watch as your choice spins to the top!
        </p>
      </footer>
    </div>
  );
};

export default DecisionSpinner;