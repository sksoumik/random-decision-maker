import { SpinnerConfig, CelebrationConfig } from '../types';

export const DEFAULT_SPINNER_CONFIG: SpinnerConfig = {
  duration: 3000,
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
  minSpins: 5,
  maxSpins: 10,
};

export const DEFAULT_CELEBRATION_CONFIG: CelebrationConfig = {
  duration: 5000,
  particleCount: 200,
  colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
};

export const DEFAULT_OPTION_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  '#F1948A', '#85C1E9', '#F4D03F', '#A569BD', '#5DADE2', '#58D68D',
];

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 20;
export const DEFAULT_SPINNER_SIZE = 300;

export const ERROR_MESSAGES = {
  INSUFFICIENT_OPTIONS: 'Please add at least 2 options to spin.',
  TOO_MANY_OPTIONS: `Maximum ${MAX_OPTIONS} options allowed.`,
  EMPTY_OPTION: 'Option text cannot be empty.',
  DUPLICATE_OPTION: 'Duplicate options are not allowed.',
  SPINNER_ERROR: 'An error occurred while spinning. Please try again.',
  GENERAL_ERROR: 'Something went wrong. Please refresh the page.',
} as const;

export const STORAGE_KEYS = {
  OPTIONS: 'decision-spinner-options',
  SETTINGS: 'decision-spinner-settings',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

export const ANIMATIONS = {
  BOUNCE_IN: 'animate-bounce-in',
  FADE_IN: 'animate-fade-in',
  SPIN_SLOW: 'animate-spin-slow',
  SPIN_FAST: 'animate-spin-fast',
  CELEBRATION: 'animate-celebration',
} as const;