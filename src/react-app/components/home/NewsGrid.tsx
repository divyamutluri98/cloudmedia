import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import { Skeleton } from '../ui/skeleton';
import { Clock, Eye, MessageCircle, Share2, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdBanner } from '../ui/AdBanner';
import { useUIStore } from '../../stores/uiStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function NewsGrid() {
  const { selectedCategory } = useUIStore();
  const { articles, isLoading, error } = useArticles({
    categorySlug: selectedCategory,
    limit: 12
  });

  if (error) {
    return (
      <div className="p-10 text-center space-y-4">
        <div className="text-red-500 font-bold uppercase tracking-widest text-xs">Error Loading Intelligence Hub</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-2xl"
        >
          Re-Initialize
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-10 space-y-12 relative overflow-hidden">
      {/* Magic Background Element */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-red-600 animate-pulse" />
            Intel Grid
            </h2>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">
                Real-time Global Signal Analysis <span className="text-red-600 ml-2">●</span> {articles.length} Reports
            </p>
        </div>
        <Link 
          to="/news"
          className="group text-xs font-black uppercase text-red-600 hover:tracking-[0.2em] transition-all bg-red-50 dark:bg-red-950/20 px-6 py-3 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 flex items-center gap-2"
        >
          Explore All Intel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <Card key={`skeleton-${i}`} className="border-none bg-transparent shadow-none">
                <Skeleton className="aspect-video w-full rounded-[2rem] mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-1/3 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                </div>
              </Card>
            ))
          ) : (
            articles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/article/${article.slug}`} className="group">
                    <Card className="relative h-full overflow-hidden border-2 border-white/10 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-3xl rounded-[2.5rem] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(200,16,46,0.2)] hover:-translate-y-4 hover:border-red-600/30">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <CardHeader className="p-0 overflow-hidden relative aspect-video">
                            <motion.img 
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 1.5 }}
                                src={article.featured_image || 'https://via.placeholder.com/800x450'} 
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                            
                            <div className="absolute top-5 left-5">
                                <Badge variant="secondary" className="bg-white/90 dark:bg-black/80 backdrop-blur-3xl text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border border-white/20 shadow-2xl">
                                    {article.categories?.name || 'Gen Intel'}
                                </Badge>
                            </div>
                            
                            {article.is_breaking && (
                                <div className="absolute bottom-5 left-5 animate-bounce">
                                    <Badge className="bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1">
                                        <Zap className="w-3 h-3 fill-current" /> Breaking
                                    </Badge>
                                </div>
                            )}
                        </CardHeader>
                        
                        <CardContent className="p-7 space-y-5">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-red-600" />
                                    {new Date(article.published_at!).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 ml-auto">
                                    <Eye className="w-3.5 h-3.5" />
                                    {article.views_count?.toLocaleString() || 0}
                                </div>
                            </div>

                            <CardTitle className="text-xl md:text-2xl font-black leading-[1.2] group-hover:text-red-600 transition-colors dark:text-zinc-50 line-clamp-3 tracking-tighter uppercase">
                                {article.title}
                            </CardTitle>

                            <div className="pt-6 border-t border-zinc-200/50 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={article.profiles?.avatar_url || ''} className="w-9 h-9 rounded-full border-2 border-white dark:border-zinc-800 shadow-md object-cover" alt="author" />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-700 dark:text-zinc-300">{article.profiles?.full_name}</span>
                                        <span className="text-[8px] font-bold text-zinc-400 uppercase">Senior Intel</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-zinc-400 group-hover:text-red-500 transition-colors">
                                    <Share2 className="w-4 h-4 hover:scale-125 transition-transform cursor-pointer" />
                                    <MessageCircle className="w-4 h-4 hover:scale-125 transition-transform cursor-pointer" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
                
                {(index + 1) % 4 === 0 && (
                   <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 mt-8">
                      <AdBanner slot="grid-inline" className="h-[120px] border-dashed border-2 border-red-500/20 bg-red-500/5 rounded-[2.5rem]" />
                   </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
