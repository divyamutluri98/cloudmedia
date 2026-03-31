# LOVABLE.DEV - COMPLETE UI GENERATION PROMPT
# Copy this ENTIRE prompt into Lovable.dev to generate ALL UI components at once

---

Build a complete, production-ready digital news platform called "Cloud Media News" with ALL UI components listed below. Use React + TypeScript + Tailwind CSS + Shadcn/UI patterns. The platform should look professional like BBC/Al Jazeera. Use brand colors: deep navy blue (#0A1628), crimson red (#C8102E), white (#FFFFFF), and gold accent (#F4A300).

## TECH STACK
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS with custom config
- Shadcn/UI component library (already installed)
- React Router v7 (file-based routing)
- Zustand for state management (already configured)
- Supabase client (already configured at src/react-app/lib/supabase.ts)
- Framer Motion for animations
- Lucide React icons
- Recharts for analytics
- React Player for video embeds

## EXISTING INFRASTRUCTURE (USE THESE):
- Supabase client: `src/react-app/lib/supabase.ts`
- Database types: `src/react-app/types/database.types.ts`
- Custom hooks: `src/react-app/hooks/useAuth.ts`, `usePermissions.ts`, `useArticles.ts`, `useAnalytics.ts`
- Zustand stores: `src/react-app/stores/authStore.ts`, `uiStore.ts`, `notificationStore.ts`

## BRAND COLORS
- Primary Navy: #0A1628
- Crimson Red: #C8102E
- White: #FFFFFF
- Gold Accent: #F4A300

---

## COMPLETE COMPONENT LIST TO BUILD

### 1. LAYOUT COMPONENTS (src/react-app/components/layout/)

**TopBar.tsx**:
- Left: Date display + Weather widget (city name with icon)
- Center: Breaking news ticker (scrolling text, red background, "🔴 BREAKING:" label)
- Right: Social media icons (YouTube, Facebook, Twitter/X, Instagram, Telegram, WhatsApp)
- Dark mode compatible
- Fetch breaking news from Supabase `breaking_news_ticker` table

**Navbar.tsx**:
- Left: Cloud Media News logo (image or SVG fallback)
- Center: Mega menu with categories dropdown (show last 5 articles per category on hover)
- Right: Search icon (opens search modal), Dark/Light toggle, Login button, Notification bell
- Mobile responsive with hamburger menu
- Categories from Supabase `categories` table

**Footer.tsx**:
- 4-column layout:
  - Col 1: Logo + tagline + social links + app download CTA
  - Col 2: Quick Links (Home, About, Contact, Careers, Team)
  - Col 3: All 12 categories list
  - Col 4: Newsletter signup mini-form + latest 3 articles
- Bottom bar: Copyright + Privacy + Terms + Sitemap
- Dark mode compatible

**BreakingTicker.tsx**:
- Full-width red band
- Auto-scrolling breaking news text
- Clickable links
- Real-time updates via Supabase Realtime
- Loop through items automatically

**Layout.tsx**:
- Main wrapper component
- Includes TopBar, Navbar, Footer
- Children prop for page content
- Responsive container

---

### 2. HOME PAGE COMPONENTS (src/react-app/components/home/)

**HeroSlider.tsx**:
- Full-width autoplay slider (3s interval, 5 featured articles)
- Featured image as background with dark gradient overlay
- Category badge (top-left), Breaking badge if applicable
- Article title (large, white, bold)
- Excerpt (2 lines, semi-transparent)
- Author + timestamp (bottom-left)
- "Read More" CTA button (crimson color)
- Slide indicators (bottom center)
- Prev/Next arrows
- Framer Motion transitions (fade + slight zoom)
- Fetch from `articles` where is_featured=true

**NewsGrid.tsx**:
- 3-column layout:
  - Left column (2/3 width): 6 latest articles in 2x3 grid
  - Right column (1/3 width):
    - "Most Read" list (numbered 1-5 with thumbnails)
    - Poll widget (active poll with vote buttons)
    - Weather widget
- Article cards: image, category badge, title, excerpt, author, time
- Infinite scroll or pagination
- Fetch from `articles` ordered by published_at DESC

**CategoryStrip.tsx**:
- Horizontal scrollable row of category pills/chips
- Each with icon from database
- Click navigates to category page
- Fetch from `categories` table

**VideoSection.tsx**:
- Header: "📺 Video News"
- 3-column grid of video cards
- YouTube thumbnail with play button overlay
- Title, duration, views count
- "View All Videos" button
- Fetch from `videos` table where is_published=true

**GallerySection.tsx**:
- Full-width masonry-style grid
- Album covers (6 albums)
- Hover shows album title overlay
- Click opens gallery page
- Fetch from `photo_gallery` where is_published=true

**NewsletterSignup.tsx**:
- Full-width deep navy banner with cloud illustration
- Headline: "Stay Informed with Cloud Media News"
- Subtext: "Get the latest news delivered to your inbox"
- Email input + "Subscribe" button
- "10,000+ subscribers" social proof badge
- Subscribe to `newsletter_subscribers` table

---

### 3. ARTICLE COMPONENTS (src/react-app/components/article/)

**ArticleDetail.tsx** (page component - src/react-app/pages/public/):
URL Pattern: /article/:slug

Main Content (70%):
- Breadcrumb navigation
- Category badge + Breaking badge
- Article title (H1, bold, large)
- Meta row: Author avatar + name link | Published date | Updated date | Reading time | Views
- Sticky social share bar (Facebook, Twitter, WhatsApp, Telegram, Copy Link, Print)
- Featured image (full width, with caption)
- Article content (rich HTML from TipTap editor)
- Embedded video player if featured_video_url exists
- Tags list
- Author Bio card (avatar, name, bio, social links, "View all articles" link)
- Article reactions: 👍 Like | ❤️ Love | 😮 Surprised | 😢 Sad | 😡 Angry
- Related Articles (4-column grid, same category)

Sidebar (30%):
- Sticky ad unit (300x600)
- Most Read Today (numbered list, 5 articles)
- Category articles (5 from same category)
- Newsletter mini-signup
- Social media follow widget
- Tags cloud
- Latest Videos (3 thumbnails)
- Poll widget

SEO Features:
- React Helmet Async: title, description, og:image, og:type=article, twitter:card
- JSON-LD Schema: NewsArticle markup
- Canonical URL
- Reading progress bar (top of page, crimson color)

Fetch article by slug with joins to categories and profiles.

**CommentSection.tsx**:
- Total comments count
- Login to comment OR guest comment form (name, email required for guests)
- Nested replies (1 level deep)
- Comment card: avatar/initial, name, timestamp, content, Like button, Reply button
- Load more comments (pagination, 10 per page)
- Admin/Editor moderation actions visible (approve, delete, mark spam)
- Real-time updates via Supabase Realtime
- Fetch from `comments` table with profile joins

**AuthorBio.tsx**:
- Avatar image
- Author name (link to profile page)
- Bio text
- Social media links (Twitter, Facebook, LinkedIn, etc.)
- "View all articles by [author]" link
- Fetch from `profiles` table

**SocialShare.tsx**:
- Share buttons: Facebook, Twitter/X, WhatsApp, Telegram, Copy Link, Print
- Use native share APIs
- Sticky sidebar on desktop
- Share count display (if available)

**RelatedArticles.tsx**:
- 4-column grid
- Articles from same category
- Exclude current article
- Limit to 4 articles
- Fetch with category_id filter

---

### 4. AUTH PAGES (src/react-app/pages/auth/)

**Login.tsx** (/login):
- Email input with validation
- Password input
- "Remember me" checkbox
- "Forgot password?" link
- "Login" button with loading state
- "Or continue with Google" button (Google OAuth)
- Link to register page
- Error handling for invalid credentials
- Success redirect to previous page or /account
- Use Supabase auth

**Register.tsx** (/register):
- Username input (unique validation)
- Email input
- Password input with strength indicator
- Confirm password
- "Create account" button
- Link to login page
- Email verification notice after registration
- Use Supabase auth

**ForgotPassword.tsx** (/forgot-password):
- Email input
- "Send reset link" button
- Success message
- Back to login link
- Use Supabase password reset

**ResetPassword.tsx** (/reset-password):
- New password input with strength meter
- Confirm password
- "Reset password" button
- Success redirect to login
- Use Supabase password update

**VerifyEmail.tsx** (/verify-email):
- Email verification confirmation
- Resend verification email option
- Redirect to login after verification

---

### 5. USER ACCOUNT PAGES (src/react-app/pages/account/)

**Dashboard.tsx** (/account):
- Welcome message
- Stats cards (articles read, comments posted, notifications count)
- Recent activity feed
- Quick links to other account pages
- Protected route (require authentication)

**Profile.tsx** (/account/profile):
- Avatar upload with preview
- Full name input
- Bio textarea
- Social links inputs (Twitter, Facebook, LinkedIn, etc.)
- Save button with loading state
- Change password section
- Update profile in `profiles` table

**SavedArticles.tsx** (/account/saved):
- Grid of bookmarked articles
- Remove bookmark option
- Empty state when no saved articles
- Pagination
- User's saved articles only

**MyComments.tsx** (/account/comments):
- List of user's comments
- Comment status (approved/pending)
- Links to parent articles
- Edit/delete own comments
- Pagination

**Notifications.tsx** (/account/notifications):
- List of notifications
- Mark as read/unread individually
- Mark all as read button
- Filter by type
- Real-time updates via Supabase Realtime
- Fetch from `notifications` table

---

### 6. PUBLIC PAGES (src/react-app/pages/public/)

**Category.tsx** (/category/:slug):
- Category header with name and description
- Grid of articles in this category
- Filters (date, author)
- Pagination or infinite scroll
- Fetch articles filtered by category slug

**Latest.tsx** (/latest):
- Paginated grid of latest articles (20 per page)
- Chronological order
- Infinite scroll option for mobile
- Fetch all published articles

**Trending.tsx** (/trending):
- Most viewed articles in last 24 hours
- Ordered by views_count
- Time badge showing "Last 24 hours"
- Fetch with time filter

**Breaking.tsx** (/breaking):
- Live breaking news feed
- Auto-refresh every 30 seconds
- Real-time updates via Supabase Realtime
- Grid layout
- Fetch where is_breaking=true

**Search.tsx** (/search):
- Search input with query parameter
- Results grid
- Filters: category dropdown, date range, author dropdown
- Search in title, excerpt, content
- Debounced search (300ms)

**Videos.tsx** (/videos):
- Hub page for all videos
- Grid layout
- Filters by category
- Fetch from `videos` table

**VideoDetail.tsx** (/videos/:slug):
- Video player (React Player)
- Title and description
- Related videos
- Views counter
- Fetch single video by slug

**Gallery.tsx** (/gallery):
- Photo gallery hub
- Grid of album covers
- Fetch from `photo_gallery`

**AlbumDetail.tsx** (/gallery/:slug):
- Album title and description
- Lightbox/masonry viewer for images
- Navigation between images
- Fetch album with images array

**About.tsx** (/about):
- Static page about Cloud Media News
- Mission statement
- Team introduction
- History/timeline
- Values section

**Contact.tsx** (/contact):
- Contact form (name, email, subject, message)
- Map embed (Google Maps)
- Contact details (email, phone, address)
- Social media links
- Form submission to backend or email service

**PrivacyPolicy.tsx** (/privacy-policy):
- Privacy policy content
- GDPR compliance information
- Data usage policies

**TermsOfService.tsx** (/terms-of-service):
- Terms and conditions
- User responsibilities
- Disclaimers

**Team.tsx** (/team):
- Grid of team member profiles
- Name, role, avatar, bio
- Social links for each member
- Fetch from `profiles` table

**Careers.tsx** (/careers):
- Job listings
- Company culture section
- Benefits
- Application instructions

---

### 7. ADMIN DASHBOARD (src/react-app/pages/admin/) - ALL UNDER /admin/*

**AdminLayout.tsx**:
- Dark sidebar (collapsible)
- Main content area
- Sidebar menu:
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
- Top bar with user menu and notifications
- Role-based access control

**Dashboard.tsx** (/admin):
- Stats cards:
  - Total Articles
  - Published Today
  - Total Views
  - Total Subscribers
  - Pending Review
  - Active Breaking News
  - Total Comments
  - New Users Today
- Charts (Recharts):
  - Line chart: Daily page views (last 30 days)
  - Bar chart: Articles published per category (last 7 days)
  - Pie chart: Traffic sources
  - Area chart: Newsletter subscribers growth
- Recent activity feed (last 10 actions)
- Fetch stats from Supabase

**ArticlesList.tsx** (/admin/articles):
- DataTable with columns: Title, Author, Category, Status, Views, Likes, Published Date, Actions
- Filters: Status dropdown, Category dropdown, Author dropdown, Date range picker
- Search box (searches title and content)
- Pagination (20 per page)
- Bulk actions: Select all, Delete selected, Change status
- Row actions: Edit, View, Delete, Duplicate
- Sortable columns
- Responsive design with mobile view
- Fetch from `articles` with joins

**ArticleEditor.tsx** (/admin/articles/new and /admin/articles/:id/edit):
Form fields:
- Title input (auto-generates slug, editable)
- Excerpt textarea
- TipTap rich text editor with full toolbar:
  - Bold, Italic, Underline, Strike
  - H1, H2, H3, H4
  - Bullet list, Ordered list
  - Blockquote
  - Code block
  - Link, Image insert
  - YouTube embed
  - Undo/Redo
- Category dropdown
- Tags multi-select with create new option
- Featured image upload with preview (or pick from media library)
- Featured video URL input
- Status dropdown (Draft / Review / Scheduled / Published)
- Schedule date/time picker (shows when Scheduled is selected)
- Is Breaking News toggle
- Is Featured toggle
- Is Trending toggle
- SEO tab: seo_title, seo_description, seo_keywords, og_image
- Preview button (opens preview in new tab)
- Save Draft | Submit for Review | Publish Now buttons
- Loading states and error handling
- Save/update to `articles` table

**CategoriesList.tsx** (/admin/categories):
- List of all categories
- Create/Edit/Delete operations
- Drag-and-drop reordering
- Activate/deactivate toggle
- Color picker for category color
- Icon selector
- Fetch from `categories` table

**MediaLibrary.tsx** (/admin/media):
- Grid view of all media (images/videos/documents)
- Upload button (opens modal)
- Filter by type
- Search functionality
- Alt text editing
- Caption editing
- Delete functionality
- Fetch from `media_library` table

**UploadMedia.tsx** (/admin/media/upload):
- File upload with drag-and-drop
- Progress indicator
- Multiple file upload
- Type selection (image/video/document)
- Alt text input
- Caption input
- Upload to Supabase Storage
- Save metadata to `media_library` table

**VideosList.tsx** (/admin/videos):
- List of all videos
- Create/Edit/Delete
- Thumbnail upload
- Video URL input (YouTube/Facebook/Direct)
- Category assignment
- Publish toggle
- Views counter display

**GalleryList.tsx** (/admin/gallery):
- List of photo albums
- Create/Edit/Delete
- Cover image upload
- Multiple image upload for album
- Image ordering
- Publish toggle

**CommentsModeration.tsx** (/admin/comments):
- All comments list
- Tabs: Pending, Approved, Spam
- Approve/Reject actions
- Delete comments
- Edit comments
- Filter by article
- Bulk actions

**UsersList.tsx** (/admin/users):
- List of all users
- User detail view
- Role management (admin/editor/contributor)
- Invite user functionality
- Activate/deactivate accounts
- Search and filter

**UserDetail.tsx** (/admin/users/:id):
- User profile details
- Role dropdown
- Articles authored
- Comments made
- Activity history
- Edit user details

**Analytics.tsx** (/admin/analytics):
- Overview dashboard with charts
- Per-article performance table
- Traffic sources pie chart
- Audience demographics
- Export to CSV feature
- Date range filters
- Fetch analytics data

**NewsletterAdmin.tsx** (/admin/newsletter):
- Subscriber list with stats
- Compose & send newsletter form
- Email template editor
- Send test email
- View sent newsletters
- Subscriber analytics

**AdPlacements.tsx** (/admin/ads):
- List of ad placements
- Create/Edit/Delete ad slots
- Position configuration
- Ad code input (HTML/JavaScript)
- Activate/deactivate toggle
- Preview placements

**BreakingNews.tsx** (/admin/breaking-news):
- Manage breaking news ticker items
- Add/Edit/Delete items
- Display order management (drag-and-drop)
- Activate/deactivate toggle
- Link input for each item

**Polls.tsx** (/admin/polls):
- List of polls
- Create new poll
- Question input
- Options management (add/remove options)
- Vote results visualization
- Activate/deactivate
- Set end date

**Settings.tsx** (/admin/settings):
- General settings tab:
  - Site name
  - Tagline
  - Logo upload
  - Social media links
  - Contact information
- SEO settings tab:
  - Default meta title
  - Default meta description
  - Default keywords
  - Schema markup defaults
- Integrations tab:
  - Google Analytics ID input
  - AdSense Client ID input
  - Other API keys
- Save to `site_settings` table

---

## ADDITIONAL REQUIREMENTS

### SEO Implementation:
- Use React Helmet Async on ALL pages
- Implement JSON-LD schema markup for:
  - NewsArticle (on article pages)
  - BreadcrumbList (on article + category pages)
  - WebSite (on homepage)
  - SearchAction (on homepage)
- Generate canonical URLs
- Open Graph tags for social sharing
- Twitter Card metadata

### Performance Optimizations:
- Lazy loading for all images (loading="lazy")
- Code splitting with React.lazy() and Suspense
- Skeleton loaders for all data-fetching sections
- Debounced search input (300ms)
- Virtualized lists for long comment sections
- Infinite scroll on category and listing pages
- IntersectionObserver for lazy loading

### Accessibility (WCAG 2.1 AA):
- Skip to main content link
- Proper ARIA labels on all interactive elements
- Keyboard navigation for all menus and modals
- Focus visible indicators
- Alt text on all images (from database)
- Color contrast ratio ≥ 4.5:1 for all text
- Semantic HTML throughout

### Real-Time Features (Supabase Realtime):
- Breaking news ticker auto-updates
- Live article view counts
- Comment count badge updates
- Admin dashboard activity feed
- Breaking news notification toast
- Notifications real-time updates

### Dark Mode:
- Toggle in navbar
- Stored in localStorage
- Auto-detect OS preference via prefers-color-scheme
- Consistent dark palette across all components
- Smooth transitions

---

## IMPLEMENTATION NOTES

1. **Use existing infrastructure**: Import and use the Supabase client, hooks, and stores already configured
2. **Type safety**: Use TypeScript types from database.types.ts
3. **Error handling**: Show user-friendly error messages
4. **Loading states**: Use skeleton loaders, not just spinners
5. **Responsive design**: Mobile-first approach, test all breakpoints
6. **Performance**: Optimize images, lazy load, code split
7. **SEO**: Every page needs proper meta tags
8. **Accessibility**: Test with keyboard navigation
9. **Real-time**: Subscribe to Supabase channels where appropriate
10. **Security**: Respect RLS policies, validate user permissions

---

## DELIVERABLES

Generate ALL components listed above with:
- Complete TypeScript code
- Tailwind CSS styling
- Responsive design
- Error handling
- Loading states
- Real Supabase integration
- Proper imports and exports
- Clean, maintainable code structure

Start with layout components first, then home page, then article pages, then auth, then user account, then admin dashboard.

Make everything production-ready and fully functional!
