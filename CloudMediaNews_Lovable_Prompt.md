# ☁️ CLOUD MEDIA NEWS — LOVABLE.DEV FULL BUILD PROMPT
# Copy this entire prompt into Lovable.dev to generate your 100-page news platform

---

## MASTER PROMPT FOR LOVABLE.DEV

```
Build a complete, production-ready, 100-page digital news platform called "Cloud Media News" 
using React + TypeScript + Tailwind CSS + Shadcn/UI + React Router v6 + Zustand for state 
management + Supabase for backend/auth/database. The platform should look and feel like a 
premium news outlet (BBC/Al Jazeera quality). Use a deep navy blue (#0A1628), crimson red 
(#C8102E), and white (#FFFFFF) as the primary brand palette with gold accent (#F4A300).

Replace the default logo placeholder with an uploaded brand image file named 
"cloud_media_logo.png" — use it as both the navbar logo and the browser favicon. 
Until the image is uploaded, render a styled SVG text logo: a cloud icon ☁️ followed by 
"Cloud Media" in bold white + "NEWS" in crimson red, all on a navy background.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS with custom config
- Shadcn/UI component library
- React Router v6 (file-based routing)
- Zustand (global state)
- Supabase (PostgreSQL DB + Auth + Storage + Realtime)
- React Query (TanStack) for data fetching
- React Hook Form + Zod validation
- Framer Motion for animations
- React Helmet Async for SEO/meta tags
- Date-fns for date formatting
- Lucide React icons
- Recharts for admin analytics
- React Player for video embeds
- React Quill / TipTap for rich text editor

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DATABASE SCHEMA (Supabase)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create these Supabase tables:

TABLE: profiles
- id (uuid, PK, FK to auth.users)
- username (text, unique)
- full_name (text)
- avatar_url (text)
- role (enum: 'admin' | 'editor' | 'contributor')
- bio (text)
- social_links (jsonb)
- created_at (timestamptz)

TABLE: categories
- id (uuid, PK)
- name (text)
- slug (text, unique)
- description (text)
- color (text)
- icon (text)
- meta_title (text)
- meta_description (text)
- display_order (int)
- is_active (boolean)
- created_at (timestamptz)

Seed categories: Political News, Praja Pulse, Devotional, Lifestyle, Cultural Programs, Events, 
Sports, Business, Technology, Entertainment, Health, Education

TABLE: articles
- id (uuid, PK)
- title (text)
- slug (text, unique)
- excerpt (text)
- content (text, rich HTML)
- featured_image (text, URL)
- featured_video_url (text)
- category_id (uuid, FK categories)
- author_id (uuid, FK profiles)
- status (enum: 'draft' | 'review' | 'scheduled' | 'published' | 'archived')
- is_breaking (boolean, default false)
- is_featured (boolean, default false)
- is_trending (boolean, default false)
- tags (text[])
- published_at (timestamptz)
- scheduled_at (timestamptz)
- views_count (int, default 0)
- likes_count (int, default 0)
- shares_count (int, default 0)
- reading_time (int, minutes)
- seo_title (text)
- seo_description (text)
- seo_keywords (text)
- schema_markup (jsonb)
- og_image (text)
- created_at (timestamptz)
- updated_at (timestamptz)

TABLE: comments
- id (uuid, PK)
- article_id (uuid, FK articles)
- user_id (uuid, FK profiles, nullable)
- guest_name (text)
- guest_email (text)
- content (text)
- is_approved (boolean, default false)
- parent_id (uuid, FK comments, nullable)
- likes_count (int, default 0)
- created_at (timestamptz)

TABLE: media_library
- id (uuid, PK)
- filename (text)
- url (text)
- type (enum: 'image' | 'video' | 'document')
- size (int)
- alt_text (text)
- caption (text)
- uploaded_by (uuid, FK profiles)
- created_at (timestamptz)

TABLE: photo_gallery
- id (uuid, PK)
- title (text)
- description (text)
- cover_image (text)
- images (jsonb array)
- category_id (uuid, FK categories)
- is_published (boolean)
- created_at (timestamptz)

TABLE: videos
- id (uuid, PK)
- title (text)
- description (text)
- thumbnail (text)
- video_url (text)
- platform (enum: 'youtube' | 'facebook' | 'direct')
- category_id (uuid, FK categories)
- views_count (int)
- is_published (boolean)
- published_at (timestamptz)
- created_at (timestamptz)

TABLE: newsletter_subscribers
- id (uuid, PK)
- email (text, unique)
- name (text)
- subscribed_categories (text[])
- is_active (boolean, default true)
- subscribed_at (timestamptz)

TABLE: ad_placements
- id (uuid, PK)
- name (text)
- slot_id (text)
- position (text)
- is_active (boolean)
- ad_code (text)

TABLE: site_settings
- id (uuid, PK)
- key (text, unique)
- value (jsonb)
- updated_at (timestamptz)

TABLE: breaking_news_ticker
- id (uuid, PK)
- text (text)
- link (text)
- is_active (boolean)
- display_order (int)
- created_at (timestamptz)

TABLE: polls
- id (uuid, PK)
- question (text)
- options (jsonb)
- votes (jsonb)
- is_active (boolean)
- ends_at (timestamptz)
- created_at (timestamptz)

TABLE: notifications
- id (uuid, PK)
- user_id (uuid, FK profiles)
- message (text)
- type (text)
- is_read (boolean)
- link (text)
- created_at (timestamptz)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ROLE-BASED ACCESS CONTROL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADMIN: Full access to all features — manage users, site settings, ad placements, 
analytics, publish/unpublish any article, manage categories, view all comments, 
approve/reject comments, access all dashboard sections.

EDITOR: Create, edit, schedule, publish articles. Manage categories. Approve comments. 
Access media library. View analytics for own articles. Cannot manage users or site settings.

CONTRIBUTOR: Create and edit own draft articles only. Upload images. Submit for review. 
Cannot publish directly. Can view own article analytics.

Implement route guards using a custom usePermissions() hook that checks the user role 
from the profiles table.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## COMPLETE PAGE LIST (100 PAGES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### PUBLIC PAGES (60 pages)

#### CORE PAGES
1.  / — Home (Hero Slider + Breaking News + Latest Grid + Video Section + Gallery + Newsletter)
2.  /latest — Latest News (paginated grid, 20 per page)
3.  /trending — Trending Now (most viewed last 24h)
4.  /breaking — Breaking News (live feed, auto-refresh every 30s)

#### CATEGORY PAGES (one per category)
5.  /category/political-news
6.  /category/praja-pulse
7.  /category/devotional
8.  /category/lifestyle
9.  /category/cultural-programs
10. /category/events
11. /category/sports
12. /category/business
13. /category/technology
14. /category/entertainment
15. /category/health
16. /category/education

#### ARTICLE DETAIL
17. /article/:slug — Full Article Page (featured image, content, video embed, tags, 
    author bio, related articles, comment section, social share, schema markup, 
    reading progress bar)

#### VIDEO SECTION
18. /videos — Video News Hub (grid of video cards)
19. /videos/:slug — Single Video Page with player + description + related videos

#### PHOTO GALLERY
20. /gallery — Photo Gallery Hub (grid of albums)
21. /gallery/:slug — Album Detail (lightbox viewer)

#### LIVE & SPECIAL
22. /live — Live Streaming Page (YouTube embed + live chat widget)
23. /special-reports — In-depth special reports section
24. /opinion — Opinion & Editorial section
25. /fact-check — Fact Check articles

#### TAG PAGES
26. /tag/:slug — Articles by tag

#### SEARCH & FILTER
27. /search — Search results page with filters (category, date, author)
28. /search?q=:query — Pre-filtered search results

#### AUTHOR PAGES
29. /author/:username — Author profile + all articles

#### STATIC PAGES
30. /about — About Cloud Media News
31. /contact — Contact Us (form + map embed + details)
32. /advertise — Advertise with us
33. /privacy-policy — Privacy Policy
34. /terms-of-service — Terms of Service
35. /cookie-policy — Cookie Policy
36. /disclaimer — Disclaimer
37. /careers — Careers at Cloud Media
38. /team — Our Team (reporter profiles grid)

#### AUTH PAGES
39. /login — Login page (email/password + Google OAuth)
40. /register — Register page
41. /forgot-password — Forgot Password
42. /reset-password — Reset Password
43. /verify-email — Email Verification

#### USER ACCOUNT PAGES
44. /account — My Account dashboard
45. /account/profile — Edit Profile
46. /account/saved — Saved/Bookmarked articles
47. /account/notifications — Notification center
48. /account/comments — My Comments

#### NEWSLETTER
49. /newsletter — Newsletter signup landing page
50. /newsletter/confirm — Email confirmation page
51. /newsletter/unsubscribe — Unsubscribe page

#### EVENTS
52. /events — Upcoming Events listing
53. /events/:slug — Event Detail Page

#### DEVOTIONAL
54. /devotional — Devotional hub
55. /devotional/daily-mantra — Daily mantra/verse
56. /devotional/temples — Temple news

#### PRAJA PULSE
57. /praja-pulse — Praja Pulse hub (local news)
58. /praja-pulse/polls — Active polls page

#### CULTURAL PROGRAMS
59. /cultural-programs — Cultural Programs listing
60. /sitemap — HTML Sitemap

### ADMIN DASHBOARD (40 pages — all under /admin/*)

#### AUTH
61. /admin/login — Admin login

#### MAIN DASHBOARD
62. /admin — Dashboard overview (stats cards + charts + recent activity)

#### ARTICLE MANAGEMENT
63. /admin/articles — All Articles (table with filters: status, category, author, date)
64. /admin/articles/new — Create New Article (full TipTap editor)
65. /admin/articles/:id/edit — Edit Article
66. /admin/articles/drafts — Drafts
67. /admin/articles/scheduled — Scheduled Articles
68. /admin/articles/published — Published Articles
69. /admin/articles/archived — Archived Articles
70. /admin/articles/review — Articles Pending Review

#### CATEGORY MANAGEMENT
71. /admin/categories — All Categories
72. /admin/categories/new — Create Category
73. /admin/categories/:id/edit — Edit Category

#### MEDIA LIBRARY
74. /admin/media — Media Library (images/videos grid)
75. /admin/media/upload — Upload Media

#### VIDEO MANAGEMENT
76. /admin/videos — All Videos
77. /admin/videos/new — Add Video
78. /admin/videos/:id/edit — Edit Video

#### GALLERY MANAGEMENT
79. /admin/gallery — All Photo Albums
80. /admin/gallery/new — Create Album
81. /admin/gallery/:id/edit — Edit Album

#### COMMENT MODERATION
82. /admin/comments — All Comments (pending, approved, spam)
83. /admin/comments/pending — Pending Approval queue

#### USER MANAGEMENT
84. /admin/users — All Users
85. /admin/users/:id — User Detail + Role Management
86. /admin/users/new — Invite User

#### ANALYTICS
87. /admin/analytics — Overview (Google Analytics iframe + internal stats)
88. /admin/analytics/articles — Per-article performance
89. /admin/analytics/traffic — Traffic sources
90. /admin/analytics/audience — Audience demographics

#### NEWSLETTER ADMIN
91. /admin/newsletter — Subscriber list + stats
92. /admin/newsletter/compose — Compose & send newsletter

#### AD MANAGEMENT
93. /admin/ads — Ad Placements overview
94. /admin/ads/new — Create Ad Placement

#### BREAKING NEWS & TICKER
95. /admin/breaking-news — Manage breaking news ticker items

#### POLLS
96. /admin/polls — Manage polls

#### SITE SETTINGS
97. /admin/settings — General Settings (site name, logo, tagline, social links)
98. /admin/settings/seo — SEO & Schema defaults
99. /admin/settings/integrations — Google Analytics, AdSense keys
100. /admin/settings/roles — Role permissions matrix

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GLOBAL LAYOUT COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### TOP BAR (above navbar)
- Left: Date + Weather widget (city name)  
- Center: Breaking news text ticker (scrolling, red background)
- Right: Social media icons — YouTube, Facebook, Twitter/X, Instagram, Telegram, WhatsApp
  All icons use brand colors. WhatsApp opens wa.me link. Telegram opens t.me link.

### MAIN NAVBAR
- Logo (left): Cloud Media News logo image or SVG fallback
- Center: Mega navigation menu with categories as dropdowns
  Each category shows last 5 articles on hover
- Right: Search icon (opens fullscreen search), Dark/Light mode toggle, 
  Login button (shows avatar if logged in), Notification bell

### MOBILE NAVBAR
- Hamburger menu with slide-in drawer
- Category accordion menu
- Social links row
- Search bar

### BREAKING NEWS TICKER
Full-width red band below navbar: 
"🔴 BREAKING:" followed by scrolling headlines. Auto-loops. Clickable links.

### FOOTER
4-column layout:
- Col 1: Logo + tagline + social links + download app CTA
- Col 2: Quick Links (Home, About, Contact, Careers, Team)
- Col 3: Categories (all 12 categories)
- Col 4: Newsletter signup mini-form + latest 3 articles
Bottom bar: Copyright 2025 Cloud Media News | Privacy | Terms | Sitemap | Powered by ☁️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## HOME PAGE SECTIONS (detailed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### SECTION 1: HERO BREAKING NEWS SLIDER
Full-width autoplay slider (3s interval) with:
- Featured article image as background (with dark gradient overlay)
- Category badge (top left), Breaking badge if is_breaking=true
- Article title (large, white, bold)
- Excerpt (2 lines, semi-transparent white)
- Author + timestamp (bottom left)
- Read More CTA button (crimson)
- Slide indicators (bottom center)
- Prev/Next arrows
- Show 5 featured articles in rotation
- Framer Motion transitions (fade + slight zoom)

### SECTION 2: LATEST NEWS GRID (3-column)
- Left column (2/3 width): 6 latest articles in 2x3 grid
  Each card: image, category badge, title, excerpt, author, time
- Right column (1/3 width): 
  - "Most Read" list (numbered 1-5 with small thumbnails)
  - Poll widget (active poll with vote buttons)
  - Weather widget

### SECTION 3: CATEGORY STRIP (horizontal scroll)
Row of category pills/chips with icons. Click navigates to category page.

### SECTION 4: POLITICAL NEWS SECTION
Full-width section header with red left border.
3-column grid of latest 6 Political News articles.

### SECTION 5: PRAJA PULSE SECTION
Dark navy background. 4-column grid of Praja Pulse articles.

### SECTION 6: VIDEO NEWS SECTION
Header: "📺 Video News"
3-column grid of video cards with:
- YouTube thumbnail
- Play button overlay
- Title
- Duration
- Views count
"View All Videos" button

### SECTION 7: DEVOTIONAL + LIFESTYLE (split)
2-column split: Left=Devotional section (3 articles), Right=Lifestyle section (3 articles)

### SECTION 8: PHOTO GALLERY
Full-width masonry-style grid of latest album covers (6 albums)
Click opens gallery page. Hover shows album title overlay.

### SECTION 9: CULTURAL PROGRAMS + EVENTS
Side-by-side:
- Cultural Programs: 3 article cards
- Events: Upcoming events list with date badges and countdown

### SECTION 10: NEWSLETTER SIGNUP BANNER
Full-width deep navy banner with cloud illustration:
- Headline: "Stay Informed with Cloud Media News"
- Subtext: "Get the latest news delivered to your inbox"
- Email input + "Subscribe" button
- "10,000+ subscribers" social proof badge

### SECTION 11: TRENDING TAGS CLOUD
Interactive tag cloud with article counts

### SECTION 12: AD PLACEMENTS
- Leaderboard ad (728x90) below hero
- Rectangle ads (300x250) in right sidebar
- In-feed native ads every 5 articles

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ARTICLE PAGE (detailed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

URL Pattern: /article/category-name-slug-YYYY-MM-DD

Layout (2-column):

MAIN CONTENT (70%):
1. Breadcrumb: Home > Category > Article Title
2. Category badge + Breaking badge (if applicable)
3. Article title (H1, bold, large)
4. Meta row: Author avatar + name link | Published date | Updated date | Reading time | Views
5. Social share bar (sticky left sidebar on desktop): 
   Facebook, Twitter/X, WhatsApp, Telegram, Copy Link, Print
6. Featured Image (full width, with caption)
7. Article content (rich text, TipTap rendered HTML)
8. If video: Embedded video player (React Player, supports YouTube/Facebook)
9. Tags list
10. Author Bio card (avatar, name, bio, social links, "View all articles by" link)
11. Article reactions: 👍 Like | ❤️ Love | 😮 Surprised | 😢 Sad | 😡 Angry
12. Related Articles (4-column grid, same category)

COMMENT SYSTEM:
- Total comments count
- Login to comment OR guest comment form (name, email required)
- Nested replies (1 level deep)
- Comment card: avatar/initial, name, timestamp, content, Like button, Reply button
- Load more comments (pagination, 10 per page)
- Admin/Editor moderation actions (approve, delete, mark spam)

SIDEBAR (30%):
- Sticky ad unit (300x600)
- Most Read Today (numbered list, 5 articles)
- Category articles (5 from same category)
- Newsletter mini-signup
- Social media follow widgets
- Tags cloud
- Latest Videos (3 thumbnails)
- Poll widget

SEO per article:
- React Helmet: title, description, og:image, og:type=article, twitter:card
- JSON-LD Schema: NewsArticle, Author, Publisher, datePublished, dateModified, 
  headline, image, articleBody, keywords
- Canonical URL
- Reading progress bar (top of page, crimson color)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ADMIN DASHBOARD (detailed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Admin layout: Dark sidebar (collapsible) + main content area

SIDEBAR MENU:
- Dashboard
- Articles (with badge count for pending review)
- Categories
- Media Library
- Videos
- Photo Gallery
- Comments (with badge for pending)
- Users
- Analytics
- Newsletter
- Breaking News
- Polls
- Ad Placements
- Settings

DASHBOARD OVERVIEW CARDS:
- Total Articles | Published Today | Total Views | Total Subscribers
- Pending Review | Active Breaking News | Total Comments | New Users

CHARTS (Recharts):
- Line chart: Daily page views (last 30 days)
- Bar chart: Articles published per category (last 7 days)
- Pie chart: Traffic sources
- Area chart: Newsletter subscribers growth

RECENT ACTIVITY FEED:
Latest 10 actions with timestamp (article published, comment added, user registered)

ARTICLE EDITOR (/admin/articles/new and /admin/articles/:id/edit):
Use TipTap rich text editor with toolbar:
- Bold, Italic, Underline, Strike
- H1, H2, H3, H4
- Bullet list, Ordered list
- Blockquote
- Code block
- Link, Image insert (from media library)
- YouTube embed
- Undo/Redo

Form fields:
- Title (auto-generates slug, editable)
- Excerpt
- Content (TipTap editor)
- Category (dropdown)
- Tags (multi-select with create new)
- Featured Image (upload or pick from media library with preview)
- Featured Video URL
- Status (Draft / Review / Scheduled / Published)
- Schedule date/time picker (shows when Scheduled is selected)
- Is Breaking News toggle
- Is Featured toggle
- Is Trending toggle
- SEO tab: seo_title, seo_description, seo_keywords, og_image
- Preview button (opens article preview in new tab)
- Save Draft | Submit for Review | Publish Now buttons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SEO & SCHEMA MARKUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Implement with React Helmet Async on every page.

NewsArticle Schema (per article):
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title",
  "image": ["featured_image_url"],
  "datePublished": "ISO date",
  "dateModified": "ISO date",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "author profile url"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Cloud Media News",
    "logo": {
      "@type": "ImageObject",
      "url": "logo url"
    }
  },
  "description": "Article excerpt",
  "articleBody": "Article content text",
  "keywords": "comma separated tags",
  "articleSection": "Category Name",
  "inLanguage": "te-IN"
}
```

