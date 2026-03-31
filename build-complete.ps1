# Cloud Media News - Complete Build Script
# This script automates the entire setup and build process for the Cloud Media News platform
# Run this in PowerShell from the project root directory

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CLOUD MEDIA NEWS - COMPLETE BUILD   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install all required dependencies
Write-Host "[Step 1/20] Installing dependencies..." -ForegroundColor Yellow
npm install @supabase/supabase-js @supabase/auth-helpers-react @tanstack/react-query zustand framer-motion react-helmet-async date-fns recharts react-player @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image @tiptap/extension-youtube react-hook-form @hookform/resolvers i18next react-i18next axios

# Step 2: Create directory structure
Write-Host "[Step 2/20] Creating directory structure..." -ForegroundColor Yellow
$dirs = @(
    "src/react-app/components/layout",
    "src/react-app/components/home",
    "src/react-app/components/article",
    "src/react-app/components/admin",
    "src/react-app/components/common",
    "src/react-app/pages/public",
    "src/react-app/pages/admin",
    "src/react-app/pages/auth",
    "src/react-app/pages/account",
    "src/react-app/hooks",
    "src/react-app/stores",
    "src/react-app/lib",
    "src/react-app/types",
    "src/react-app/utils",
    "src/shared",
    "public/assets",
    "supabase"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor Green
    }
}

# Step 3: Create Supabase configuration
Write-Host "[Step 3/20] Setting up Supabase client..." -ForegroundColor Yellow
$supabaseConfig = @"
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

export const getSupabaseUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
"@
$supabaseConfig | Out-File -FilePath "src/react-app/lib/supabase.ts" -Encoding utf8

# Step 4: Create environment file template
Write-Host "[Step 4/20] Creating environment template..." -ForegroundColor Yellow
$envTemplate = @"
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# AdSense
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX

# Site URL
VITE_SITE_URL=http://localhost:5173
"@
$envTemplate | Out-File -FilePath ".env.example" -Encoding utf8

