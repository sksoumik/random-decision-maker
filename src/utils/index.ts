import { Option } from '../types';
import { DEFAULT_OPTION_COLORS, ERROR_MESSAGES } from '../constants';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getRandomColor = (): string => {
  return DEFAULT_OPTION_COLORS[Math.floor(Math.random() * DEFAULT_OPTION_COLORS.length)];
};

export const validateOptions = (options: Option[]): string | null => {
  if (!options || options.length === 0) {
    return ERROR_MESSAGES.INSUFFICIENT_OPTIONS;
  }

  if (options.length < 2) {
    return ERROR_MESSAGES.INSUFFICIENT_OPTIONS;
  }

  if (options.length > 20) {
    return ERROR_MESSAGES.TOO_MANY_OPTIONS;
  }

  const emptyOptions = options.filter(option => !option.text.trim());
  if (emptyOptions.length > 0) {
    return ERROR_MESSAGES.EMPTY_OPTION;
  }

  const texts = options.map(option => option.text.trim().toLowerCase());
  const uniqueTexts = new Set(texts);
  if (texts.length !== uniqueTexts.size) {
    return ERROR_MESSAGES.DUPLICATE_OPTION;
  }

  return null;
};

export const createOption = (text: string, color?: string): Option => {
  return {
    id: generateId(),
    text: text.trim(),
    color: color || getRandomColor(),
    weight: 1,
  };
};

export const reassignColors = (options: Option[]): Option[] => {
  return options.map((option, index) => ({
    ...option,
    color: DEFAULT_OPTION_COLORS[index % DEFAULT_OPTION_COLORS.length]
  }));
};

export const calculateSpinAngle = (
  optionIndex: number,
  totalOptions: number,
  minSpins: number = 5,
  maxSpins: number = 10
): number => {
  const sectionAngle = 360 / totalOptions;
  const targetAngle = optionIndex * sectionAngle + (sectionAngle / 2);
  const extraSpins = Math.random() * (maxSpins - minSpins) + minSpins;
  const finalAngle = (360 * extraSpins) + (360 - targetAngle);
  
  return Math.round(finalAngle);
};

export const selectRandomOption = (options: Option[]): Option => {
  const totalWeight = options.reduce((sum, option) => sum + (option.weight || 1), 0);
  let random = Math.random() * totalWeight;
  
  for (const option of options) {
    random -= option.weight || 1;
    if (random <= 0) {
      return option;
    }
  }
  
  return options[options.length - 1];
};

export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return ERROR_MESSAGES.GENERAL_ERROR;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }
  return defaultValue;
};

export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024;
};

export const getResponsiveSpinnerSize = (): number => {
  const width = window.innerWidth;
  if (width < 640) return 250; // Mobile
  if (width < 768) return 300; // Large mobile
  if (width < 1024) return 350; // Tablet
  return 400; // Desktop
};