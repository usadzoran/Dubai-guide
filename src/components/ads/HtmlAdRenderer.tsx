import React, { useEffect, useRef, useState } from 'react';
import { AdItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { Code, ExternalLink, Sparkles } from 'lucide-react';

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
  const [adSenseLoaded, setAdSenseLoaded] = useState(false);

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

  // Detect AdSense
  const isAdSense = effectiveHtml.includes('adsbygoogle') || effectiveHtml.includes('pagead2.googlesyndication.com');
  const adClientMatch = effectiveHtml.match(/data-ad-client="([^"]+)"/) || effectiveHtml.match(/client=(ca-pub-[a-zA-Z0-9]+)/);
  const adSlotMatch = effectiveHtml.match(/data-ad-slot="([^"]+)"/);
  const adClient = adClientMatch ? adClientMatch[1] : undefined;
  const adSlot = adSlotMatch ? adSlotMatch[1] : undefined;

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

    // Check if AdSense iframe is loaded
    if (isAdSense) {
      const checkAdSenseIframe = () => {
        const hasIframe = Boolean(container.querySelector('iframe'));
        if (hasIframe) {
          setAdSenseLoaded(true);
        }
      };
      checkAdSenseIframe();
      const interval = setInterval(checkAdSenseIframe, 1500);
      return () => clearInterval(interval);
    }

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
  }, [ad.id, effectiveHtml, isAdSense]);

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

      {/* AdSense Placeholder/Notice when in Sandbox / awaiting Google verification */}
      {isAdSense && !adSenseLoaded && (
        <div className="mt-2 p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20 shrink-0">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">كود Google AdSense نشط</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  مثبت وجاهز
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {adClient && <span>الناشر: {adClient}</span>}
                {adSlot && <span className="ms-2">المساحة: {adSlot}</span>}
              </div>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md">
            تظهر الإعلانات الحية فور مراجعة Google لنطاق موقعك الرسمي
          </span>
        </div>
      )}
    </div>
  );
};
