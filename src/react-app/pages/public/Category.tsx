import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Layout } from '@/react-app/components/layout/Layout';
import { Skeleton } from '@/react-app/components/ui/skeleton';
import { Filter, TrendingUp, Grid, List as ListIcon, Calendar, Eye, ArrowRight } from 'lucide-react';
import { AdBanner } from '@/react-app/components/ui/AdBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_NEWS } from '../../data/initialNews';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at: string;
  views_count: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (slug) {
      fetchCategoryData(slug);
    }
  }, [slug, page]);

  const fetchCategoryData = async (categorySlug: string) => {
    setLoading(true);
    try {
      // 1. Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', categorySlug)
        .eq('is_active', true)
        .single();

      if (categoryError || !categoryData) {
        // Local fallback for categories too
        const localCat = LATEST_NEWS.find(a => a.category.slug === categorySlug)?.category;
        if (localCat) {
          setCategory({ ...localCat, id: localCat.slug } as any);
        }
      } else {
        setCategory(categoryData);
      }

      // 2. Fetch articles
      const from = (page - 1) * 12;
      const to = from + 11;

      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(from, to);

      // Filtering in JS for simplicity since we want real data fallbacks too
      let filtered: any[] = [];
      if (articlesData && articlesData.length > 0) {
        // If we have data, we might need to filter by category_id if we have it
        const catId = categoryData?.id || categorySlug;
        filtered = articlesData.filter(a => a.category_id === catId || a.category_id === categorySlug);
      }

      if (filtered.length === 0) {
        // Fallback to initialNews
        filtered = LATEST_NEWS.filter(a => a.category.slug === categorySlug);
        setHasMore(false);
      } else if (filtered.length < 12) {
        setHasMore(false);
      }

      setArticles(prev => page === 1 ? filtered : [...prev, ...filtered]);
    } catch (error) {
      console.error('Error fetching category:', error);
      const filtered = LATEST_NEWS.filter(a => a.category.slug === categorySlug);
      setArticles(filtered as any);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 space-y-16">
        {loading && articles.length === 0 ? (
          <div className="space-y-12">
            <Skeleton className="h-48 w-full rounded-[3rem]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="h-64 w-full rounded-3xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* High-Impact Header */}
            <motion.header 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative p-10 md:p-20 rounded-[3.5rem] overflow-hidden bg-zinc-950 text-white shadow-2xl border-4 border-white/5"
            >
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all"></div>
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

               <div className="relative z-10 space-y-8 max-w-4xl">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-0.5 bg-red-600"></div>
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Intel Feed</span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none font-display">
                    {category?.name || (slug && slug.charAt(0).toUpperCase() + slug.slice(1))}
                  </h1>
                  {category?.description && (
                    <p className="text-zinc-400 text-lg md:text-xl font-bold max-w-2xl leading-relaxed uppercase tracking-tight">
                       {category.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-10 pt-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 font-tech">
                     <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <span className="text-white text-base mr-1">{articles.length}+</span> Verified Reports
                     </div>
                     <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-red-600" />
                        Intelligence Stream Active
                     </div>
                  </div>
               </div>
            </motion.header>

            {/* Utility Bar */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-zinc-200/50 dark:border-zinc-800/50 py-8">
               <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl">
                  <button 
                     onClick={() => setViewMode('grid')}
                     className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-800 shadow-xl' : 'text-zinc-500'}`}
                  >
                     <Grid className="w-5 h-5" />
                  </button>
                  <button 
                     onClick={() => setViewMode('list')}
                     className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-800 shadow-xl' : 'text-zinc-500'}`}
                  >
                     <ListIcon className="w-5 h-5" />
                  </button>
               </div>
               <p className="text-xs font-black uppercase tracking-widest text-zinc-400 font-tech">
                  Analyzing <span className="text-red-500">{articles.length}</span> global news signals
               </p>
            </section>

            {/* Content Grid */}
            <div className={`grid gap-10 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
               <AnimatePresence mode="popLayout">
                  {articles.map((article, index) => (
                    <motion.div 
                      key={article.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        to={`/article/${article.slug}`}
                        className={`group block glassy rounded-[2.5rem] border-2 border-white dark:border-zinc-800 shadow-xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 overflow-hidden ${viewMode === 'list' ? 'md:flex md:h-64' : ''}`}
                      >
                         <div className={`relative overflow-hidden bg-zinc-900 shrink-0 ${viewMode === 'list' ? 'md:w-96' : 'aspect-video'}`}>
                            <img
                              src={article.featured_image || 'https://via.placeholder.com/800x450'}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         
                         <div className="p-8 flex flex-col justify-between flex-1">
                            <div className="space-y-4">
                               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 font-tech">
                                  <Calendar className="w-3.5 h-3.5 text-red-600" />
                                  {formatDate(article.published_at)}
                                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full ml-auto animate-pulse"></span>
                               </div>
                               <h3 className="text-xl md:text-2xl font-black leading-[1.2] uppercase group-hover:text-red-600 transition-colors dark:text-white line-clamp-2 font-display">
                                  {article.title}
                               </h3>
                               {article.excerpt && viewMode === 'list' && (
                                  <p className="text-zinc-500 text-sm font-bold line-clamp-2">{article.excerpt}</p>
                               )}
                            </div>
                            
                            <div className="flex items-center justify-between pt-6 mt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                               <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 font-tech">
                                  <Eye className="w-3.5 h-3.5" />
                                  {article.views_count.toLocaleString()}
                               </div>
                               <div className="text-[10px] font-black uppercase flex items-center gap-2 group-hover:text-red-600 transition-colors">
                                  Intel Detail <ArrowRight className="w-3.5 h-3.5" />
                               </div>
                            </div>
                         </div>
                      </Link>
                      
                      {/* Ad Placement */}
                      {(index + 1) % 6 === 0 && (
                         <div className="col-span-full py-10">
                            <AdBanner slot="category-feed" className="rounded-[2.5rem]" />
                         </div>
                      )}
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            {/* Empty State */}
            {articles.length === 0 && !loading && (
              <div className="text-center py-32 space-y-8">
                 <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Filter className="w-10 h-10 text-zinc-400" />
                 </div>
                 <div className="space-y-4">
                   <h2 className="text-3xl font-black uppercase tracking-tighter">No Active Signals</h2>
                   <p className="text-zinc-500 font-bold max-w-sm mx-auto uppercase text-sm tracking-tight">Our agents are currently scanning the global infrastructure for news in this sector.</p>
                 </div>
                 <Link 
                    to="/" 
                    className="inline-flex items-center gap-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl"
                 >
                    Return to Mission Hub
                 </Link>
              </div>
            )}
            
            {hasMore && articles.length > 0 && (
               <div className="flex justify-center pt-20">
                  <button 
                    onClick={() => setPage(p => p + 1)}
                    className="px-12 py-6 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    Scan More Intelligence
                  </button>
               </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
