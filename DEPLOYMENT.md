# Deployment Guide

This guide covers deploying your IoT Device Portal UI to production.

## 🚀 Recommended: Vercel (Easiest)

Vercel is made by the creators of Next.js and offers the best integration.

### Step 1: Prepare Your Project

1. **Ensure your project builds successfully:**
   ```bash
   npm run build
   ```

2. **Check for any environment variables needed:**
   - Currently, no environment variables are required
   - If you add external APIs later, use Vercel's environment variables

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (first time)
   - Project name: `iot-device-portal-ui` (or your choice)
   - Directory: `./` (current directory)
   - Override settings? **No**

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard (GitHub Integration)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/iot-device-portal-ui.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: **Next.js**
     - Root Directory: `./`
     - Build Command: `npm run build` (auto-detected)
     - Output Directory: `.next` (auto-detected)
   - Click "Deploy"

3. **Your app will be live in ~2 minutes!**

### Step 3: Configure Environment Variables (If Needed)

If you add external APIs later:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_API_URL` = Your API URL
3. Redeploy

### Step 4: Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## 🌐 Alternative: Netlify

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build Settings

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 3: Deploy

```bash
netlify login
netlify deploy --prod
```

Or use Netlify Dashboard with GitHub integration (similar to Vercel).

---

## 🐳 Alternative: Docker + Any Hosting

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 2: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Add this
}

module.exports = nextConfig
```

### Step 3: Build and Run

```bash
docker build -t iot-device-portal-ui .
docker run -p 3000:3000 iot-device-portal-ui
```

---

## 📋 Pre-Deployment Checklist

- [ ] **Test build locally:**
  ```bash
  npm run build
  npm start
  ```

- [ ] **Check CSV file:**
  - Ensure `cde_ipaas_dataset.csv` is in project root
  - File will be included in deployment

- [ ] **Remove development files:**
  - Already done ✅

- [ ] **Update README.md:**
  - Add deployment URL
  - Update any localhost references

- [ ] **Test all features:**
  - Device listing
  - Device details
  - Filters and search
  - Pagination

---

## 🔧 Common Issues & Solutions

### Issue: Build Fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: CSV File Not Found

**Solution:**
- Ensure `cde_ipaas_dataset.csv` is in project root
- Check `.gitignore` doesn't exclude CSV files
- Verify file is committed to git

### Issue: Environment Variables

**Solution:**
- If using external API, set `NEXT_PUBLIC_API_URL` in hosting platform
- Restart deployment after adding variables

### Issue: Port/URL Issues

**Solution:**
- Vercel/Netlify handle this automatically
- For Docker, ensure PORT environment variable is set

---

## 🎯 Recommended Deployment Flow

1. **Test locally:**
   ```bash
   npm run build
   npm start
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Verify deployment:**
   - Check all pages load
   - Test device listing
   - Test device details
   - Test filters

4. **Set up custom domain** (optional)

---

## 📊 Deployment Platforms Comparison

| Platform | Ease | Cost | Best For |
|----------|------|------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | Free tier | Next.js apps |
| **Netlify** | ⭐⭐⭐⭐ | Free tier | Static sites |
| **Docker** | ⭐⭐⭐ | Varies | Full control |
| **AWS/GCP** | ⭐⭐ | Pay-as-you-go | Enterprise |

---

## 🚀 Quick Start (Vercel)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# Done! Your app is live 🎉
```

---

## 📝 Post-Deployment

After deployment:

1. **Test your live site:**
   - Visit the provided URL
   - Test all features
   - Check mobile responsiveness

2. **Monitor:**
   - Check Vercel dashboard for errors
   - Monitor build logs
   - Check analytics (if enabled)

3. **Update README:**
   - Add live URL
   - Update deployment instructions

---

## 🎉 You're Ready!

Your IoT Device Portal UI is ready to deploy. Choose Vercel for the easiest experience, or use any of the alternatives above.

**Need help?** Check the [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment).

