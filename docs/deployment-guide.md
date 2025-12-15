# Deployment Guide

## How to Deploy and Update Token Address

Your Fidolity website can be deployed to any static hosting platform. This guide shows you how to update the token address without redeploying the entire site.

---

## Deployment Options

### Option 1: Vercel (Recommended)

#### Initial Deployment

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Root Directory: `frontend`
   - Build Command: `yarn build`
   - Output Directory: `dist`

2. **Configure Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add these variables:

   ```
   VITE_CONTRACT_ADDRESS = soon
   VITE_TOKEN_SYMBOL = FDLT
   VITE_TOKEN_NAME = Fidolity Token
   ```

3. **Deploy**
   - Click "Deploy"
   - Your site is live!

#### Updating Token Address (No Redeploy Needed!)

**Method A: Environment Variable (Recommended)**

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Update `VITE_CONTRACT_ADDRESS` to your new address
3. Click "Redeploy" (uses same code, just updates config)
4. Done in 30 seconds!

**Method B: Direct File Edit**

1. After deployment, go to Vercel Dashboard
2. Go to Deployments → Latest Deployment
3. Download the `config.json` file
4. Edit the `contractAddress` field
5. Upload back to Vercel using their File Browser
6. Refresh your site

---

### Option 2: Netlify

#### Initial Deployment

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your GitHub repository
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/dist`

2. **Environment Variables**
   - Settings → Build & deploy → Environment
   - Add:
   ```
   VITE_CONTRACT_ADDRESS = soon
   ```

3. **Deploy**

#### Updating Token Address

1. Netlify Dashboard → Site settings → Environment variables
2. Update `VITE_CONTRACT_ADDRESS`
3. Click "Trigger deploy"
4. Done!

---

### Option 3: GitHub Pages

#### Initial Setup

1. **Build Locally**
   ```bash
   cd frontend
   export CONTRACT_ADDRESS=YOUR_ADDRESS
   yarn build
   ```

2. **Deploy to gh-pages**
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

3. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Source: gh-pages branch
   - Save

#### Updating Token Address

1. **Update local config**
   ```bash
   cd frontend
   export CONTRACT_ADDRESS=YOUR_NEW_ADDRESS
   yarn build
   ```

2. **Redeploy**
   ```bash
   gh-pages -d dist
   ```

---

### Option 4: Cloudflare Pages

#### Initial Deployment

1. **Connect Repository**
   - Go to Cloudflare Pages
   - Create new project from GitHub
   - Build settings:
     - Build command: `cd frontend && yarn build`
     - Build output: `frontend/dist`

2. **Environment Variables**
   - Settings → Environment variables
   - Add `VITE_CONTRACT_ADDRESS`

3. **Deploy**

#### Updating Token Address

1. Update environment variable
2. Redeploy
3. Done!

---

## Local Update Method

If you prefer to update locally and push:

### Step 1: Update Config

```bash
cd frontend

# Option A: Use the script
node update-config.js YOUR_CONTRACT_ADDRESS

# Option B: Edit manually
nano public/config.json
# Change "contractAddress": "YOUR_NEW_ADDRESS"
```

### Step 2: Build

```bash
yarn build
```

### Step 3: Deploy

Upload the `dist/` folder contents to your hosting.

---

## Using Environment Variables (Best Practice)

### Why Environment Variables?

✅ No code changes needed
✅ Update without Git commits
✅ Different values for staging/production
✅ Fast updates (30 seconds)

### Available Variables

```bash
# Token Configuration
VITE_CONTRACT_ADDRESS=your_address
VITE_TOKEN_SYMBOL=FDLT
VITE_TOKEN_NAME=Fidolity Token
VITE_BLOCKCHAIN=SOLANA
VITE_TOKEN_DECIMALS=9

# Links
VITE_WEBSITE_URL=https://fidolity.com
VITE_TWITTER_URL=https://x.com/fidolitydotfun
VITE_GITHUB_URL=https://github.com/fidolity
VITE_DISCORD_URL=https://discord.gg/fidolity

# Staking
VITE_STAKING_ENABLED=false
VITE_BASE_APY=26.18
VITE_BOOSTED_APY=45.42
```

### Setting Environment Variables

**Vercel:**
- Dashboard → Settings → Environment Variables

**Netlify:**
- Site settings → Build & deploy → Environment

**Local Development:**
```bash
export VITE_CONTRACT_ADDRESS=your_address
yarn build
```

**In .env file (local only):**
```bash
# frontend/.env.production
VITE_CONTRACT_ADDRESS=your_address
```

---

## Quick Reference

### When Token Launches

1. Get your contract address
2. Update environment variable on hosting platform
3. Trigger redeploy (or let auto-deploy handle it)
4. Refresh site (Ctrl+F5)
5. Verify address is updated

**Time: ~30 seconds**

### Without Environment Variables

1. Edit `frontend/public/config.json`
2. Build: `yarn build`
3. Deploy `dist/` folder
4. Done

**Time: ~2 minutes**

---

## Troubleshooting

**Address not updating?**
- Check environment variable spelling
- Trigger manual redeploy
- Clear browser cache (Ctrl+F5)
- Check config.json in deployed files

**Build failing?**
- Check Node.js version (18+)
- Run `yarn install` first
- Check error logs

**Need help?**
- GitHub Issues: https://github.com/fidolity/fidolity/issues
- Discord: https://discord.gg/fidolity

---

## Best Practices

1. ✅ Use environment variables for production
2. ✅ Test on staging first
3. ✅ Keep config.example.json in Git
4. ✅ Document address changes
5. ✅ Announce to community
6. ✅ Verify on Solscan after update

---

**You're all set! Your token address can now be updated in seconds.** 🚀
