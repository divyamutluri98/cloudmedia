import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../../lib/supabase';
import { Layout } from '@/react-app/components/layout/Layout';
import { CommentSection } from '@/react-app/components/article/CommentSection';
import { Skeleton } from '@/react-app/components/ui/skeleton';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, CheckCircle, Bell } from 'lucide-react';
import { LATEST_NEWS } from '@/react-app/data/initialNews';
import { useArticles } from '../../hooks/useArticles';

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
  views_count: number;
  tags?: string[];
  profiles?: any;
  categories?: any;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Fetch related videos for the sidebar
  const { articles: relatedVideos, isLoading: isRelatedLoading } = useArticles({
    categorySlug: article?.categories?.slug || '',
    limit: 10
  });

  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug);
    }
    window.scrollTo(0, 0);
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
      const localArticle = LATEST_NEWS.find(a => a.slug === articleSlug);
      if (localArticle) setArticle(localArticle as any);
      else navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6 lg:flex gap-6">
           <div className="flex-1">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="mt-4 space-y-4">
                 <Skeleton className="h-6 w-3/4" />
                 <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-10 w-32 rounded-full" />
                    </div>
                 </div>
              </div>
           </div>
           <div className="w-[400px] hidden lg:block space-y-4">
              {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
           </div>
        </div>
      </Layout>
    );
  }

  if (!article) return null;

  const publishedDate = new Date(article.published_at || new Date());
  const now = new Date();
  const diffHrs = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
  const timeString = diffHrs < 1 ? 'Just now' : diffHrs < 24 ? `${diffHrs} hours ago` : `${Math.floor(diffHrs / 24)} days ago`;

  const viewCount = (article.views_count * 123 || 0).toLocaleString();
  const rawSubscribers = Math.floor(Math.random() * 500) + 10;

  return (
    <>
      <Helmet>
        <title>{article.title} - CloudMedia</title>
        <meta name="description" content={article.excerpt || ''} />
      </Helmet>

      <Layout>
        <div className="max-w-[1800px] mx-auto px-4 lg:px-6 py-6 flex flex-col lg:flex-row gap-6">
          
          {/* Main Content Area (Video + Details) */}
          <div className="flex-1 min-w-0">
            {/* "Video" Player */}
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-sm flex items-center justify-center relative group">
                {article.featured_video_url ? (
                    <video src={article.featured_video_url} controls className="w-full h-full object-contain" autoPlay muted />
                ) : (
                    <>
                        <img src={article.featured_image || 'https://via.placeholder.com/1280x720'} alt={article.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="w-16 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white cursor-pointer">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold mt-3 text-zinc-900 dark:text-[#f1f1f1]">
                {article.title}
            </h1>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-4">
                
                {/* Channel Info & Subscribe */}
                <div className="flex items-center gap-4">
                    <Link to="/channel" className="shrink-0">
                        <img 
                            src={article.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.profiles?.full_name || 'Channel')}&bold=true`} 
                            className="w-10 h-10 rounded-full object-cover" 
                            alt="author" 
                        />
                    </Link>
                    <div className="flex flex-col pr-6">
                        <Link to="/channel" className="text-base font-semibold text-zinc-900 dark:text-[#f1f1f1] flex items-center gap-1 hover:text-zinc-600">
                            {article.profiles?.full_name || 'Cloud Media Network'}
                            <CheckCircle className="w-3.5 h-3.5 fill-zinc-500 stroke-white dark:stroke-[#0f0f0f]" />
                        </Link>
                        <span className="text-xs text-zinc-600 dark:text-[#AAAAAA]">{rawSubscribers}K subscribers</span>
                    </div>

                    <button 
                        onClick={() => setIsSubscribed(!isSubscribed)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                            isSubscribed 
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700' 
                            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200'
                        }`}
                    >
                        {isSubscribed && <Bell className="w-4 h-4" />}
                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                    </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-full">
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-l-full transition-colors font-medium text-sm border-r border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white">
                            <ThumbsUp className="w-5 h-5 stroke-[1.5]" />
                            {(article.views_count * 15 || 0).toLocaleString()}
                        </button>
                        <button className="flex items-center px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-r-full transition-colors text-zinc-900 dark:text-white">
                            <ThumbsDown className="w-5 h-5 stroke-[1.5]" />
                        </button>
                    </div>

                    <button className="flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full font-medium text-sm transition-colors text-zinc-900 dark:text-white">
                        <Share className="w-5 h-5 stroke-[1.5]" />
                        Share
                    </button>

                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full font-medium text-sm transition-colors text-zinc-900 dark:text-white">
                        <Download className="w-5 h-5 stroke-[1.5]" />
                        Download
                    </button>

                    <button className="flex items-center p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors text-zinc-900 dark:text-white">
                        <MoreHorizontal className="w-5 h-5 stroke-[1.5]" />
                    </button>
                </div>
            </div>

            {/* Description Box */}
            <div 
                className={`mt-4 bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 transition-colors rounded-xl p-3 cursor-pointer text-sm font-medium ${isDescExpanded ? 'pb-4' : ''}`}
                onClick={() => setIsDescExpanded(!isDescExpanded)}
            >
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white mb-1 font-bold">
                    <span>{viewCount} views</span>
                    <span>{timeString}</span>
                    {article.tags && article.tags.length > 0 && (
                        <span className="text-blue-600 dark:text-blue-400 font-normal">
                             #{article.tags.slice(0,3).join(' #')}
                        </span>
                    )}
                </div>

                <div 
                    className={`text-zinc-800 dark:text-[#f1f1f1] font-normal leading-relaxed ${isDescExpanded ? 'whitespace-pre-wrap mt-4' : 'line-clamp-2'}`}
                    dangerouslySetInnerHTML={{ __html: article.content.replace(/<[^>]+>/g, ' ').slice(0, isDescExpanded ? Infinity : 200) }}
                />
                
                <button className="mt-2 font-bold text-sm text-zinc-900 dark:text-white">
                    {isDescExpanded ? 'Show less' : '...more'}
                </button>
            </div>

            {/* Comments */}
            <div className="mt-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">3,492 Comments</h3>
                <CommentSection articleId={article.id} />
            </div>
          </div>

          {/* Right Sidebar (Up Next / Related Videos) */}
          <aside className="w-full lg:w-[400px] flex-shrink-0">
             <div className="flex flex-col gap-3">
                 {/* Chips for Related */}
                 <div className="flex items-center gap-2 mb-2 overflow-x-auto no-scrollbar pb-2">
                     <button className="px-3 py-1.5 bg-zinc-900 text-white dark:bg-white dark:text-[#0f0f0f] rounded-lg text-sm font-medium whitespace-nowrap">All</button>
                     <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg text-sm font-medium whitespace-nowrap mix-blend-mode">From related content</button>
                     <button className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg text-sm font-medium whitespace-nowrap">Similar videos</button>
                 </div>

                 {isRelatedLoading ? (
                     [...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            <Skeleton className="w-[168px] h-[94px] rounded-lg shrink-0" />
                            <div className="space-y-2 flex-1 pt-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                     ))
                 ) : (
                     relatedVideos.filter(v => v.id !== article.id).map((video) => (
                         <Link key={video.id} to={`/article/${video.slug}`} className="flex gap-2 group">
                             {/* Small Thumbnail */}
                             <div className="relative w-[168px] h-[94px] shrink-0 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                                 <img src={video.featured_image || 'https://via.placeholder.com/320x180'} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                 <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-white text-[10px] font-medium tracking-wide">
                                     {Math.floor(Math.random() * 15 + 1)}:{Math.floor(Math.random() * 59).toString().padStart(2, '0')}
                                 </div>
                             </div>
                             
                             {/* Compact Info */}
                             <div className="flex flex-col pr-6 relative">
                                 <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#f1f1f1] line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                                     {video.title}
                                 </h3>
                                 <div className="text-xs text-zinc-600 dark:text-[#AAAAAA] flex items-center gap-1 group/author hover:text-zinc-900 dark:hover:text-white">
                                     {video.profiles?.full_name || 'Network'}
                                 </div>
                                 <div className="text-xs text-zinc-600 dark:text-[#AAAAAA]">
                                     {(video.views_count * 12 || Math.floor(Math.random()*200)).toLocaleString()}K views • {Math.floor(Math.random()*11 + 1)} months ago
                                 </div>
                                 <button className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 p-1">
                                     <MoreHorizontal className="w-4 h-4 text-zinc-900 dark:text-white" />
                                 </button>
                             </div>
                         </Link>
                     ))
                 )}
             </div>
          </aside>
          
        </div>
      </Layout>
    </>
  );
}