BreadcrumbList Schema on article + category pages.
WebSite Schema on homepage with SearchAction.
SEO-friendly URL slugs: /article/[category-slug]-[title-slug]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SOCIAL MEDIA INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In site settings, store:
- youtube_url, facebook_url, twitter_url, instagram_url, telegram_url, whatsapp_number

Social share buttons on every article use native share APIs:
- Facebook: https://www.facebook.com/sharer/sharer.php?u={url}
- Twitter/X: https://twitter.com/intent/tweet?url={url}&text={title}
- WhatsApp: https://wa.me/?text={title}%20{url}
- Telegram: https://t.me/share/url?url={url}&text={title}
- Copy Link: navigator.clipboard.writeText(url)

Top bar social icons link to official pages.
Footer social links with follower count display.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## GOOGLE ADSENSE & ANALYTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AdSense placements (stored in ad_placements table, rendered dynamically):
- #header-leaderboard: 728x90 below breaking ticker
- #sidebar-rectangle: 300x250 in article sidebar  
- #sidebar-skyscraper: 300x600 sticky in article sidebar
- #in-content-1: 336x280 after 3rd paragraph
- #in-content-2: 336x280 after 7th paragraph
- #footer-leaderboard: 728x90 above footer

All ad slots use:
<ins class="adsbygoogle" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot="XXXXXXXXXX">

