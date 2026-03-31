# 🚀 Cloud Media News - Deployment Guide

Complete guide for deploying to Vercel and Coolify with production-ready configuration.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Supabase project set up (run schema.sql and seed-data.sql)
- ✅ Environment variables configured
- ✅ Node.js 18+ installed
- ✅ Git installed

---

## 🎯 Quick Start Options

### Option 1: Vercel (Recommended - Easiest)
**Time**: 10 minutes  
**Difficulty**: ⭐ Easy  
**Cost**: Free tier available

### Option 2: Coolify (Self-Hosted)
**Time**: 20 minutes  
**Difficulty**: ⭐⭐ Medium  
**Cost**: Your server costs

### Option 3: Docker (Anywhere)
**Time**: 15 minutes  
**Difficulty**: ⭐⭐ Medium  
**Cost**: Your infrastructure costs

---

## 🌐 DEPLOY TO VERCEL

### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Cloud Media News platform"

# Create GitHub repository (via web or CLI)
# Go to https://github.com/new and create "cloudmedia" repository

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/cloudmedia.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. **Go to https://vercel.com**
2. Click "New Project"
3. Import your GitHub repository "cloudmedia"
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
VITE_SITE_URL=https://your-domain.vercel.app
```

### Step 4: Deploy

Click "Deploy" and wait ~2-3 minutes.

**Your site will be live at**: `https://cloudmedia-XXXX.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL is automatic!

### Step 6: Automatic Deployments

Every push to `main` branch will automatically deploy to production.

**Preview deployments**: Enable in Settings → Git → Preview Branches

---

## 🐳 DEPLOY TO COOLIFY

### Step 1: Prepare Your Server

Ensure you have:
- Server with Docker installed
- Coolify installed (https://coolify.io)
- Domain/subdomain pointing to your server

### Step 2: Create Application in Coolify

1. **Log into Coolify**
2. Click "Create New" → "Application"
3. Select your source:
   - **Public Git Repository**: `https://github.com/YOUR_USERNAME/cloudmedia.git`
   - **Branch**: `main`

### Step 3: Configure Build Settings

In Coolify application settings:

```yaml
Build Pack: Dockerfile
Dockerfile Location: ./Dockerfile
```

### Step 4: Add Environment Variables

In Coolify → Environment Variables, add:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX
VITE_SITE_URL=https://your-domain.com
```

### Step 5: Deploy

Click "Deploy" and watch the deployment progress.

**Your site will be live at**: Your configured domain

### Step 6: Auto-Deploy

Enable auto-deploy in Coolify settings:
- Go to Application → Advanced
- Enable "Auto Deploy"
- Select branch: `main`

Now every git push will trigger automatic deployment!

---

## 🐳 DOCKER DEPLOYMENT (Manual)

### Build Docker Image

```bash
# Build the image
npm run docker:build

# Or manually
docker build -t cloudmedia-news .
```

### Run Container

```bash
# Run with environment variables
docker run -d \
  -p 80:80 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_ANON_KEY=your_key \
  -e VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  -e VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXX \
  -e VITE_SITE_URL=https://your-domain.com \
  cloudmedia-news
```

### Using Docker Compose

```bash
# Create .env file
cp .env.example .env
# Edit .env with your values

# Start services
npm run docker:compose

# Or manually
docker-compose up -d
```

### Stop Services

```bash
npm run docker:stop
```

---

## 🔧 PRODUCTION OPTIMIZATIONS

### Performance Enhancements

The deployment includes:

✅ **Gzip Compression** - Reduces file sizes by ~70%  
✅ **Browser Caching** - Static assets cached for 1 year  
✅ **Security Headers** - X-Frame-Options, XSS-Protection, etc.  
✅ **SPA Routing** - Client-side routing support  
✅ **Health Checks** - Automatic container health monitoring  

### Lighthouse Score Optimization

Expected scores:
- **Performance**: 90-95
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 100

To verify:
```bash
npm run build
npm run preview
# Open Chrome DevTools → Lighthouse → Analyze
```

---

## 📊 MONITORING & ANALYTICS

### Google Analytics Setup

1. Get your GA4 Measurement ID from https://analytics.google.com
2. Add to environment variables: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. Analytics will automatically track page views

### Vercel Analytics (If using Vercel)

Enable in Vercel dashboard → Analytics → Enable Web Analytics

### Real User Monitoring

Add to your `.env`:
```env
VITE_SENTRY_DSN=your_sentry_dsn
```

---

## 🔒 SECURITY BEST PRACTICES

### Environment Variables Security

✅ Never commit `.env` file  
✅ Use Vercel/Coolify environment variable UI  
✅ Rotate Supabase keys periodically  
✅ Use separate keys for development/production  

### HTTPS/SSL

- **Vercel**: Automatic HTTPS
- **Coolify**: Configure in Coolify → SSL
- **Custom**: Use Let's Encrypt

### Content Security Policy

Add to nginx.conf if needed:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;";
```

---

## 🚨 TROUBLESHOOTING

### Build Fails on Vercel

**Error**: "Build failed"  
**Solution**:
1. Check build logs in Vercel dashboard
2. Verify all dependencies in package.json
3. Ensure TypeScript compiles: `npm run check`
4. Try redeploying from Vercel dashboard

### Blank Page After Deploy

**Error**: Site loads but shows blank page  
**Solution**:
1. Check browser console for errors
2. Verify environment variables are set
3. Check Base URL in vite.config.ts
4. Ensure Supabase credentials are correct

### Docker Container Won't Start

**Error**: Container exits immediately  
**Solution**:
```bash
# Check logs
docker logs cloudmedia-news

# Verify build completed successfully
docker build -t cloudmedia-news . --no-cache

# Test locally first
npm run docker:build
npm run docker:run
```

### 404 on Page Refresh

**Cause**: SPA routing issue  
**Solution**: Already fixed in vercel.json and nginx.conf with rewrites

### Slow Performance

**Solution**:
1. Enable gzip (already configured)
2. Check asset sizes in build
3. Use Vercel's Edge Network (automatic)
4. Optimize images before upload

---

## 📈 POST-DEPLOYMENT CHECKLIST

After deploying, verify:

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Images are loading
- [ ] API calls to Supabase work
- [ ] Dark mode toggle works
- [ ] Mobile responsive
- [ ] Forms submit correctly
- [ ] Analytics tracking (check Real-Time in GA)
- [ ] No console errors
- [ ] SSL certificate active
- [ ] Custom domain working (if configured)
- [ ] Auto-deploy working (test with small change)

---

## 🔄 CONTINUOUS DEPLOYMENT

### Vercel Auto-Deploy Flow

```
Git Push → GitHub → Vercel Webhook → Build → Deploy → Live
                    ↓
            Automatic (no action needed)
```

### Coolify Auto-Deploy Flow

```
Git Push → GitHub → Coolify Webhook → Build → Docker → Deploy → Live
                    ↓
            Automatic (no action needed)
```

### Manual Trigger

If auto-deploy fails:
- **Vercel**: Dashboard → Deployments → "Redeploy"
- **Coolify**: Application → Deployments → "Manual Deploy"

---

## 🎯 CUSTOM DOMAIN SETUP

### Vercel Custom Domain

1. Project Settings → Domains
2. Add your domain: `yourdomain.com`
3. Add DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-30 minutes)
5. SSL is automatic!

