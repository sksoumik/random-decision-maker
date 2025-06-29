// Google Ads Integration Service
// This is a placeholder for Google AdSense integration

export class AdsService {
  private static instance: AdsService;
  private isInitialized = false;
  private adUnits: string[] = [];

  private constructor() {}

  public static getInstance(): AdsService {
    if (!AdsService.instance) {
      AdsService.instance = new AdsService();
    }
    return AdsService.instance;
  }

  public async initialize(publisherId: string): Promise<void> {
    try {
      if (this.isInitialized) return;

      // Load Google AdSense script
      await this.loadAdSenseScript(publisherId);
      
      this.isInitialized = true;
      console.log('Google AdSense initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google AdSense:', error);
    }
  }

  private loadAdSenseScript(publisherId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src*="adsbygoogle.js"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load AdSense script'));
      
      document.head.appendChild(script);
    });
  }

  public createAdUnit(
    containerId: string,
    adSlot: string,
    adFormat: 'auto' | 'rectangle' | 'vertical' | 'horizontal' = 'auto'
  ): void {
    if (!this.isInitialized) {
      console.warn('AdSense not initialized. Call initialize() first.');
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    // Create ad element
    const adElement = document.createElement('ins');
    adElement.className = 'adsbygoogle';
    adElement.style.display = 'block';
    adElement.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXXX'); // Replace with actual publisher ID
    adElement.setAttribute('data-ad-slot', adSlot);
    adElement.setAttribute('data-ad-format', adFormat);
    adElement.setAttribute('data-full-width-responsive', 'true');

    container.appendChild(adElement);

    try {
      // Push ad to AdSense
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
      
      this.adUnits.push(containerId);
      console.log(`Ad unit created in container: ${containerId}`);
    } catch (error) {
      console.error('Failed to create ad unit:', error);
    }
  }

  public refreshAds(): void {
    try {
      const adsbyGoogle = (window as unknown as { adsbygoogle?: { loaded?: boolean, push: (arg: unknown) => void } }).adsbygoogle;
      if (adsbyGoogle && adsbyGoogle.loaded) {
        adsbyGoogle.push({});
      }
    } catch (error) {
      console.error('Failed to refresh ads:', error);
    }
  }

  public getAdUnits(): string[] {
    return [...this.adUnits];
  }

  public removeAdUnit(containerId: string): void {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
      this.adUnits = this.adUnits.filter(id => id !== containerId);
    }
  }
}

// Ad placement configurations for different screen sizes
export const AD_PLACEMENTS = {
  HEADER_BANNER: {
    containerId: 'header-ad',
    adSlot: '1234567890',
    adFormat: 'horizontal' as const,
    sizes: {
      mobile: '320x50',
      tablet: '728x90',
      desktop: '970x90',
    },
  },
  SIDEBAR: {
    containerId: 'sidebar-ad',
    adSlot: '2345678901',
    adFormat: 'vertical' as const,
    sizes: {
      mobile: '300x250',
      tablet: '300x600',
      desktop: '336x280',
    },
  },
  FOOTER_BANNER: {
    containerId: 'footer-ad',
    adSlot: '3456789012',
    adFormat: 'horizontal' as const,
    sizes: {
      mobile: '320x50',
      tablet: '728x90',
      desktop: '970x90',
    },
  },
  INTERSTITIAL: {
    containerId: 'interstitial-ad',
    adSlot: '4567890123',
    adFormat: 'auto' as const,
    showAfterSpins: 5, // Show after every 5 spins
  },
} as const;

export default AdsService;