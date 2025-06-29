import React, { useEffect, useRef } from 'react';
import { AdsService, AD_PLACEMENTS } from '../../services/adsService';

interface AdUnitProps {
  placement: keyof typeof AD_PLACEMENTS;
  className?: string;
  style?: React.CSSProperties;
}

const AdUnit: React.FC<AdUnitProps> = ({ placement, className = '', style }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adsService = AdsService.getInstance();
  const adConfig = AD_PLACEMENTS[placement];

  useEffect(() => {
    const initializeAd = async () => {
      try {
        // Initialize AdSense if not already done
        if (import.meta.env.VITE_GOOGLE_ADSENSE_ID) {
          await adsService.initialize(import.meta.env.VITE_GOOGLE_ADSENSE_ID);
        }

        // Create ad unit
        if (adRef.current) {
          adsService.createAdUnit(
            adConfig.containerId,
            adConfig.adSlot,
            adConfig.adFormat
          );
        }
      } catch (error) {
        console.error('Failed to initialize ad:', error);
      }
    };

    // Only load ads in production or when explicitly enabled
    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ADS === 'true') {
      initializeAd();
    }

    return () => {
      // Cleanup ad unit when component unmounts
      adsService.removeAdUnit(adConfig.containerId);
    };
  }, [adConfig.containerId, adConfig.adSlot, adConfig.adFormat, adsService]);

  // Don't render ads in development unless explicitly enabled
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_ADS !== 'true') {
    return (
      <div 
        className={`bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        <span className="text-gray-500 text-sm">Ad Placeholder ({placement})</span>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      id={adConfig.containerId}
      className={`ad-unit ${className}`}
      style={style}
      data-placement={placement}
    />
  );
};

export default AdUnit;