import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'All', 'News', 'Technology', 'Entertainment', 'Sports', 'Business', 'Health', 
  'Science', 'World', 'Politics', 'Gaming', 'Music', 'Live', 'Podcasts', 'Anime',
  'Coding', 'Design', 'Fashion', 'Art', 'Food', 'Travel', 'Education'
];

interface CategoryStripProps {
  selected?: string;
  onSelect?: (category: string) => void;
}

export function CategoryStrip({ selected = 'All', onSelect }: CategoryStripProps) {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-[56px] z-40 w-full bg-white dark:bg-[#0F0F0F] px-4 py-3 flex items-center gap-2 group transition-all duration-300">
      <div className="relative w-full flex items-center">
        {/* Left Shadow & Arrow */}
        <AnimatePresence>
          {showLeft && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-white dark:from-[#0F0F0F] via-white/90 dark:via-[#0f0f0f]/90 to-transparent pr-12"
            >
              <button 
                 onClick={() => scroll('left')}
                 className="w-10 h-10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Scroller */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelect?.(cat)}
              className={`yt-pill ${
                selected === cat ? 'yt-pill-active' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Shadow & Arrow */}
        <AnimatePresence>
          {showRight && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-white dark:from-[#0F0F0F] via-white/90 dark:via-[#0f0f0f]/90 to-transparent pl-12"
            >
              <button 
                 onClick={() => scroll('right')}
                 className="w-10 h-10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
