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

export type Database = {
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
