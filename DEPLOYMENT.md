# Deployment Guide - Getting Your App Online

Your app needs to be deployed to a public URL with HTTPS (required for camera access) so customers can type the URL on their mobile devices.

## Best Options (Free & Easy)

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Perfect for React apps
- ✅ Deploys in minutes
- ✅ Custom domain support

**Steps:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build your app:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts (press Enter for defaults)
   - You'll get a URL like: `https://table-app-xxx.vercel.app`

4. **For production:**
   ```bash
   vercel --prod
   ```

**Your app will be live at:** `https://your-app-name.vercel.app`

---

### Option 2: Netlify (Also Very Easy)

**Why Netlify?**
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Great for React apps
- ✅ Drag & drop deployment available

**Steps:**

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Option A - Using Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   ```

3. **Option B - Using Netlify Dashboard (Easier):**
   - Go to https://app.netlify.com
   - Sign up/login
   - Drag and drop your `build` folder
   - Get instant URL with HTTPS

**Your app will be live at:** `https://your-app-name.netlify.app`

---

### Option 3: Render (Free Tier)

**Steps:**

1. **Push your code to GitHub** (if not already)

2. **Go to:** https://render.com

3. **Create a new "Static Site"**

4. **Connect your GitHub repo**

5. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `build`

6. **Deploy** - You'll get a free HTTPS URL

---

## Quick Start (Recommended: Vercel)

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

4. **Your app is now live!** 🎉

   You'll get a URL like: `https://table-app-xxxxx.vercel.app`

5. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Custom Domain (Optional)

After deployment, you can add a custom domain:
- `table.velvetfork.com`
- `scan.velvetfork.com`
- Or any domain you own

Both Vercel and Netlify support custom domains in their free tiers.

## Important Notes

1. **HTTPS is automatic** - All these platforms provide HTTPS for free
2. **Camera will work** - HTTPS is required and provided automatically
3. **Free tiers are generous** - Usually enough for a restaurant app
4. **Updates are easy** - Just redeploy when you make changes

## Testing Your Deployed App

Once deployed:
1. Open the URL on your mobile device
2. Test the camera QR scanning
3. Test manual table code entry
4. Everything should work perfectly!

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

