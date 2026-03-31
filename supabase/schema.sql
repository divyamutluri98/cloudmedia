-- Cloud Media News - Complete Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'contributor');
CREATE TYPE article_status AS ENUM ('draft', 'review', 'scheduled', 'published', 'archived');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document');
CREATE TYPE video_platform AS ENUM ('youtube', 'facebook', 'direct');

-- =============================================
-- TABLES
-- =============================================

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'contributor',
  bio TEXT,
  social_links JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT,
  meta_title TEXT,
  meta_description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  featured_video_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status article_status DEFAULT 'draft',
  is_breaking BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  schema_markup JSONB,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_name TEXT,
  guest_email TEXT,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Library table
CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type media_type NOT NULL,
  size INTEGER NOT NULL,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photo Gallery table
CREATE TABLE photo_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT NOT NULL,
  images JSONB NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT NOT NULL,
  video_url TEXT NOT NULL,
  platform video_platform NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  views_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_categories TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ad Placements table
CREATE TABLE ad_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slot_id TEXT NOT NULL,
  position TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  ad_code TEXT
);

-- Site Settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Breaking News Ticker table
CREATE TABLE breaking_news_ticker (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  link TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Polls table
CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  votes JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_is_breaking ON articles(is_breaking);
CREATE INDEX idx_articles_is_featured ON articles(is_featured);
CREATE INDEX idx_articles_is_trending ON articles(is_trending);
CREATE INDEX idx_articles_slug ON articles(slug);

CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_approved ON comments(is_approved);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);

CREATE INDEX idx_videos_category ON videos(category_id);
CREATE INDEX idx_videos_is_published ON videos(is_published);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE articles 
  SET views_count = views_count + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get total views
CREATE OR REPLACE FUNCTION get_total_views()
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COALESCE(SUM(views_count), 0) FROM articles);
END;
$$ LANGUAGE plpgsql;

-- Function to update slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
BEGIN
  word_count := array_length(regexp_split_to_array(content, '\s+'), 1);
  RETURN CEIL(word_count::float / 200.0); -- 200 words per minute
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at timestamp for articles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate slug before insert
CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug = generate_slug(NEW.title) || '-' || TO_CHAR(NOW(), 'YYYY-MM-DD');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_auto_slug
  BEFORE INSERT ON articles
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_slug();

-- Calculate reading time before insert/update
CREATE OR REPLACE FUNCTION calculate_article_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reading_time = calculate_reading_time(NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_calculate_reading_time
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION calculate_article_reading_time();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE breaking_news_ticker ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Admins and editors can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Articles policies
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authors can manage own articles"
  ON articles FOR ALL
  USING (author_id = auth.uid());

CREATE POLICY "Editors and admins can manage all articles"
  ON articles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Comments policies
CREATE POLICY "Approved comments are viewable by everyone"
  ON comments FOR SELECT
  USING (is_approved = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors and admins can moderate comments"
  ON comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN articles a ON a.id = comments.article_id
      WHERE p.id = auth.uid() 
      AND (p.role IN ('admin', 'editor') OR a.author_id = auth.uid())
    )
  );

-- Media Library policies
CREATE POLICY "Media library is viewable by authenticated users"
  ON media_library FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can upload media"
  ON media_library FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins and editors can manage media"
  ON media_library FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Videos policies
CREATE POLICY "Published videos are viewable by everyone"
  ON videos FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins and editors can manage videos"
  ON videos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Photo Gallery policies
CREATE POLICY "Published galleries are viewable by everyone"
  ON photo_gallery FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins and editors can manage galleries"
  ON photo_gallery FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Newsletter Subscribers policies
CREATE POLICY "Newsletter subscribers viewable by authenticated users"
  ON newsletter_subscribers FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Ad Placements policies
CREATE POLICY "Ad placements viewable by authenticated users"
  ON ad_placements FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage ad placements"
  ON ad_placements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Site Settings policies