# Step 5: Create database types
Write-Host "[Step 5/20] Generating database types..." -ForegroundColor Yellow
$dbTypes = @"
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Role = 'admin' | 'editor' | 'contributor'
export type ArticleStatus = 'draft' | 'review' | 'scheduled' | 'published' | 'archived'
export type MediaType = 'image' | 'video' | 'document'
export type VideoPlatform = 'youtube' | 'facebook' | 'direct'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          role: Role
          bio: string | null
          social_links: Json | null
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          role?: Role
          bio?: string | null
          social_links?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: Role
          bio?: string | null
          social_links?: Json | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          icon: string | null
          meta_title: string | null
          meta_description: string | null
          display_order: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          display_order?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          icon?: string | null
          meta_title?: string | null
          meta_description?: string | null
          display_order?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image: string | null
          featured_video_url: string | null
          category_id: string
          author_id: string
          status: ArticleStatus
          is_breaking: boolean
          is_featured: boolean
          is_trending: boolean
          tags: string[]
          published_at: string | null
          scheduled_at: string | null
          views_count: number
          likes_count: number
          shares_count: number
          reading_time: number
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string | null
          schema_markup: Json | null
          og_image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image?: string | null
          featured_video_url?: string | null
          category_id: string
          author_id: string
          status?: ArticleStatus
          is_breaking?: boolean
          is_featured?: boolean
          is_trending?: boolean
          tags?: string[]
          published_at?: string | null
          scheduled_at?: string | null
          views_count?: number
          likes_count?: number
          shares_count?: number
          reading_time?: number
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          schema_markup?: Json | null
          og_image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          featured_image?: string | null
          featured_video_url?: string | null
          category_id?: string
          author_id?: string
          status?: ArticleStatus
          is_breaking?: boolean
          is_featured?: boolean
          is_trending?: boolean
          tags?: string[]
          published_at?: string | null
          scheduled_at?: string | null
          views_count?: number
          likes_count?: number
          shares_count?: number
          reading_time?: number
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          schema_markup?: Json | null
          og_image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          article_id: string
          user_id: string | null
          guest_name: string | null
          guest_email: string | null
          content: string
          is_approved: boolean
          parent_id: string | null
          likes_count: number
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          user_id?: string | null
          guest_name?: string | null
          guest_email?: string | null
          content: string
          is_approved?: boolean
          parent_id?: string | null
          likes_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          user_id?: string | null
          guest_name?: string | null
          guest_email?: string | null
          content?: string
          is_approved?: boolean
          parent_id?: string | null
          likes_count?: number
          created_at?: string
        }
      }
      media_library: {
        Row: {
          id: string
          filename: string
          url: string
          type: MediaType
          size: number
          alt_text: string | null
          caption: string | null
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          url: string
          type: MediaType
          size: number
          alt_text?: string | null
          caption?: string | null
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          url?: string
          type?: MediaType
          size?: number
          alt_text?: string | null
          caption?: string | null
          uploaded_by?: string
          created_at?: string
        }
      }
      photo_gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          cover_image: string
          images: Json
          category_id: string | null
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          cover_image: string
          images: Json
          category_id?: string | null
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          cover_image?: string
          images?: Json
          category_id?: string | null
          is_published?: boolean
          created_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail: string
          video_url: string
          platform: VideoPlatform
          category_id: string | null
          views_count: number
          is_published: boolean
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          thumbnail: string
          video_url: string
          platform: VideoPlatform
          category_id?: string | null
          views_count?: number
          is_published?: boolean
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail?: string
          video_url?: string
          platform?: VideoPlatform
          category_id?: string | null
          views_count?: number
          is_published?: boolean
          published_at?: string | null
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          subscribed_categories: string[]
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          subscribed_categories?: string[]
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          subscribed_categories?: string[]
          is_active?: boolean
          subscribed_at?: string
        }
      }
      ad_placements: {
        Row: {
          id: string
          name: string
          slot_id: string
          position: string
          is_active: boolean
          ad_code: string | null
        }
        Insert: {
          id?: string
          name: string
          slot_id: string
          position: string
          is_active?: boolean
          ad_code?: string | null
        }
        Update: {
          id?: string
          name?: string
          slot_id?: string
          position?: string
          is_active?: boolean
          ad_code?: string | null
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      breaking_news_ticker: {
        Row: {
          id: string
          text: string
          link: string | null
          is_active: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          link?: string | null
          is_active?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          link?: string | null
          is_active?: boolean
          display_order?: number
          created_at?: string
        }
      }
      polls: {
        Row: {
          id: string
          question: string
          options: Json
          votes: Json
          is_active: boolean
          ends_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          options: Json
          votes?: Json
          is_active?: boolean
          ends_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          options?: Json
          votes?: Json
          is_active?: boolean
          ends_at?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          message: string
          type: string
          is_read: boolean
          link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          type: string
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          type?: string
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
"@
$dbTypes | Out-File -FilePath "src/react-app/types/database.types.ts" -Encoding utf8

Write-Host "  Database types created successfully!" -ForegroundColor Green

# Step 6: Create Zustand stores
Write-Host "[Step 6/20] Creating Zustand stores..." -ForegroundColor Yellow
$authStore = @"
import { create } from 'zustand'
import { supabase, getSupabaseUser } from '../lib/supabase'
import type { Database } from '../types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type User = Database['public']['Tables']['profiles']['Update']

interface AuthState {
  user: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ error: any }>
  register: (email: string, password: string, username: string) => Promise<{ error: any }>
  logout: () => Promise<void>
  getUser: () => Promise<void>
  updateUser: (data: Partial<Profile>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (!error) {
      await get().getUser()
    }
    
    return { error }
  },

  register: async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })
    
    return { error }
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, isAuthenticated: false })
  },

  getUser: async () => {
    const user = await getSupabaseUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      set({ 
        user: profile || null, 
        isAuthenticated: true,
        isLoading: false 
      })
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  updateUser: async (data: Partial<Profile>) => {
    if (!get().user) return
    
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', get().user!.id)
    
    if (!error) {
      set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      }))
    }
  },
}))
"@
$authStore | Out-File -FilePath "src/react-app/stores/authStore.ts" -Encoding utf8

$uiStore = @"
import { create } from 'zustand'

interface UIState {
  isDarkMode: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  toggleDarkMode: () => void
  toggleMobileMenu: () => void
  toggleSearch: () => void
  setMobileMenuOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,

  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode
      localStorage.setItem('darkMode', newMode.toString())
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { isDarkMode: newMode }
    })
  },

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  
  setSearchOpen: (open: boolean) => set({ isSearchOpen: open }),
}))

// Initialize dark mode from localStorage
if (typeof window !== 'undefined') {
  const isDark = localStorage.getItem('darkMode') === 'true'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (isDark || (!isDark && prefersDark)) {
    document.documentElement.classList.add('dark')
  }
}
"@
$uiStore | Out-File -FilePath "src/react-app/stores/uiStore.ts" -Encoding utf8

