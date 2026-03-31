import { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  className?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
}

export function AdBanner({ slot = 'default', className = '', format = 'auto' }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  const adClient = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXX';

  return (
    <div className={`ad-container my-8 mx-auto w-full max-w-7xl overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-2 min-h-[100px] border dark:border-zinc-800 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Fallback Placeholder for Dev */}
      {!import.meta.env.PROD && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 text-[10px] uppercase tracking-widest pointer-events-none">
          <span className="material-symbols-outlined text-sm mb-1">featured_video</span>
          Advertisement Space
        </div>
      )}
    </div>
  );
}
