import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import { Skeleton } from '../ui/skeleton';
import { Clock, Eye, MoreVertical, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsGrid() {
  const { articles, isLoading, error } = useArticles({ limit: 40 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 pt-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="flex gap-3">
              <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="p-20 text-center text-red-600 font-medium">Network Error: Unable to synchronize feeds.</div>;

  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
        <AnimatePresence>
          {articles.map((article, i) => (
            <motion.div 
               key={article.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.02 }}
               className="group cursor-pointer flex flex-col gap-3"
            >
              {/* Thumbnail Container */}
              <Link to={`/article/${article.slug}`} className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 transition-all group-hover:rounded-none group-hover:scale-[1.02]">
                 <img 
                    src={article.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80'} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-[11px] font-bold">
                    12:45
                 </div>
              </Link>

              {/* Info Container */}
              <div className="flex gap-3 px-1">
                 {/* Channel Avatar */}
                 <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                       {article.profiles?.username?.charAt(0) || 'C'}
                    </div>
                 </div>

                 {/* Metadata */}
                 <div className="flex-1 flex flex-col gap-1 pr-2 relative">
                    <Link to={`/article/${article.slug}`} className="hover:text-red-600 transition-colors">
                       <h3 className="text-[14px] lg:text-[16px] font-medium leading-[2rem] line-clamp-2 dark:text-[#F1F1F1]">
                          {article.title}
                       </h3>
                    </Link>
                    <div className="flex flex-col text-[12px] text-[#606060] dark:text-[#AAAAAA] mt-0.5">
                       <div className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                          {article.profiles?.full_name || 'Cloud Media News'}
                          <CheckCircle2 className="w-3 h-3 fill-[#606060] dark:fill-[#AAAAAA] text-white" />
                       </div>
                       <div className="flex items-center gap-1">
                          <span>{article.views_count?.toLocaleString() || '120K'} views</span>
                          <span>•</span>
                          <span>{new Date(article.published_at!).toLocaleDateString()}</span>
                       </div>
                    </div>
                    <button className="absolute right-0 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                       <MoreVertical className="w-5 h-5 text-zinc-500" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
