import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Skeleton } from '../ui/skeleton';

interface Article {
  id: string;
  title: string;
  slug: string;
  featured_image_url?: string;
  published_at: string;
}

interface RelatedArticlesProps {
  categoryId: string;
  currentArticleId: string;
  limit?: number;
}

export function RelatedArticles({ categoryId, currentArticleId, limit = 4 }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedArticles();
  }, [categoryId, currentArticleId]);

  const fetchRelatedArticles = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', currentArticleId)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (data && !error) {
      setArticles(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (articles.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={article.featured_image_url || 'https://via.placeholder.com/300x200'}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-base font-bold line-clamp-2 group-hover:text-[#C8102E] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(article.published_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
