import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Youtube, Facebook, Twitter, Instagram, Send, Phone } from 'lucide-react';

export function TopBar() {
  const [currentDate, setCurrentDate] = useState('');
  const [breakingNews, setBreakingNews] = useState<Array<{ id: string; text: string; link?: string }>>([]);

  useEffect(() => {
    // Set date
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));

    // Fetch breaking news
    fetchBreakingNews();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('breaking-news')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'breaking_news_ticker' },
        () => fetchBreakingNews()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBreakingNews = async () => {
    const { data } = await supabase
      .from('breaking_news_ticker')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (data) setBreakingNews(data);
  };

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Send, href: 'https://telegram.org', label: 'Telegram' },
    { icon: Phone, href: 'https://whatsapp.com', label: 'WhatsApp' },
  ];

  return (
    <div className="bg-[#0A1628] text-white text-sm">
      {/* Top bar content */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Date */}
          <div className="flex items-center space-x-4">
            <span>{currentDate}</span>
          </div>

          {/* Center: Breaking News Ticker */}
          {breakingNews.length > 0 && (
            <div className="flex-1 mx-8 overflow-hidden">
              <div className="flex items-center">
                <span className="bg-red-600 px-2 py-1 text-xs font-bold mr-2 rounded">
                  🔴 BREAKING
                </span>
                <div className="overflow-hidden">
                  <div className="animate-marquee whitespace-nowrap">
                    {breakingNews.map((news) => (
                      <a
                        key={news.id}
                        href={news.link || '#'}
                        className="inline-block mx-4 hover:text-red-400 transition-colors"
                      >
                        {news.text}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right: Social Media Icons */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Add marquee animation styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
