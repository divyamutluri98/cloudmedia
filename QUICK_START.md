# ⚡ QUICK START - Cloud Media News

## 🎯 Get Running in 15 Minutes

### Step 1: Install & Run (Already Done! ✅)
```bash
npm run dev
```
Your app is at: http://localhost:5173

---

### Step 2: Set Up Supabase (Required for Full Functionality)

**A. Create Supabase Project** (5 min)
1. Go to https://supabase.com
2. Click "Start your project"
3. Choose organization (or create new)
4. Pick region closest to you
5. Wait ~2 minutes for setup

**B. Run Database Schema** (3 min)
1. Click "SQL Editor" in left sidebar
2. Open `supabase/schema.sql` from your project
3. Copy entire file content
4. Paste into SQL Editor
5. Click "Run"
6. Wait for "Success. No rows returned"

**C. Load Demo Data** (2 min)
1. Still in SQL Editor
2. Open `supabase/seed-data.sql`
3. Copy and paste
4. Click "Run"

**D. Get API Keys** (1 min)
1. Click "Settings" (gear icon) → "API"
2. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbG...` (long string)

---

### Step 3: Configure Your App (2 min)

**A. Create .env file**
```bash
cp .env.example .env
```

**B. Edit .env**
Open `.env` and paste your keys:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**C. Restart dev server**
Press `Ctrl+C` then run again:
```bash
npm run dev
```

---

## ✅ You're Ready!

Your Cloud Media News platform is now:
- ✅ Connected to Supabase database
- ✅ Loaded with demo content (50+ articles)
- ✅ Ready for development

---

## 🚀 What's Next?

### Option A: Use AI to Build Components (Fastest)
1. Go to https://lovable.dev
2. Create new project
3. Copy prompt from `CloudMediaNews_Lovable_Prompt.md`
4. Let AI generate all components
5. Download and integrate

**Time**: ~15 hours total

### Option B: Code Manually (Most Control)
Build components one by one:
1. Layout (TopBar, Navbar, Footer)
2. Home page sections
3. Article detail page
4. Admin dashboard

**Time**: ~60 hours total

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `supabase/schema.sql` | Database structure - RUN THIS FIRST |
| `supabase/seed-data.sql` | Demo articles - RUN FOR TESTING |
| `.env` | Your Supabase credentials |
| `src/react-app/App.tsx` | Main app routes |
| `src/react-app/pages/Home.tsx` | Home page (customize this) |
| `src/react-app/hooks/useArticles.ts` | Fetch articles (use this) |
| `src/react-app/stores/authStore.ts` | Login state (use this) |

---

## 🔑 Demo Login (After Setting Up Auth)

You need to create users in Supabase Auth UI:

**Admin User:**
- Email: `admin@cloudmedia.news`
- Password: `password123`
- Role: admin (full access)

**Editor User:**
- Email: `editor@cloudmedia.news`  
- Password: `password123`
- Role: editor (can publish)

**Contributor User:**
- Email: `contributor@cloudmedia.news`
- Password: `password123`
- Role: contributor (drafts only)

---

## 🆘 Troubleshooting

**Problem**: "Cannot connect to Supabase"
- **Fix**: Check `.env` has correct URL and key
- **Fix**: Make sure you ran schema.sql

**Problem**: "No articles showing"
- **Fix**: Run `seed-data.sql` to add demo articles
- **Fix**: Check browser console for errors

**Problem**: "Module not found"
- **Fix**: Run `npm install` again

**Problem**: Dark mode stuck
- **Fix**: Clear browser localStorage
- **Fix**: Open DevTools → Application → Local Storage → Clear

---

## 📞 Help Resources

- **Full Guide**: Read `SETUP_COMPLETE.md`
- **Build Summary**: Read `BUILD_SUMMARY.md`
- **Original Prompt**: Read `CloudMediaNews_Lovable_Prompt.md`
- **Discord**: https://discord.gg/shDEGBSe2d

---

## 🎯 Current Status

✅ **DONE** (Foundation):
- All dependencies installed
- Supabase client configured
- Database types ready
- State management set up
- Custom hooks created
- Database schema prepared
- Seed data prepared

⏳ **TODO** (Your Turn):
- Build UI components
- Connect to Supabase auth
- Test features
- Deploy to production

**Progress**: 40% Complete

---

## 💻 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm run check        # Type check
npm run lint         # Lint code

# Deployment
wrangler deploy      # Deploy to Cloudflare
```

---

## 🎨 Brand Colors

- **Navy Blue**: `#0A1628` (primary background)
- **Crimson Red**: `#C8102E` (accents, buttons)
- **White**: `#FFFFFF` (text)
- **Gold**: `#F4A300` (highlights)

---

## 📊 Database Tables Available

You have these tables ready:
1. profiles (users)
2. categories (12 pre-loaded)
3. articles (news posts)
4. comments (reader comments)
5. media_library (images/videos)
6. photo_gallery (albums)
7. videos (video news)
8. newsletter_subscribers
9. ad_placements (AdSense)
10. site_settings
11. breaking_news_ticker
12. polls
13. notifications

All with proper security (RLS) enabled!

---

**You're all set! Start building! 🚀**

For detailed instructions, see `SETUP_COMPLETE.md`
