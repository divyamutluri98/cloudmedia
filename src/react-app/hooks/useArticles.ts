import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database.types'
import { LATEST_NEWS } from '../data/initialNews'

type Article = Database['public']['Tables']['articles']['Row'] & {
  categories?: { name: string; slug: string; color: string };
  profiles?: { username: string; full_name: string; avatar_url: string; bio?: string; social_links?: any };
}

interface UseArticlesOptions {
  categorySlug?: string
  status?: string
  limit?: number
  page?: number
  searchQuery?: string
}

export const useArticles = (options: UseArticlesOptions = {}) => {
  const [articles, setArticles] = useState<Article[]>(LATEST_NEWS as any)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(LATEST_NEWS.length)

  const fetchArticles = async () => {
    try {
      setIsLoading(true)
      let query = supabase
        .from('articles')
        .select('*, categories(name, slug, color), profiles(username, full_name, avatar_url)', {
          count: 'exact',
        })
        .eq('status', options.status || 'published')
        .order('published_at', { ascending: false, nullsFirst: false })

      if (options.categorySlug && options.categorySlug !== 'all') {
        // Correct join filtering for Supabase
        const { data: catData } = await supabase.from('categories').select('id').eq('slug', options.categorySlug).single();
        if (catData) {
          query = query.eq('category_id', catData.id);
        }
      }

      if (options.searchQuery) {
        query = query.or(`title.ilike.%${options.searchQuery}%,excerpt.ilike.%${options.searchQuery}%,content.ilike.%${options.searchQuery}%`)
      }

      const limit = options.limit || 20
      const page = options.page || 1
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      if (data && data.length > 0) {
        setArticles(data as any)
        setTotal(count || 0)
      } else if (!options.categorySlug || options.categorySlug === 'all') {
        const fallbacks = LATEST_NEWS;
        setArticles(fallbacks as any)
        setTotal(fallbacks.length)
      } else {
        const filteredFallbacks = LATEST_NEWS.filter(a => a.category.slug === options.categorySlug);
        setArticles(filteredFallbacks as any);
        setTotal(filteredFallbacks.length);
      }
      setError(null)
    } catch (err: any) {
      console.error('Fetch error:', err)
      setError(err.message)
      if (articles.length === 0) {
        setArticles(LATEST_NEWS as any)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getArticleBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(*), profiles(username, full_name, avatar_url, bio, social_links)')
        .eq('slug', slug)
        .single()

      if (error) throw error
      return data
    } catch (err: any) {
      console.error('Error fetching article:', err)
      // Fallback for detail page
      return LATEST_NEWS.find(a => a.slug === slug) || null;
    }
  }

  const incrementViews = async (articleId: string) => {
    try {
       await supabase.rpc('increment_article_views', { article_id: articleId });
    } catch {
       // Ignore rpc failure in fallback mode
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [options.categorySlug, options.status, options.page, options.searchQuery])

  return {
    articles,
    isLoading,
    error,
    total,
    totalPages: Math.ceil(total / (options.limit || 20)),
    currentPage: options.page || 1,
    fetchArticles,
    getArticleBySlug,
    incrementViews,
  }
}
