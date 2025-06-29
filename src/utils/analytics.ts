// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-59P7ZJ3QN6';

// Initialize Google Analytics (GA is already loaded via HTML script tags)
export const initGA = () => {
  if (typeof window === 'undefined') {
    return;
  }
  
  // GA is already initialized via HTML script tags
  console.log('Google Analytics ready with ID:', GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.origin + url,
    page_path: url,
  });
  
  console.log('GA Page view tracked:', url, title);
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
  
  console.log('GA Event tracked:', action, category, label, value);
};

// Track wheel spins
export const trackSpin = (optionCount: number, winner: string) => {
  trackEvent('spin', 'wheel', `${optionCount}_options`, optionCount);
  trackEvent('winner_selected', 'wheel', winner);
};

// Track option management
export const trackOptionAction = (action: 'add' | 'remove' | 'edit' | 'clear', optionCount?: number) => {
  trackEvent(action, 'options', undefined, optionCount);
};

// Track navigation
export const trackNavigation = (page: string) => {
  trackEvent('navigate', 'navigation', page);
};