### Coolify Custom Domain

1. Coolify → Application → Domains
2. Add your domain
3. Update DNS A record to your server IP
4. Enable SSL in Coolify → SSL → Generate Certificate

---

## 💰 COST ESTIMATES

### Vercel
- **Free Tier**: Perfect for development and small projects
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic SSL
  
- **Pro Tier**: $20/month per user
  - More analytics
  - Priority support
  - Higher limits

### Coolify
- **Self-Hosted**: Free (open source)
- **Server Costs**: 
  - DigitalOcean Droplet: $6/month
  - Hetzner: €5/month
  - AWS/Azure: Variable
  
- **Total**: ~$5-10/month

### Docker (Self-Hosted)
- **Infrastructure**: Your choice
- **Recommended**: 
  - VPS: $5-20/month
  - Raspberry Pi at home: ~$0 (electricity only)

---

## 🎊 DEPLOYMENT COMPLETE!

Once deployed, your Cloud Media News platform will be:

✅ **Live** on the internet  
✅ **Secure** with HTTPS  
✅ **Fast** with CDN/optimizations  
✅ **Scalable** for thousands of users  
✅ **Monitored** with analytics  
✅ **Auto-Deploying** on every update  

### Share Your Success!

- Production URL: `https://your-domain.com`
- Admin URL: `https://your-domain.com/admin`
- Share on social media! 🎉

---

## 📞 SUPPORT

### Deployment Issues?
- Vercel Docs: https://vercel.com/docs
- Coolify Docs: https://coolify.io/docs
- Docker Docs: https://docs.docker.com

### Platform Issues?
- Discord: https://discord.gg/shDEGBSe2d
- Supabase Support: https://supabase.com/support

---

## 🏆 PRO TIPS

### Tip 1: Staging Environment
Create a `staging` branch for testing before production:
```bash
git checkout -b staging
git push origin staging
```
Deploy staging to a separate Vercel project or Coolify app.

### Tip 2: Environment-Specific Configs
Use different .env files:
```bash
.env.development
.env.staging
.env.production
```

### Tip 3: Rollback Strategy
- **Vercel**: Dashboard → Deployments → Previous → "Promote to Production"
- **Coolify**: Application → Deployments → Previous Version → Restore

### Tip 4: Performance Monitoring
- Use Vercel Speed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring (UptimeRobot, Pingdom)

### Tip 5: Backup Strategy
- Regular database backups via Supabase
- Export configurations monthly
- Keep local copies of critical data

---

**🚀 Happy Deploying!**

*Last Updated: March 16, 2026*  
*Platform: Cloud Media News*  
*Version: 1.0.0 - Production Ready*
