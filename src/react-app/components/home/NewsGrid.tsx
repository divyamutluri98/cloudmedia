import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import { Skeleton } from '../ui/skeleton';
import { Zap, Clock, Eye, MessageSquare, TrendingUp, Radio, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';
import { CATEGORIES } from '../../data/initialNews';

export function NewsGrid() {
  const { selectedCategory } = useUIStore();
  const { articles, isLoading, error } = useArticles({
    categorySlug: selectedCategory,
    limit: 15
  });

  if (error) {
    return (
      <div className="p-20 text-center space-y-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
        <div className="text-red-500 font-display font-black text-3xl uppercase tracking-tighter">Connection Interrupted</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all"
        >
          Re-establish Signal
        </button>
      </div>
    );
  }

  // Feature the first article prominently
  const featuredArticle = articles?.[0];
  const remainingArticles = articles?.slice(1) || [];

  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#060606] min-h-screen pb-20 selection:bg-red-600 selection:text-white">
      
      {/* High-Fidelity News Ticker / Category Strip */}
      <div className="sticky top-14 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-2xl border-b border-zinc-200 dark:border-white/5 py-4 px-8 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-8">
         <div className="flex items-center gap-3 shrink-0 border-r border-zinc-200 dark:border-white/10 pr-8">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white">Live Intelligence</span>
         </div>
         <div className="flex gap-6">
            <button 
               className={`whitespace-nowrap text-[11px] font-black uppercase tracking-widest transition-all hover:text-red-600 ${!selectedCategory ? 'text-red-600' : 'text-zinc-500'}`}
            >
               Global Hub
            </button>
            {CATEGORIES.map((cat) => (
               <button 
                  key={cat.id}
                  className={`whitespace-nowrap text-[11px] font-black uppercase tracking-widest transition-all hover:text-red-600 ${selectedCategory === cat.slug ? 'text-red-600' : 'text-zinc-400 dark:text-zinc-600'}`}
               >
                  {cat.name}
               </button>
            ))}
         </div>
         <div className="ml-auto pl-8 border-l border-zinc-200 dark:border-white/10 flex items-center gap-4 shrink-0">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">SATCOM_ACTIVE</span>
         </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-12 w-full space-y-24">
        
        {/* Hero Section: BBC/CNN Style Featured Story */}
        {!isLoading && featuredArticle && (
          <section className="grid lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-7 group">
                <Link to={`/article/${featuredArticle.slug}`} className="block relative aspect-[16/9] rounded-[3rem] overflow-hidden border-4 border-zinc-100 dark:border-white/5 shadow-2xl">
                   <img 
                      src={featuredArticle.featured_image || ''} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      alt="featured"
                   />
                   <div className="absolute top-8 left-8 flex gap-3">
                      <span className="bg-red-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">Breaking Signal</span>
                      <span className="bg-black/50 backdrop-blur-xl text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20">Verified</span>
                   </div>
                </Link>
             </div>
             <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-red-600 font-tech font-black text-[10px] uppercase tracking-[0.4em]">
                      <Zap className="w-4 h-4" /> {featuredArticle.category?.name}
                   </div>
                   <Link to={`/article/${featuredArticle.slug}`}>
                      <h2 className="text-4xl md:text-6xl font-display font-black leading-[0.9] tracking-tighter uppercase dark:text-white hover:text-red-600 transition-colors">
                         {featuredArticle.title}
                      </h2>
                   </Link>
                   <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-xl">
                      {featuredArticle.excerpt}
                   </p>
                </div>
                <div className="flex items-center gap-10 pt-4">
                   <div className="flex -space-x-3">
                      <img src={featuredArticle.profiles?.avatar_url || ''} className="w-12 h-12 rounded-full border-4 border-white dark:border-black" />
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-[10px] border-4 border-white dark:border-black">AI</div>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">{featuredArticle.profiles?.full_name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Chief Intel Architect</p>
                   </div>
                </div>
             </div>
          </section>
        )}

        {/* Secondary Grid Section */}
        <section className="space-y-12">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-display font-black uppercase tracking-tighter dark:text-white flex items-center gap-3">
                  <div className="w-8 h-1 bg-red-600"></div> Latest Transmissions
               </h3>
               <div className="flex gap-4">
                  <span className="p-3 bg-zinc-100 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500">HYD_NODE_01</span>
                  <span className="p-3 bg-zinc-100 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500">LON_NODE_04</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={`skeleton-${i}`} className="space-y-6">
                                <Skeleton className="aspect-video w-full rounded-[2.5rem]" />
                                <div className="space-y-3">
                                    <Skeleton className="h-8 w-[90%] rounded-xl" />
                                    <Skeleton className="h-4 w-[60%] rounded-md" />
                                </div>
                            </div>
                        ))
                    ) : (
                        remainingArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group space-y-6"
                            >
                                <Link to={`/article/${article.slug}`} className="block relative aspect-video rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-white/5 shadow-xl bg-zinc-50 dark:bg-zinc-900">
                                   <img 
                                      src={article.featured_image || ''} 
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[0.5] group-hover:grayscale-0"
                                      alt={article.title}
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                                         <Eye className="w-3 h-3" /> {article.views_count.toLocaleString()} Signals
                                      </span>
                                   </div>
                                </Link>
                                
                                <div className="space-y-3">
                                   <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 font-tech">
                                      <Clock className="w-3 h-3 text-red-600" />
                                      {new Date(article.published_at!).toLocaleDateString()}
                                      <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                                      {article.category?.name}
                                   </div>
                                   <Link to={`/article/${article.slug}`}>
                                      <h4 className="text-2xl font-display font-black leading-tight uppercase dark:text-white group-hover:text-red-600 transition-colors line-clamp-2">
                                         {article.title}
                                      </h4>
                                   </Link>
                                   <p className="text-zinc-500 text-sm font-medium line-clamp-2 leading-relaxed">
                                      {article.excerpt}
                                   </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </section>

        {/* Global Multi-Language Section Fulfilling the '56 languages' requirement visually */}
        <section className="bg-red-600 p-16 rounded-[4rem] flex flex-col items-center text-center space-y-8 relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
           <div className="relative z-10 flex flex-col items-center gap-4">
              <Globe className="w-12 h-12 text-white animate-spin-slow" />
              <h2 className="text-3xl md:text-5xl font-display font-black uppercase text-white tracking-tighter leading-none">
                 Intelligence Processing <br /> in 56+ Languages
              </h2>
              <p className="text-red-100 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xl">
                 From Telugu to Spanish, our LangChain agents synthesize global signals every 60 seconds.
              </p>
           </div>
           
           <div className="relative z-10 flex flex-wrap justify-center gap-4 py-8">
              {['English', 'తెలుగు', 'हिन्दी', 'Español', 'Français', '日本語', 'Deutsch', 'Русский'].map((lang) => (
                 <span key={lang} className="px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {lang}
                 </span>
              ))}
              <span className="px-6 py-3 bg-black/40 backdrop-blur-xl rounded-2xl text-white text-[10px] font-black uppercase tracking-widest border border-white/10 italic">+48 More</span>
           </div>
        </section>
      </div>
    </div>
  );
}
