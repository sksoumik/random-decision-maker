import { useState, useCallback, useRef } from 'react';
import { Option, SpinnerState, SpinnerConfig } from '../types';
import { DEFAULT_SPINNER_CONFIG } from '../constants';
import { selectRandomOption, calculateSpinAngle, validateOptions, formatError } from '../utils';

export const useSpinner = (initialOptions: Option[] = []) => {
  const [state, setState] = useState<SpinnerState>({
    isSpinning: false,
    winner: null,
    options: initialOptions,
    showCelebration: false,
    spinAngle: 0,
  });

  const [error, setError] = useState<string | null>(null);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const celebrationTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const updateOptions = useCallback((newOptions: Option[]) => {
    setError(null);
    setState(prev => ({
      ...prev,
      options: newOptions,
      winner: null,
      showCelebration: false,
    }));
  }, []);

  const spin = useCallback(async (config: Partial<SpinnerConfig> = {}) => {
    try {
      const validationError = validateOptions(state.options);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      const finalConfig = { ...DEFAULT_SPINNER_CONFIG, ...config };
      
      setState(prev => ({
        ...prev,
        isSpinning: true,
        winner: null,
        showCelebration: false,
      }));

      const winner = selectRandomOption(state.options);
      const winnerIndex = state.options.findIndex(option => option.id === winner.id);
      const spinAngle = calculateSpinAngle(
        winnerIndex,
        state.options.length,
        finalConfig.minSpins,
        finalConfig.maxSpins
      );

      setState(prev => ({
        ...prev,
        spinAngle,
      }));

      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }

      spinTimeoutRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          isSpinning: false,
          winner,
          showCelebration: true,
        }));

        if (celebrationTimeoutRef.current) {
          clearTimeout(celebrationTimeoutRef.current);
        }

        celebrationTimeoutRef.current = setTimeout(() => {
          setState(prev => ({
            ...prev,
            showCelebration: false,
          }));
        }, 5000);
      }, finalConfig.duration);

    } catch (err) {
      setError(formatError(err));
      setState(prev => ({
        ...prev,
        isSpinning: false,
      }));
    }
  }, [state.options]);

  const reset = useCallback(() => {
    if (spinTimeoutRef.current) {
      clearTimeout(spinTimeoutRef.current);
    }
    if (celebrationTimeoutRef.current) {
      clearTimeout(celebrationTimeoutRef.current);
    }

    setState(prev => ({
      ...prev,
      isSpinning: false,
      winner: null,
      showCelebration: false,
      spinAngle: 0,
    }));
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    ...state,
    error,
    spin,
    reset,
    updateOptions,
    clearError,
  };
};