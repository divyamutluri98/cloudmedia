import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { CATEGORIES } from '../../data/initialNews';
import { useUIStore } from '../../stores/uiStore';
import { supabase } from '../../lib/supabase';
import { ChevronRight, ChevronLeft, Zap, Sparkles, Filter } from 'lucide-react';
import { Badge } from '../ui/badge';

export function CategoryStrip() {
  const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name, slug')
        .eq('is_active', true)
        .order('display_order');

      if (data && !error && data.length > 0) {
        setCategories(data);
      } else {
        setCategories(CATEGORIES as any);
      }
    } catch {
      setCategories(CATEGORIES as any);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const allCategories = [{ name: 'GLOBAL HUB', slug: 'all' }, ...categories];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 z-40 glassy-dense border-b border-white/5 py-4 overflow-hidden">
      {/* Magic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5 opacity-50 pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center gap-6 relative">
        <div className="flex items-center gap-2 shrink-0 border-r border-zinc-200/50 dark:border-white/5 pr-6 hidden md:flex">
           <Filter className="w-4 h-4 text-red-600 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Signal Sectors</span>
        </div>

        {/* Scroll Buttons */}
        <button 
           onClick={() => scroll('left')}
           className="absolute left-10 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-3xl p-1.5 rounded-full shadow-2xl border border-white/10 hidden md:block hover:scale-110 transition-transform active:scale-95"
        >
           <ChevronLeft className="w-4 h-4 text-red-600" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex-1 flex overflow-x-auto gap-3 no-scrollbar items-center py-1 relative scroll-smooth mask-horizontal"
        >
          {allCategories.map((cat, index) => (
            <motion.button
              key={cat.slug}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-700 relative overflow-hidden group ${
                selectedCategory === cat.slug
                  ? 'bg-red-600 text-white shadow-2xl shadow-red-500/30'
                  : 'bg-zinc-100/50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-600 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 border-2 border-transparent hover:border-red-600/20'
              }`}
            >
              {cat.name}
              
              {selectedCategory === cat.slug && (
                  <motion.div 
                     layoutId="magic-indicator"
                     className="absolute bottom-0 left-0 w-full h-[3px] bg-white opacity-40 shadow-[0_0_15px_white]"
                  />
              )}
              
              {/* Magic Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          ))}
        </div>

        <button 
           onClick={() => scroll('right')}
           className="absolute right-10 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-3xl p-1.5 rounded-full shadow-2xl border border-white/10 hidden md:block hover:scale-110 transition-transform active:scale-95"
        >
           <ChevronRight className="w-4 h-4 text-red-600" />
        </button>

        <div className="shrink-0 hidden lg:flex items-center gap-4 bg-zinc-950 px-5 py-3 rounded-2xl shadow-3xl group cursor-pointer border border-white/5 active:scale-95 transition-all">
           <Zap className="w-4 h-4 text-red-600 fill-current group-hover:animate-bounce" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Latest Intelligence</span>
        </div>
      </div>
    </div>
  );
}