CREATE POLICY "Site settings viewable by authenticated users"
  ON site_settings FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Breaking News Ticker policies
CREATE POLICY "Breaking news viewable by everyone"
  ON breaking_news_ticker FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins and editors can manage breaking news"
  ON breaking_news_ticker FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
    )
  );

-- Polls policies
CREATE POLICY "Active polls viewable by everyone"
  ON polls FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage polls"
  ON polls FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- =============================================
-- SEED DATA
-- =============================================

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon, display_order, is_active) VALUES
('Political News', 'political-news', 'Latest political news and updates', '#C8102E', 'landmark', 1, true),
('Praja Pulse', 'praja-pulse', 'Local community news and voices', '#0A1628', 'users', 2, true),
('Devotional', 'devotional', 'Spiritual and religious content', '#F4A300', 'sparkles', 3, true),
('Lifestyle', 'lifestyle', 'Health, wellness, and lifestyle tips', '#10B981', 'heart', 4, true),
('Cultural Programs', 'cultural-programs', 'Arts, culture, and events', '#8B5CF6', 'music', 5, true),
('Events', 'events', 'Upcoming events and programs', '#EC4899', 'calendar', 6, true),
('Sports', 'sports', 'Sports news and updates', '#3B82F6', 'trophy', 7, true),
('Business', 'business', 'Business and finance news', '#14B8A6', 'briefcase', 8, true),
('Technology', 'technology', 'Tech news and innovations', '#6366F1', 'cpu', 9, true),
('Entertainment', 'entertainment', 'Movies, music, and celebrity news', '#F59E0B', 'film', 10, true),
('Health', 'health', 'Health and medical news', '#EF4444', 'activity', 11, true),
('Education', 'education', 'Educational news and resources', '#06B6D4', 'graduation-cap', 12, true);

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('site_name', '{"en": "Cloud Media News", "te": "క్లౌడ్ మీడియా న్యూస్"}'),
('site_tagline', '{"en": "Your Trusted News Source", "te": "మీ విశ్వసనీయ వార్తా మూలం"}'),
('social_links', '{"youtube": "", "facebook": "", "twitter": "", "instagram": "", "telegram": "", "whatsapp": ""}'),
('contact_info', '{"email": "contact@cloudmedia.news", "phone": "", "address": ""}'),
('seo_defaults', '{"title": "Cloud Media News", "description": "Your trusted source for latest news", "keywords": "news, media, updates"}');

-- Insert default ad placements
INSERT INTO ad_placements (name, slot_id, position, is_active) VALUES
('Header Leaderboard', 'header-leaderboard', 'below-breaking-ticker', true),
('Sidebar Rectangle', 'sidebar-rectangle', 'article-sidebar', true),
('Sidebar Skyscraper', 'sidebar-skyscraper', 'article-sidebar-sticky', true),
('In-Content 1', 'in-content-1', 'after-3rd-paragraph', true),
('In-Content 2', 'in-content-2', 'after-7th-paragraph', true),
('Footer Leaderboard', 'footer-leaderboard', 'above-footer', true);

-- Insert sample breaking news ticker items
INSERT INTO breaking_news_ticker (text, link, display_order, is_active) VALUES
('Welcome to Cloud Media News - Your trusted news source', '/', 1, true),
('Stay informed with the latest updates from around the world', '/latest', 2, true),
('Download our mobile app for on-the-go news', '/about', 3, true);

-- Insert sample poll
INSERT INTO polls (question, options, votes, is_active, ends_at) VALUES
('What news category interests you most?', 
 '{"Political News": 0, "Sports": 0, "Technology": 0, "Entertainment": 0}', 
 '{}', 
 true, 
 NOW() + INTERVAL '30 days');

Write-Host "Database schema created successfully!" -ForegroundColor Green
Write-Host "Run this SQL in your Supabase SQL Editor to set up all tables." -ForegroundColor Yellow
