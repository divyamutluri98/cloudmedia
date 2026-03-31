import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Clock, BarChart2, Radio, Play } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_NEWS } from '../../data/initialNews';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  category_id: string;
  published_at: string | null;
  is_breaking?: boolean;
  categories?: { name: string; slug: string; color: string };
}

export function HeroSlider() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const fetchFeaturedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(name, slug, color)')
        .eq('is_featured', true)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(5);

      if (data && !error && data.length > 0) {
        setArticles(data as any);
      } else {
        setArticles(LATEST_NEWS.slice(0, 5) as any);
      }
    } catch {
      setArticles(LATEST_NEWS.slice(0, 5) as any);
    }
  };

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  useEffect(() => {
    if (isAutoPlaying && articles.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
      }, 8000); // 8s for more cinematic feel
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, articles.length]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    setIsAutoPlaying(false);
  };

  if (articles.length === 0) {
    return <div className="h-[500px] md:h-[750px] bg-zinc-950 animate-pulse rounded-[3rem] mx-6 my-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <Radio className="w-12 h-12 text-red-600 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 font-tech">Re-Initializing Intelligence...</span>
        </div>
    </div>;
  }

  return (
    <div className="relative group/slider px-4 md:px-0 mt-6">
      <div className="relative h-[600px] md:h-[850px] sm:mx-6 md:mx-10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-4 border-white/5 bg-zinc-950">
        
        {/* Magic Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 z-30 bg-white/5 overflow-hidden">
            <motion.div 
                key={`progress-${currentIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
            />
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Background Zooming Layer */}
            <motion.div
              initial={{ scale: 1.2, rotate: 1 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 10, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${articles[currentIndex].featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000'})`
              }}
            />
            
            {/* Multi-layered Cinematic Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            
            {/* Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-10 md:p-24 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl space-y-8"
              >
                {/* Meta Labels */}
                <div className="flex flex-wrap items-center gap-4">
                  <Badge className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-red-900/40 border-none flex items-center gap-2">
                     <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
                     Live Update
                  </Badge>
                  <div className="glassy border-white/10 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                    {articles[currentIndex].categories?.name || 'Global News'}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300 text-[10px] font-black bg-black/50 px-4 py-2 rounded-full backdrop-blur-3xl uppercase tracking-widest border border-white/5 font-tech">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    {formatDate(articles[currentIndex].published_at)}
                  </div>
                </div>
                
                {/* Main Heading */}
                <Link to={`/article/${articles[currentIndex].slug}`} className="block group/title">
                  <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter group-hover:text-red-500 transition-all duration-700 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-display">
                    {articles[currentIndex].title}
                  </h1>
                </Link>
                
                {/* Description */}
                {articles[currentIndex].excerpt && (
                  <p className="text-zinc-300 text-lg md:text-2xl font-bold line-clamp-2 max-w-4xl leading-tight opacity-80 uppercase tracking-tight">
                    {articles[currentIndex].excerpt}
                  </p>
                )}
                
                {/* Global Metrics Bar (Magic UI element) */}
                <div className="flex flex-wrap items-center gap-10 pt-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-tech">Sentiment</span>
                        <div className="flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-green-500" />
                            <span className="text-white font-black text-xs font-tech tracking-wider">POSITIVE SIGNAL</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-tech">Confidence</span>
                        <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "94%" }}
                                transition={{ duration: 1.5, delay: 1.5 }}
                                className="h-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Main CTA */}
                <div className="flex flex-wrap items-center gap-8 pt-6">
                  <Link to={`/article/${articles[currentIndex].slug}`}>
                    <Button 
                        size="lg" 
                        className="bg-white text-black hover:bg-red-600 hover:text-white px-10 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.2em] transition-all group/btn shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
                    >
                        Initialize Briefing
                        <Play className="ml-3 w-4 h-4 fill-current group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <div className="flex items-center gap-3 text-zinc-400 font-black text-[10px] tracking-widest uppercase font-tech">
                    <Clock className="w-4 h-4 text-zinc-600" />
                    <span>Estimated 6m Pulse</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Nav Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-10 right-10 flex justify-between z-20 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-all duration-500">
          <button
            onClick={prevSlide}
            className="pointer-events-auto bg-black/40 hover:bg-red-600 backdrop-blur-3xl text-white p-7 rounded-full transition-all duration-500 border border-white/5 shadow-3xl hover:scale-110 active:scale-90"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto bg-black/40 hover:bg-red-600 backdrop-blur-3xl text-white p-7 rounded-full transition-all duration-500 border border-white/5 shadow-3xl hover:scale-110 active:scale-90"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>

        {/* Global Signal Indicator (Bottom Right) */}
        <div className="absolute bottom-12 right-12 z-20 hidden lg:flex items-center gap-4">
             <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest font-tech">Active Signal</span>
                <span className="text-white font-black text-xs uppercase font-tech tracking-wider">SATCOM_ALPHA_7</span>
             </div>
             <div className="w-12 h-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl flex items-center justify-center p-3">
                <Radio className="w-full h-full text-red-600 animate-pulse" />
             </div>
        </div>
      </div>

      {/* Modern Slide Indicators */}
      <div className="flex justify-center mt-12 space-x-4">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className="group relative h-4 transition-all duration-300"
          >
            <div 
              className={`h-1.5 transition-all duration-700 ease-[0.22, 1, 0.36, 1] rounded-full ${
                index === currentIndex 
                ? 'w-16 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]' 
                : 'w-6 bg-zinc-700 group-hover:bg-zinc-500'
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
