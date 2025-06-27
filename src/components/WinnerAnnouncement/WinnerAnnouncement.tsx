import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, RotateCcw } from 'lucide-react';
import { WinnerAnnouncementProps } from '../../types';

const WinnerAnnouncement: React.FC<WinnerAnnouncementProps> = ({
  winner,
  isVisible,
  onClose,
}) => {
  if (!isVisible || !winner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          exit={{ scale: 0, rotateY: -180 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 20,
            delay: 0.1 
          }}
          className="modal-content text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Winner Trophy Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.3,
              type: 'spring',
              stiffness: 400,
              damping: 10
            }}
            className="mb-6"
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Trophy size={40} className="text-white" />
            </div>
          </motion.div>

          {/* Congratulations Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🎉 We have a winner! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Congratulations! The winner is:
            </p>
          </motion.div>

          {/* Winner Display */}
          <motion.div
            initial={{ scale: 0, rotateZ: -10 }}
            animate={{ scale: 1, rotateZ: 0 }}
            transition={{ 
              delay: 0.7,
              type: 'spring',
              stiffness: 300,
              damping: 15
            }}
            className="mb-8"
          >
            <div className="relative">
              <div
                className="inline-block px-8 py-4 rounded-xl text-white font-bold text-2xl shadow-xl transform -rotate-1"
                style={{ backgroundColor: winner.color }}
              >
                {winner.text}
              </div>
              
              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="absolute -top-2 -right-2 text-4xl"
              >
                ⭐
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 0.5
                }}
                className="absolute -bottom-1 -left-3 text-3xl"
              >
                🎊
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-3 justify-center"
          >
            <button
              onClick={onClose}
              className="btn-primary flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Spin Again
            </button>
            
            <button
              onClick={onClose}
              className="btn-secondary flex items-center gap-2"
            >
              <X size={16} />
              Close
            </button>
          </motion.div>

          {/* Close button in corner */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close winner announcement"
          >
            <X size={20} />
          </button>

          {/* Floating particles animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  y: '100%',
                  x: `${Math.random() * 100}%`,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: '-20%',
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3 + 2
                }}
                className="absolute text-2xl"
              >
                {['🎉', '🎊', '⭐', '💫', '✨'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinnerAnnouncement;