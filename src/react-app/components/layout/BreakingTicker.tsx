import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LATEST_NEWS } from '../../data/initialNews';

interface BreakingNewsItem {
  id: string;
  text: string;
  link?: string;
  is_active: boolean;
}

export function BreakingTicker() {
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);

  const fetchBreakingNews = async () => {
    try {
      const { data, error } = await supabase
        .from('breaking_news_ticker')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (data && !error && data.length > 0) {
        setBreakingNews(data);
      } else {
        // Fallback to real news content
        const fallbacks = LATEST_NEWS.slice(0, 5).map(a => ({
          id: a.id,
          text: a.title,
          link: `/article/${a.slug}`,
          is_active: true
        }));
        setBreakingNews(fallbacks as any);
      }
    } catch {
       const fallbacks = LATEST_NEWS.slice(0, 5).map(a => ({
          id: a.id,
          text: a.title,
          link: `/article/${a.slug}`,
          is_active: true
        }));
        setBreakingNews(fallbacks as any);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  if (breakingNews.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#C8102E]/90 backdrop-blur-md text-white py-2 overflow-hidden border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <span className="bg-white/20 px-3 py-1 text-xs font-bold rounded mr-4 whitespace-nowrap flex items-center animate-pulse">
            🔴 LIVE
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap">
              {breakingNews.map((news, index) => (
                <span key={news.id} className="inline-block mx-4">
                  {news.link ? (
                    <Link
                      to={news.link}
                      className="hover:text-gray-200 transition-colors font-semibold tracking-tight"
                    >
                      {news.text}
                    </Link>
                  ) : (
                    <span className="font-semibold tracking-tight">{news.text}</span>
                  )}
                  {index < breakingNews.length - 1 && (
                    <span className="mx-6 text-white/40 font-black">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
