import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase';
import { Layout } from '@/react-app/components/layout/Layout';
import { SocialShare } from '@/react-app/components/article/SocialShare';
import { RelatedArticles } from '@/react-app/components/article/RelatedArticles';
import { CommentSection } from '@/react-app/components/article/CommentSection';
import { Skeleton } from '@/react-app/components/ui/skeleton';
import { Clock, Eye, Calendar, Share2, Bookmark, MoreHorizontal, TrendingUp, Zap, Radio, CheckCircle, ArrowLeft, ArrowRight, Share } from 'lucide-react';
import { AdBanner } from '@/react-app/components/ui/AdBanner';
import { LATEST_NEWS } from '@/react-app/data/initialNews';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/react-app/components/ui/card';
import { Badge } from '@/react-app/components/ui/badge';
import { Button } from '@/react-app/components/ui/button';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  featured_video_url?: string;
  category_id: string;
  author_id: string;
  published_at: string | null;
  updated_at: string | null;
  views_count: number;
  is_breaking?: boolean;
  tags?: string[];
  profiles?: any;
  categories?: any;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug);
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const fetchArticleBySlug = async (articleSlug: string) => {
    setLoading(true);
    try {
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .select('*, categories(*), profiles(*)')
        .eq('slug', articleSlug)
        .eq('status', 'published')
        .single();

      if (articleData && !articleError) {
        setArticle(articleData as any);
        await supabase.rpc('increment_article_views', { article_id: articleData.id });
      } else {
        const localArticle = LATEST_NEWS.find(a => a.slug === articleSlug);
        if (localArticle) {
          setArticle(localArticle as any);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      const localArticle = LATEST_NEWS.find(a => a.slug === articleSlug);
      if (localArticle) setArticle(localArticle as any);
      else navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-12">
          <Skeleton className="h-16 w-3/4 rounded-[2rem]" />
          <Skeleton className="h-6 w-1/2 rounded-full" />
          <Skeleton className="aspect-video w-full rounded-[4rem]" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
             <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-2/3 rounded-full" />
                <Skeleton className="h-4 w-full rounded-full" />
             </div>
             <Skeleton className="h-96 w-full rounded-[3rem]" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) return null;

  const readingTime = calculateReadingTime(article.content);

  return (
    <>
      <Helmet>
        <title>{article.title} | Cloud Media Intelligence</title>
        <meta name="description" content={article.excerpt || ''} />
        <meta property="og:title" content={article.title} />
        <meta property="og:image" content={article.featured_image || ''} />
      </Helmet>

      <Layout>
        {/* Magic Progress Tracker */}
        <div className="fixed top-0 left-0 w-full h-1.5 z-[100] pointer-events-none">
          <motion.div 
            className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-32 pt-16">
          {/* Header Section */}
          <header className="space-y-12 mb-16">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500"
            >
               <Link to="/" className="hover:text-red-500 transition-colors flex items-center gap-2"> <ArrowLeft className="w-3 h-3" /> HUB</Link>
               <span className="opacity-20">/</span>
               <Link to={`/category/${article.categories?.slug || 'intel'}`} className="text-red-600 hover:tracking-[0.6em] transition-all">
                  {article.categories?.name || 'FIELD INTEL'}
               </Link>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black text-zinc-950 dark:text-white leading-[0.9] tracking-tighter uppercase max-w-[14ch]"
            >
              {article.title}
            </motion.h1>

            <div className="flex flex-wrap items-center gap-10 py-10 border-y border-zinc-200 dark:border-white/5">
              <div className="flex items-center gap-6">
                <div className="relative">
                    <img
                        src={article.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.profiles?.full_name || 'Staff')}&bold=true`}
                        alt="author"
                        className="w-16 h-16 rounded-3xl bg-zinc-100 dark:bg-zinc-800 p-0.5 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-zinc-950 rounded-full"></div>
                </div>
                <div className="text-left space-y-1">
                  <p className="font-black text-zinc-950 dark:text-white text-xl uppercase tracking-tighter">{article.profiles?.full_name || 'CLOUD_STAFF_01'}</p>
                  <div className="flex items-center gap-2 text-[8px] font-black text-red-600 uppercase tracking-widest">
                     <CheckCircle className="w-2.5 h-2.5" /> VERIFIED CORRESPONDENT
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-10 items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 group flex items-center gap-2"> <Calendar className="w-3.5 h-3.5 text-red-600" /> TIMESTAMP </span>
                    <span className="text-zinc-900 dark:text-zinc-300"> {formatDate(article.published_at)} </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 flex items-center gap-2"> <Radio className="w-3.5 h-3.5 text-red-600" /> DURATION </span>
                    <span className="text-zinc-900 dark:text-zinc-300"> {readingTime} MIN PULSE </span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 flex items-center gap-2"> <Eye className="w-3.5 h-3.5 text-red-600" /> REACH </span>
                    <span className="text-zinc-900 dark:text-zinc-300"> {article.views_count.toLocaleString()} SIGNALS </span>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3">
                 <Button variant="ghost" size="icon" className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-xl group">
                    <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </Button>
                 <Button variant="ghost" size="icon" className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-xl group">
                    <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </Button>
                 <Button variant="ghost" size="icon" className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-xl">
                    <MoreHorizontal className="w-5 h-5" />
                 </Button>
              </div>
            </div>
          </header>

          {/* Featured Visual with Neural Wave effect if possible but just high-fi frame */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-20 rounded-[4rem] overflow-hidden shadow-3xl shadow-red-600/5 dark:shadow-red-600/10 border-4 border-zinc-100 dark:border-white/5 relative group"
          >
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
            <img
              src={article.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000'}
              alt={article.title}
              className="w-full h-[500px] md:h-[800px] object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-10 left-10 flex items-center gap-4">
                 <Badge className="bg-red-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-none animate-pulse">
                    <Zap className="w-4 h-4 mr-2" /> LIVE INTEL FEED
                 </Badge>
                 <span className="p-3 bg-white/10 backdrop-blur-3xl rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">SAT_CAM_01_ACTIVE</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
            {/* Article Content Sidebar Space */}
            <div className="lg:col-span-8 space-y-16">
              <div 
                className="article-body prose prose-2xl dark:prose-invert prose-zinc max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-zinc-950 dark:prose-headings:text-white
                prose-p:text-zinc-800 dark:prose-p:text-zinc-300 prose-p:leading-[1.7] prose-p:font-medium
                prose-a:text-red-600 dark:prose-a:text-red-500 prose-a:font-black prose-a:no-underline hover:prose-a:tracking-widest transition-all
                prose-img:rounded-[3rem] prose-img:shadow-2xl prose-img:border-4 prose-img:border-zinc-100 dark:prose-img:border-white/5"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="flex flex-wrap gap-3 py-10">
                {article.tags?.map((tag) => (
                  <Badge key={tag} className="bg-zinc-100 dark:bg-zinc-900 border-none px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all cursor-pointer">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <AdBanner className="border-4 border-red-600/10 rounded-[3.5rem] bg-zinc-50 dark:bg-zinc-950/50 p-12 shadow-inner" />

              <div className="pt-20 border-t border-zinc-200 dark:border-white/5">
                <CommentSection articleId={article.id} />
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="sticky top-28 space-y-12">
                {/* Visual Share Module */}
                <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border-4 border-white/5 dark:border-white/5 rounded-[3rem] p-8 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-[80px]"></div>
                  <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                       <Share2 className="w-5 h-5 text-red-600" /> RE-BROADCAST SIGNAL
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <SocialShare title={article.title} slug={article.slug} />
                  </CardContent>
                </Card>

                {/* Newsletter Hub */}
                <Card className="bg-zinc-950 rounded-[3rem] text-white p-10 space-y-8 shadow-3xl shadow-red-600/10 border-4 border-red-600/10 overflow-hidden group">
                   <div className="relative z-10 space-y-6">
                      <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center animate-pulse">
                         <Zap className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Global <br /> <span className="text-red-600">Protocol</span></h3>
                         <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Daily intelligence briefings synchronized to your terminal.</p>
                      </div>
                      
                      <div className="space-y-3">
                         <input
                            type="email"
                            placeholder="COMM_LINK@CLOUD.NET"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xs font-black uppercase tracking-widest focus:ring-2 ring-red-600 transition-all outline-none"
                         />
                         <Button className="w-full h-16 bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl font-black uppercase text-xs tracking-[0.2rem] shadow-2xl transition-all active:scale-95">
                            SUBSCRIBE TO FEED
                         </Button>
                      </div>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
                </Card>

                {/* Ad Space */}
                <AdBanner format="rectangle" className="aspect-square rounded-[3rem]" />
              </div>
            </aside>
          </div>

          <div className="mt-32 pt-32 border-t border-zinc-200 dark:border-white/5 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-zinc-950 border-4 border-red-600 rounded-full flex items-center justify-center shadow-3xl">
                <TrendingUp className="w-6 h-6 text-red-600" />
             </div>
             
             <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 px-4">
                <div className="space-y-2">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Linked <br /> <span className="text-red-500">Signals</span></h2>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Recommended intelligence reports based on your pulse.</p>
                </div>
                <Link to="/news">
                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 group">
                        Explore Full Feed <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
             </div>
             
             <RelatedArticles
               categoryId={article.category_id}
               currentArticleId={article.id}
               limit={3}
             />
          </div>
        </article>
      </Layout>
    </>
  );
}
