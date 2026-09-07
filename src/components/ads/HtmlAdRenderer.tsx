import React, { useEffect, useRef } from 'react';
import { AdItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Sparkles } from 'lucide-react';

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

  // Compute effective HTML code, with fallback if empty
  const rawHtml = ad.htmlCode?.trim();
  const effectiveHtml = rawHtml || `<div style="background: linear-gradient(135deg, #090d16 0%, #1e293b 100%); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 16px; padding: 16px; color: #fff; direction: rtl; text-align: right; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">⭐</div>
        <div>
          <div style="font-size: 11px; color: #fbbf24; font-weight: 800;">${ad.badge || 'إعلان معتمد'}</div>
          <h4 style="margin: 2px 0; font-size: 15px; font-weight: 800; color: #fff;">${ad.title}</h4>
          <p style="margin: 0; font-size: 12px; color: #cbd5e1;">${ad.description || 'تواصل معنا مباشرة عبر واتساب للمزيد من التفاصيل.'}</p>
        </div>
      </div>
      <a href="${ad.ctaLink || 'https://wa.me/971501234567'}" target="_blank" rel="noopener noreferrer" style="background: #fbbf24; color: #020617; padding: 8px 16px; border-radius: 10px; text-decoration: none; font-size: 12px; font-weight: 900; display: inline-flex; align-items: center; gap: 6px;">
        <span>${ad.ctaText || 'تواصل عبر واتساب'}</span> 💬
      </a>
    </div>
  </div>`;

  // Record impression
  useEffect(() => {
    if (ad.active) {
      recordAdImpression(ad.id);
    }
  }, [ad.id, ad.active]);

  // Execute scripts if present and handle click tracking
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // React dangerouslySetInnerHTML already puts innerHTML into the container.
    // Browsers do not execute <script> tags injected via innerHTML.
    // Safely re-create and execute any <script> elements:
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      if (oldScript.getAttribute('data-ad-script-executed') === 'true') return;
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.setAttribute('data-ad-script-executed', 'true');
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
  }, [ad.id, effectiveHtml]);

  return (
    <div className={`relative group html-ad-container w-full ${className}`}>
      {showBadge && (
        <div className="absolute top-1 end-2 z-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-400 border border-slate-800 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {ad.badge || 'إعلان'}
          </span>
        </div>
      )}

      <div 
        ref={containerRef} 
        dangerouslySetInnerHTML={{ __html: effectiveHtml }}
        className="w-full overflow-hidden text-start rounded-2xl min-h-[50px]"
      />

      {/* Rendered HTML content */}
    </div>
  );
};
