import React, { useEffect, useRef } from 'react';
import { AdItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface HtmlAdRendererProps {
  ad: AdItem;
  className?: string;
  showBadge?: boolean;
}

export const HtmlAdRenderer: React.FC<HtmlAdRendererProps> = ({
  ad,
  className = '',
  showBadge = true
}) => {
  const { recordAdClick, recordAdImpression } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  // Record impression
  useEffect(() => {
    if (ad.active) {
      recordAdImpression(ad.id);
    }
  }, [ad.id, ad.active]);

  // Execute scripts if present and handle click tracking
  useEffect(() => {
    if (!containerRef.current || !ad.htmlCode) return;

    const container = containerRef.current;
    container.innerHTML = ad.htmlCode;

    // Execute scripts contained in htmlCode (e.g. AdSense, custom trackers)
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.text = oldScript.text;
      if (oldScript.parentNode) {
        oldScript.parentNode.replaceChild(newScript, oldScript);
      }
    });

    // Intercept clicks on links or elements to record clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('[data-ad-click]')) {
        recordAdClick(ad.id);
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [ad.id, ad.htmlCode]);

  if (!ad.htmlCode) return null;

  return (
    <div className={`relative group html-ad-container ${className}`}>
      {showBadge && (
        <div className="absolute top-1 end-2 z-10 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-400 border border-slate-800">
            {ad.badge || 'إعلان'}
          </span>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full overflow-hidden text-start rounded-2xl"
      />
    </div>
  );
};