Google Analytics 4:
- GA4 measurement ID stored in site_settings
- Track: page_view, article_read, video_play, gallery_view, newsletter_signup, 
  social_share, search_query, comment_submit, user_register

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PERFORMANCE & MOBILE OPTIMIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Lazy loading: All images use loading="lazy" + IntersectionObserver
- Image optimization: WebP format, srcset for responsive images
- Code splitting: React.lazy() + Suspense for all route components
- Infinite scroll on category pages (replace pagination for mobile)
- Service Worker for offline reading of cached articles
- Skeleton loaders on all data-fetched sections
- Debounced search input (300ms)
- Virtualized lists for comment sections (react-window)
- Mobile-first CSS: 375px base, breakpoints at 640px, 768px, 1024px, 1280px
- Touch-friendly: min 44px tap targets, swipeable sliders
- PWA manifest: name, icons, theme_color (#0A1628), background_color (#FFFFFF)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REALTIME FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Using Supabase Realtime:
- Breaking news ticker auto-updates without page refresh
- Live article view counts
- Comment count badge updates live
- Admin dashboard activity feed streams in real-time
- Breaking news notification toast appears for all users when new breaking article published

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ACCESSIBILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- WCAG 2.1 AA compliance
- Skip to main content link
- Proper ARIA labels on all interactive elements
- Keyboard navigation for all menus and modals
- Focus visible indicators
- Alt text on all images (from database)
- Color contrast ratio ≥ 4.5:1 for all text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DUMMY DATA (seed for demo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Seed the database with:
- 3 demo users: 1 admin, 1 editor, 1 contributor
- 50 demo articles spread across all categories (with lorem ipsum content + 
  picsum.photos for images)
- 5 demo videos (YouTube embed URLs)
- 3 demo photo albums (6 images each)
- 20 demo newsletter subscribers
- 10 demo comments on various articles
- 2 active polls
- 5 breaking news ticker items

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DARK MODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full dark mode support using Tailwind's dark: variant.
Dark palette:
- Background: #0D1117
- Card: #161B22
- Border: #30363D
- Text primary: #E6EDF3
- Text secondary: #8B949E

Toggle stored in localStorage. Auto-detects OS preference via prefers-color-scheme.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## NOTIFICATION SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Browser push notifications (if user opts in):
- New breaking news
- Article published in subscribed category
- Comment reply
- Comment approved

In-app notification bell (top navbar):
- Unread count badge
- Dropdown with latest 10 notifications
- Mark all as read

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MULTILINGUAL SUPPORT (Foundation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use i18next with react-i18next.
Support Telugu (te) and English (en).
Language switcher in top bar: EN | తె
Store preference in localStorage.
Translate all UI labels. Article content remains in original language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FILE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/
├── components/
│   ├── layout/ (Navbar, Footer, TopBar, BreakingTicker, Sidebar)
│   ├── home/ (HeroSlider, NewsGrid, VideoSection, GallerySection, Newsletter)
│   ├── article/ (ArticleCard, ArticleDetail, CommentSection, AuthorBio, 
│   │             RelatedArticles, SocialShare, ReadingProgress)
│   ├── admin/ (ArticleEditor, MediaPicker, StatsCard, ActivityFeed)
│   ├── common/ (AdUnit, PollWidget, TagCloud, CategoryBadge, Skeleton)
│   └── ui/ (shadcn components)
├── pages/
│   ├── public/ (all 60 public pages)
│   └── admin/ (all 40 admin pages)
├── hooks/
│   ├── useAuth.ts
│   ├── usePermissions.ts
│   ├── useArticles.ts
│   ├── useAnalytics.ts
│   └── useRealtime.ts
├── stores/
│   ├── authStore.ts
│   ├── uiStore.ts
│   └── notificationStore.ts
├── lib/
│   ├── supabase.ts
│   ├── seo.ts
│   ├── schema.ts
│   └── analytics.ts
├── types/
│   └── database.types.ts (auto-generated from Supabase)
└── utils/
    ├── slugify.ts
    ├── readingTime.ts
    ├── dateFormat.ts
    └── adManager.ts

Build this complete platform now. Start with the Supabase schema setup, then the 
public-facing home page with all sections, then article detail page, then category 
pages, then auth, then admin dashboard. Make it fully functional end-to-end with 
Supabase as the backend. Use real Supabase queries everywhere — no mock data in 
components, use the seeded database data instead.
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## HOW TO USE THIS PROMPT IN LOVABLE.DEV
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to https://lovable.dev and start a new project
2. Copy ONLY the text between the triple backticks above
3. Paste into the Lovable chat prompt
4. Let it generate the initial build (~15-20 min)
5. After generation, connect your Supabase project via the Supabase integration panel
6. Upload your "cloud_media_logo.png" to the Supabase Storage bucket "public/assets/"
7. Update the logo URL in Site Settings → General
8. Run the seed SQL script to populate demo data
9. Set up Google Analytics 4 and AdSense IDs in Settings → Integrations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FOLLOW-UP PROMPTS (use after initial build)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prompt 2 (Article Editor):
"Now build out the complete admin article editor page at /admin/articles/new 
with TipTap rich text editor, media library picker modal, SEO tab, 
scheduling calendar, and real Supabase save/update functions."

Prompt 3 (Comment System):
"Implement the full comment system on article pages with nested replies, 
guest commenting, real-time updates via Supabase Realtime, 
like/dislike, and admin moderation panel at /admin/comments."

Prompt 4 (Analytics Dashboard):
"Build the admin analytics pages using Recharts with data from Supabase. 
Include daily views chart, category performance bars, 
traffic source pie chart, and export to CSV feature."

Prompt 5 (PWA + Performance):
"Add PWA support with service worker, offline mode for cached articles, 
push notification setup, lazy loading for all images, 
and skeleton loaders throughout the platform."
```
