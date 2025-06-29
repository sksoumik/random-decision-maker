import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit2, Check, AlertCircle } from 'lucide-react';
import { Option, OptionsManagerProps } from '../../types';
import { createOption } from '../../utils';
import { MIN_OPTIONS, MAX_OPTIONS, DEFAULT_OPTION_COLORS } from '../../constants';

const OptionsManager: React.FC<OptionsManagerProps> = ({
  options,
  onOptionsChange,
  maxOptions = MAX_OPTIONS,
  minOptions = MIN_OPTIONS,
  history = [],
  onClearHistory,
  onClearAllOptions,
}) => {
  const [newOptionText, setNewOptionText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleAddOption = () => {
    const text = newOptionText.trim();
    if (!text) {
      setError('Option text cannot be empty');
      return;
    }

    if (options.length >= maxOptions) {
      setError(`Maximum ${maxOptions} options allowed`);
      return;
    }

    const existingTexts = options.map(opt => opt.text.toLowerCase());
    if (existingTexts.includes(text.toLowerCase())) {
      setError('This option already exists');
      return;
    }

    const colorIndex = options.length % DEFAULT_OPTION_COLORS.length;
    const newOption = createOption(text, DEFAULT_OPTION_COLORS[colorIndex]);
    const newOptions = [...options, newOption];

    onOptionsChange(newOptions);
    setNewOptionText('');
    setError(null);
  };

  const handleRemoveOption = (id: string) => {
    const newOptions = options.filter(option => option.id !== id);
    
    if (newOptions.length < minOptions) {
      setError(`Minimum ${minOptions} options required`);
      return;
    }

    onOptionsChange(newOptions);
    setError(null);
  };

  const handleEditStart = (option: Option) => {
    setEditingId(option.id);
    setEditingText(option.text);
    setError(null);
  };

  const handleEditSave = () => {
    if (!editingId) return;

    const text = editingText.trim();
    if (!text) {
      setError('Option text cannot be empty');
      return;
    }

    const existingTexts = options
      .filter(opt => opt.id !== editingId)
      .map(opt => opt.text.toLowerCase());
    
    if (existingTexts.includes(text.toLowerCase())) {
      setError('This option already exists');
      return;
    }

    const newOptions = options.map(option =>
      option.id === editingId ? { ...option, text } : option
    );

    onOptionsChange(newOptions);
    setEditingId(null);
    setEditingText('');
    setError(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText('');
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'add' | 'edit') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (action === 'add') {
        handleAddOption();
      } else {
        handleEditSave();
      }
    } else if (e.key === 'Escape' && action === 'edit') {
      handleEditCancel();
    }
  };

  const clearError = () => setError(null);
  
  const handleClearAllOptions = () => {
    if (onClearAllOptions) {
      onClearAllOptions();
      setShowHistory(false);
    }
  };
  
  const handleClearHistory = () => {
    if (onClearHistory) {
      onClearHistory();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-white mb-4 text-center">
        ⚙️ {showHistory ? 'Spin History' : 'Manage Options'}
      </h2>
      
      {/* Add new option - Only show when not viewing history */}
      {!showHistory && (
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newOptionText}
              onChange={(e) => {
                setNewOptionText(e.target.value);
                clearError();
              }}
              onKeyPress={(e) => handleKeyPress(e, 'add')}
              placeholder="Enter a new option..."
              className="option-input flex-1"
              maxLength={50}
              disabled={options.length >= maxOptions}
            />
            <button
              onClick={handleAddOption}
              disabled={options.length >= maxOptions || !newOptionText.trim()}
              className="btn-primary flex items-center gap-2 px-4 py-3"
              aria-label="Add option"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            {options.length}/{maxOptions} options
          </div>
        </div>
      )}
      
      {/* Control Buttons Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={handleClearAllOptions}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white px-3 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm flex items-center justify-center gap-1"
        >
          🗑️ CLEAR ALL
        </button>
        <button
          onClick={() => {
            const sampleOptions = ['Pizza', 'Burger', 'Sushi', 'Tacos'];
            const newOptions = sampleOptions.map((text, index) => {
              const colorIndex = index % DEFAULT_OPTION_COLORS.length;
              return createOption(text, DEFAULT_OPTION_COLORS[colorIndex]);
            });
            onOptionsChange(newOptions);
            setShowHistory(false);
          }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-3 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm flex items-center justify-center gap-1"
        >
          📋 SAMPLE
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-3 py-2 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm flex items-center justify-center gap-1"
        >
          📊 HISTORY
        </button>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="error-message mb-4"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content area - Options or History */}
      <div className={`space-y-2 ${showHistory ? '' : 'max-h-60'} overflow-y-auto`}>
        {showHistory ? (
          /* History List */
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">
                {history.length} spin{history.length !== 1 ? 's' : ''} recorded
              </span>
              {history.length > 0 && onClearHistory && (
                <button
                  onClick={handleClearHistory}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear History
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No spins yet!</p>
                <p className="text-sm">Start spinning to see your history here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {history.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="text-gray-500 text-xs font-mono w-6">
                        #{history.length - index}
                      </div>
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-gray-300"
                        style={{ backgroundColor: entry.winner.color }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{entry.winner.text}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleTimeString()} • {entry.totalOptions} options
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        ) : (
          /* Options List */
          <AnimatePresence>
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="option-item"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: option.color }}
                />
                
                {editingId === option.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editingText}
                      onChange={(e) => {
                        setEditingText(e.target.value);
                        clearError();
                      }}
                      onKeyPress={(e) => handleKeyPress(e, 'edit')}
                      className="option-input flex-1 py-1 px-2 text-sm"
                      maxLength={50}
                    />
                    <button
                      onClick={handleEditSave}
                      className="text-green-600 hover:text-green-700 p-1"
                      aria-label="Save changes"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-gray-600 hover:text-gray-700 p-1"
                      aria-label="Cancel editing"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 text-gray-800 font-medium">
                      {option.text}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditStart(option)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        aria-label={`Edit ${option.text}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveOption(option.id)}
                        disabled={options.length <= minOptions}
                        className="text-red-600 hover:text-red-700 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Remove ${option.text}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {!showHistory && (
        <>
          {options.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No options yet!</p>
              <p className="text-sm">Add your first option above to get started.</p>
            </div>
          )}

          {options.length < minOptions && options.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                Add at least {minOptions - options.length} more option{minOptions - options.length !== 1 ? 's' : ''} to spin the wheel.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OptionsManager;