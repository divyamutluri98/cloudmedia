# ☁️ Cloud Media News

A complete, production-ready digital news platform built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)

### Installation & Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run the Automated Build Script** (Windows PowerShell)
```powershell
.\build-complete.ps1
```

This script will:
- Install all required dependencies
- Create the complete directory structure
- Set up Supabase client configuration
- Generate database types
- Create Zustand stores
- Implement custom hooks
- Set up environment templates

3. **Set Up Supabase Database**

   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to SQL Editor in your Supabase dashboard
   
   c. Run `supabase/schema.sql` to create all tables
   
   d. Run `supabase/seed-data.sql` to populate demo content

4. **Configure Environment Variables**

   Copy `.env.example` to `.env` and update with your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Upload Brand Logo** (Optional)
   
   Upload your logo to `public/assets/cloud_media_logo.png`

6. **Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📋 Features

### Public Pages (60 pages)
- ✅ Home page with hero slider, latest news, video section, gallery
- ✅ Category pages (12 categories)
- ✅ Article detail pages with comments system
- ✅ Video news hub
- ✅ Photo gallery
- ✅ Live streaming page
- ✅ Search and filter functionality
- ✅ Author profiles
- ✅ Newsletter subscription
- ✅ Static pages (About, Contact, Privacy, etc.)

### Admin Dashboard (40 pages)
- ✅ Dashboard with analytics and stats
- ✅ Article management (create, edit, schedule, publish)
- ✅ Category management
- ✅ Media library with upload
- ✅ Video management
- ✅ Photo gallery management
- ✅ Comment moderation
- ✅ User management with role-based access
- ✅ Analytics dashboard with charts
- ✅ Newsletter management
- ✅ Ad placement management
- ✅ Breaking news ticker
- ✅ Polls management
- ✅ Site settings

### Technical Features
- 🔐 Authentication with Supabase Auth
- 🎨 Dark mode support
- 📱 Mobile-first responsive design
- ⚡ Real-time updates with Supabase Realtime
- 🎯 SEO optimized with schema markup
- ♿ WCAG 2.1 AA accessibility compliant
- 🌐 Multilingual support foundation (Telugu + English)
- 📊 Google Analytics integration
- 💰 Google AdSense integration
- 🚀 Performance optimized with lazy loading
- 📲 PWA ready with service worker

## 🏗️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Shadcn/UI patterns
- **Routing:** React Router v7
- **State Management:** Zustand
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **SEO:** React Helmet Async
- **Rich Text Editor:** TipTap
- **Charts:** Recharts
- **Video Player:** React Player
- **Date Handling:** date-fns
- **Icons:** Lucide React

## 📁 Project Structure

```
cloudmedia/
├── src/
│   ├── react-app/
│   │   ├── components/
│   │   │   ├── layout/       # TopBar, Navbar, Footer, BreakingTicker
│   │   │   ├── home/         # HeroSlider, NewsGrid, VideoSection
│   │   │   ├── article/      # ArticleDetail, Comments, AuthorBio
│   │   │   ├── admin/        # Admin components
│   │   │   ├── common/       # Shared components (AdUnit, PollWidget)
│   │   │   └── ui/           # Base UI components
│   │   ├── pages/
│   │   │   ├── public/       # 60 public pages
│   │   │   ├── admin/        # 40 admin pages
│   │   │   ├── auth/         # Login, Register, Reset Password
│   │   │   └── account/      # User account pages
│   │   ├── hooks/            # Custom hooks (useAuth, useArticles, etc.)
│   │   ├── stores/           # Zustand stores (auth, ui, notifications)
│   │   ├── lib/              # Supabase client, utilities
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Helper functions
│   └── worker/               # Cloudflare Worker
├── supabase/
│   ├── schema.sql            # Database schema
│   └── seed-data.sql         # Demo data
├── public/
│   └── assets/               # Images, logos
├── .env.example              # Environment template
└── build-complete.ps1        # Automated build script
```

## 🗄️ Database Schema

The platform includes these tables:
- `profiles` - User profiles with roles
- `categories` - News categories
- `articles` - News articles
- `comments` - Article comments
- `media_library` - Images and media
- `photo_gallery` - Photo albums
- `videos` - Video news
- `newsletter_subscribers` - Email subscribers
- `ad_placements` - Ad configurations
- `site_settings` - Site configuration
- `breaking_news_ticker` - Breaking news
- `polls` - Interactive polls
- `notifications` - User notifications

## 👥 User Roles

### Admin
- Full access to all features
- Manage users and site settings
- Approve/reject content
- View all analytics

### Editor
- Create, edit, publish articles
- Manage categories
- Approve comments
- Access media library

### Contributor
- Create and edit own drafts
- Submit for review
- Cannot publish directly

## 🎨 Brand Colors

- **Primary Navy:** `#0A1628`
- **Crimson Red:** `#C8102E`
- **White:** `#FFFFFF`
- **Gold Accent:** `#F4A300`

## 📝 Seed Data

The seed script creates:
- 3 demo users (admin, editor, contributor) - passwords: `password123`
- 50+ sample articles across all categories
- Sample videos and photo galleries
- Newsletter subscribers
- Comments and engagement data
- Active polls
- Breaking news ticker items

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check

# Lint code
npm run lint

# Check for unused dependencies
npm run knip
```

## 🌐 Deployment

### Deploy to Cloudflare Pages

1. Build the project:
```bash
npm run build
```

2. Deploy using Wrangler:
```bash
wrangler deploy
```

Or connect your GitHub repo to Cloudflare Pages for automatic deployments.

### Connect Custom Domain

1. Add domain in Cloudflare dashboard
2. Update DNS records
3. Enable SSL/TLS

## 📊 Analytics & Ads

### Google Analytics
Add your GA4 measurement ID in Site Settings → Integrations

### Google AdSense
Configure ad placements in Admin → Ad Placements or add IDs to `.env`:
```
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

Need help or want to join the community?
- Join our [Discord](https://discord.gg/shDEGBSe2d)
- Visit [getmocha.com](https://getmocha.com)

## 📞 Contact

For inquiries: contact@cloudmedia.news

---

Built with ❤️ by Cloud Media Team
