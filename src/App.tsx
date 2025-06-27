import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Settings, Info } from 'lucide-react';
import {
  Spinner,
  OptionsManager,
  WinnerAnnouncement,
  Celebration,
  ErrorBoundary,
  LoadingSpinner,
} from './components';
import { useSpinner } from './hooks/useSpinner';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Option } from './types';
import { STORAGE_KEYS, DEFAULT_OPTION_COLORS } from './constants';
import { createOption, getResponsiveSpinnerSize } from './utils';

const defaultOptions: Option[] = [
  createOption('Pizza', DEFAULT_OPTION_COLORS[0]),
  createOption('Burger', DEFAULT_OPTION_COLORS[1]),
  createOption('Sushi', DEFAULT_OPTION_COLORS[2]),
  createOption('Tacos', DEFAULT_OPTION_COLORS[3]),
];

function App() {
  const [savedOptions, setSavedOptions] = useLocalStorage<Option[]>(
    STORAGE_KEYS.OPTIONS,
    defaultOptions
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
  const [showOptionsManager, setShowOptionsManager] = useState(false);
  const [spinnerSize, setSpinnerSize] = useState(getResponsiveSpinnerSize());
  const [isLoading, setIsLoading] = useState(true);

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
    if (winner && !isSpinning) {
      setShowWinner(true);
    }
  }, [winner, isSpinning]);

  const handleSpin = async () => {
    if (isSpinning || options.length < 2) return;
    
    clearError();
    setShowWinner(false);
    
    try {
      await spin();
    } catch (err) {
      console.error('Spin error:', err);
    }
  };

  const handleSpinComplete = (selectedOption: Option) => {
    console.log('Spin completed, winner:', selectedOption);
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

  const handleReset = () => {
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
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 bg-pattern">
        {/* Header */}
        <header className="py-6 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center text-gray-800 font-display"
            >
              🎯 Decision Spinner
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-600 mt-2 text-lg"
            >
              Let fate decide! Add your options and spin the wheel.
            </motion.p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Spinner Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="card text-center mb-6">
                  <Spinner
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
                  
                  {/* Spin Button */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleSpin}
                      disabled={isSpinning || options.length < 2}
                      className="btn-primary w-full max-w-xs mx-auto flex items-center justify-center gap-3 text-lg py-4"
                    >
                      {isSpinning ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Shuffle size={20} />
                      )}
                      {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                    </button>
                    
                    {winner && !isSpinning && (
                      <button
                        onClick={handleReset}
                        className="btn-secondary w-full max-w-xs mx-auto flex items-center justify-center gap-2"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="glass rounded-lg p-4 text-center"
                >
                  <p className="text-sm text-gray-600">
                    {options.length} option{options.length !== 1 ? 's' : ''} available
                    {options.length >= 2 && (
                      <span className="text-green-600 ml-1">✓ Ready to spin!</span>
                    )}
                  </p>
                </motion.div>
              </motion.div>

              {/* Options Management Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col"
              >
                <OptionsManager
                  options={options}
                  onOptionsChange={handleOptionsChange}
                />
                
                {/* Controls */}
                <div className="mt-6 flex gap-3 justify-center">
                  <button
                    onClick={() => setShowOptionsManager(!showOptionsManager)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Settings size={16} />
                    {showOptionsManager ? 'Hide' : 'Show'} Settings
                  </button>
                  
                  <button
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => {
                      // You could add a help modal here
                    }}
                  >
                    <Info size={16} />
                    Help
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Winner Announcement Modal */}
        <WinnerAnnouncement
          winner={winner}
          isVisible={showWinner}
          onClose={handleCloseWinner}
        />

        {/* Celebration Effect */}
        <Celebration isActive={showCelebration} />

        {/* Footer */}
        <footer className="py-6 text-center text-gray-500 text-sm">
          <p>
            Made with ❤️ for better decision making
          </p>
          <p className="mt-1">
            © 2024 Decision Spinner. All rights reserved.
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;