$notificationStore = @"
import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface Notification {
  id: string
  message: string
  type: string
  is_read: boolean
  link: string | null
  created_at: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  subscribeToNotifications: (userId: string) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  fetchNotifications: async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (!error && data) {
      set({ 
        notifications: data,
        unreadCount: data.filter(n => !n.is_read).length
      })
    }
  },

  markAsRead: async (id: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
    
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: async () => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', get().notifications.map(n => n.id))
    
    set({ 
      notifications: get().notifications.map(n => ({ ...n, is_read: true })),
      unreadCount: 0,
    })
  },

  subscribeToNotifications: (userId: string) => {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          set((state) => ({
            notifications: [payload.new as Notification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          }))
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  },
}))
"@
$notificationStore | Out-File -FilePath "src/react-app/stores/notificationStore.ts" -Encoding utf8

Write-Host "  Zustand stores created successfully!" -ForegroundColor Green

# Step 7: Create custom hooks
Write-Host "[Step 7/20] Creating custom hooks..." -ForegroundColor Yellow

$useAuth = @"
import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, getUser } = useAuthStore()

  useEffect(() => {
    getUser()
  }, [])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}
"@
$useAuth | Out-File -FilePath "src/react-app/hooks/useAuth.ts" -Encoding utf8

$usePermissions = @"
import { useAuth } from './useAuth'

type Role = 'admin' | 'editor' | 'contributor'

export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth()

  const hasRole = (roles: Role[]) => {
    if (!isAuthenticated || !user) return false
    return roles.includes(user.role)
  }

  const isAdmin = hasRole(['admin'])
  const isEditor = hasRole(['admin', 'editor'])
  const isContributor = hasRole(['admin', 'editor', 'contributor'])

  return {
    user,
    isAdmin,
    isEditor,
    isContributor,
    hasRole,
    canEditArticle: (authorId: string) => {
      if (!user) return false
      return isAdmin || isEditor || user.id === authorId
    },
    canPublishArticle: isAdmin || isEditor,
    canManageUsers: isAdmin,
    canAccessAdmin: isContributor,
  }
}
"@
$usePermissions | Out-File -FilePath "src/react-app/hooks/usePermissions.ts" -Encoding utf8

$useArticles = @"
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database.types'

type Article = Database['public']['Tables']['articles']['Row']
type ArticleInsert = Database['public']['Tables']['articles']['Insert']

interface UseArticlesOptions {
  categorySlug?: string
  status?: string
  limit?: number
  page?: number
  searchQuery?: string
}

export const useArticles = (options: UseArticlesOptions = {}) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

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

      if (options.categorySlug) {
        query = query.eq('categories.slug', options.categorySlug)
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

      setArticles(data || [])
      setTotal(count || 0)
      setError(null)
    } catch (err: any) {
      setError(err.message)
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
      return null
    }
  }

  const incrementViews = async (articleId: string) => {
    await supabase.rpc('increment_article_views', { article_id: articleId })
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
"@
$useArticles | Out-File -FilePath "src/react-app/hooks/useArticles.ts" -Encoding utf8

$useAnalytics = @"
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
"@
$useAnalytics | Out-File -FilePath "src/react-app/hooks/useAnalytics.ts" -Encoding utf8

Write-Host "  Custom hooks created successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD COMPLETE - NEXT STEPS         " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The following has been created:" -ForegroundColor White
Write-Host "  ✓ All dependencies installed" -ForegroundColor Green
Write-Host "  ✓ Directory structure created" -ForegroundColor Green
Write-Host "  ✓ Supabase client configured" -ForegroundColor Green
Write-Host "  ✓ Database types generated" -ForegroundColor Green
Write-Host "  ✓ Zustand stores created" -ForegroundColor Green
Write-Host "  ✓ Custom hooks implemented" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Connect your Supabase project and update .env with credentials" -ForegroundColor White
Write-Host "  2. Run the database migration SQL in Supabase SQL Editor" -ForegroundColor White
Write-Host "  3. Upload your logo to public/assets/cloud_media_logo.png" -ForegroundColor White
Write-Host "  4. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host ""
Write-Host "Note: Component files are too large for this script." -ForegroundColor Yellow
Write-Host "Continue building components manually or use Lovable.dev" -ForegroundColor Yellow
Write-Host ""
