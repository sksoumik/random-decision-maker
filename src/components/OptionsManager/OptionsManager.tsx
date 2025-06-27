import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Edit2, Check, AlertCircle } from 'lucide-react';
import { Option, OptionsManagerProps } from '../../types';
import { createOption, validateOptions } from '../../utils';
import { MIN_OPTIONS, MAX_OPTIONS } from '../../constants';

const OptionsManager: React.FC<OptionsManagerProps> = ({
  options,
  onOptionsChange,
  maxOptions = MAX_OPTIONS,
  minOptions = MIN_OPTIONS,
}) => {
  const [newOptionText, setNewOptionText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [error, setError] = useState<string | null>(null);
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

    const newOption = createOption(text);
    const newOptions = [...options, newOption];
    
    const validationError = validateOptions(newOptions);
    if (validationError) {
      setError(validationError);
      return;
    }

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

    const validationError = validateOptions(newOptions);
    if (validationError) {
      setError(validationError);
      return;
    }

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

  return (
    <div className="card w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Manage Options
      </h2>
      
      {/* Add new option */}
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

      {/* Options list */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
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
      </div>

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
    </div>
  );
};

export default OptionsManager;