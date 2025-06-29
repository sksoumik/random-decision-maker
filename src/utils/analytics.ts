// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-59P7ZJ3QN6';

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    console.warn('Google Analytics: Measurement ID not found');
    return;
  }

  // Dynamically load the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag config once script loads
  script.onload = () => {
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false, // We'll handle page views manually
      });
    }
  };

  // Initialize immediately if gtag is already available
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: false,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
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