# GitHub Setup & Deployment Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Visit [github.com](https://github.com)
   - Sign in or create an account

2. **Create New Repository:**
   - Click the "+" icon (top right) → "New repository"
   - Repository name: `iot-device-portal-ui`
   - Description: "IoT Device Portal UI - Responsive dashboard for viewing IoT device metadata, status, and subscription details"
   - Visibility: **Public** (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Copy the repository URL:**
   - You'll see a page with setup instructions
   - Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/iot-device-portal-ui.git`)

## Step 2: Push Code to GitHub

Run these commands in your terminal (from project directory):

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/iot-device-portal-ui.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Note:** You may be prompted for GitHub credentials. Use:
- Personal Access Token (recommended) - See below for how to create one
- Or GitHub username/password

## Step 3: Create GitHub Personal Access Token (If Needed)

If GitHub asks for authentication:

1. **Go to GitHub Settings:**
   - Click your profile picture → Settings
   - Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token:**
   - Click "Generate new token (classic)"
   - Name: `iot-device-portal-deploy`
   - Expiration: Choose your preference
   - Scopes: Check `repo` (full control of private repositories)
   - Click "Generate token"

3. **Copy Token:**
   - Copy the token immediately (you won't see it again!)
   - Use this token as your password when pushing

## Step 4: Verify Push

After pushing, refresh your GitHub repository page. You should see all your files!

## Step 5: Deploy to Vercel

Now that your code is on GitHub:

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Import Project:**
   - Click "Add New Project"
   - Import your `iot-device-portal-ui` repository
   - Vercel will auto-detect Next.js settings:
     - Framework Preset: **Next.js** ✅
     - Root Directory: `./` ✅
     - Build Command: `npm run build` ✅
     - Output Directory: `.next` ✅
   - Click "Deploy"

3. **Wait for Deployment:**
   - Build will take 2-3 minutes
   - You'll see build logs in real-time
   - Once complete, you'll get a live URL!

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (will detect GitHub repo automatically)
vercel --prod
```

## Step 6: Automatic Deployments

Once connected to GitHub:
- ✅ Every push to `main` branch = automatic deployment
- ✅ Pull requests = preview deployments
- ✅ Rollback to previous versions anytime

## Troubleshooting

### Issue: "Repository not found"
- Check repository URL is correct
- Ensure repository exists on GitHub
- Verify you have access to the repository

### Issue: Authentication failed
- Use Personal Access Token instead of password
- Ensure token has `repo` scope

### Issue: Push rejected
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue: Large file (CSV)
- CSV file is 1MB - should be fine
- If issues, ensure it's committed (not in .gitignore)

## Quick Command Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## Next Steps After Deployment

1. **Test your live site:**
   - Visit the Vercel URL
   - Test all features

2. **Set up custom domain** (optional):
   - Vercel Dashboard → Settings → Domains

3. **Monitor deployments:**
   - Check Vercel dashboard for build status
   - View analytics and logs

---

**Your app will be live at:** `https://iot-device-portal-ui.vercel.app` (or your custom domain)

🎉 **Congratulations!** Your IoT Device Portal is now live!

