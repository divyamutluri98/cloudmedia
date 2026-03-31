import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useAnalytics = () => {
  const [stats, setStats] = useState<any>({
    totalArticles: 0,
    totalViews: 0,
    totalSubscribers: 0,
    pendingReview: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const [articlesRes, viewsRes, subscribersRes, pendingRes] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }).eq('status', 'published'),
        supabase.rpc('get_total_views'),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact' }).eq('is_active', true),
        supabase.from('articles').select('id', { count: 'exact' }).eq('status', 'review'),
      ])

      setStats({
        totalArticles: articlesRes.count || 0,
        totalViews: viewsRes.data || 0,
        totalSubscribers: subscribersRes.count || 0,
        pendingReview: pendingRes.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, isLoading, refreshStats: fetchStats }
}
