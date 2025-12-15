# How to Update Token Address Without Redeploying

Your Fidolity website uses a dynamic configuration system that allows you to update the token address (and other settings) **without rebuilding or redeploying the entire site**.

## Quick Update Guide

### Method 1: After Build (Recommended for Hosting Platforms)

**For Vercel/Netlify/etc with auto-deploy:**

1. **Build your site locally or let hosting build it**
   ```bash
   cd frontend
   yarn build
   ```

2. **Update the built config**
   ```bash
   # Option A: Use the update script
   node update-config.js YOUR_CONTRACT_ADDRESS
   
   # Option B: Manually edit dist/config.json
   nano dist/config.json
   ```

3. **Deploy ONLY the dist folder**
   - Upload `dist/` contents to your hosting
   - Or use the hosting platform's manual deploy feature

### Method 2: Edit Source Before Building

1. **Go to your repository**
   ```
   https://github.com/fidolity/fidolity
   ```

2. **Navigate to the config file**
   ```
   frontend/public/config.json
   ```

3. **Click "Edit" (pencil icon)**

4. **Update the contract address**
   ```json
   {
     "token": {
       "symbol": "FDLT",
       "name": "Fidolity Token",
       "contractAddress": "YOUR_NEW_ADDRESS_HERE",
       "blockchain": "SOLANA",
       "decimals": 9
     },
     ...
   }
   ```

5. **Commit changes**
   - Add commit message: "Update token contract address"
   - Click "Commit changes"

6. **Redeploy to hosting**
   - If using Vercel/Netlify: Auto-deploys on push
   - If using GitHub Pages: May take 1-2 minutes
   - If using other hosting: Sync the updated file

7. **Verify**
   - Visit your website
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Contract address should be updated!

---

### Method 2: Update via Git

```bash
# Clone repository
git clone https://github.com/fidolity/fidolity.git
cd fidolity

# Edit config file
nano frontend/public/config.json
# or
code frontend/public/config.json

# Update the contractAddress field
# Save and exit

# Commit and push
git add frontend/public/config.json
git commit -m "Update token contract address to [NEW_ADDRESS]"
git push origin main

# Redeploy (if needed)
```

---

### Method 3: Direct File Upload

If your hosting supports it:

1. Download `frontend/public/config.json`
2. Edit locally
3. Upload to `public/config.json` on your hosting
4. Done!

---

## What Can You Update?

The `config.json` file allows you to update:

### Token Information
```json
"token": {
  "symbol": "FDLT",              // Token symbol
  "name": "Fidolity Token",      // Token name
  "contractAddress": "soon",      // ← Update this!
  "blockchain": "SOLANA",         // Blockchain
  "decimals": 9                   // Token decimals
}
```

### Links
```json
"links": {
  "website": "https://fidolity.com",
  "twitter": "https://x.com/fidolity",
  "github": "https://github.com/fidolity",
  "discord": "https://discord.gg/fidolity",
  "docs": "https://docs.fidolity.com"
}
```

### Staking Configuration
```json
"staking": {
  "enabled": false,              // Enable/disable staking
  "baseAPY": 26.18,             // Base APY
  "boostedAPY": 45.42           // Boosted APY
}
```

---

## Example: Full Update

**Before:**
```json
{
  "token": {
    "symbol": "FDLT",
    "name": "Fidolity Token",
    "contractAddress": "soon",
    "blockchain": "SOLANA",
    "decimals": 9
  }
}
```

**After:**
```json
{
  "token": {
    "symbol": "FDLT",
    "name": "Fidolity Token",
    "contractAddress": "FDLTxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "blockchain": "SOLANA",
    "decimals": 9
  }
}
```

---

## Cache Busting

The website automatically adds cache-busting timestamps to config requests, so updates should reflect immediately. If not:

### For Users:
- Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache

### For Hosting:
Some CDNs cache files. If using:
- **Vercel**: Automatic cache invalidation
- **Netlify**: Automatic cache invalidation
- **GitHub Pages**: May take 1-2 minutes
- **Cloudflare**: Purge cache from dashboard

---

## Verification

After updating, verify the change:

1. Visit your website
2. Look for the contract address on the homepage
3. It should show your new address
4. Click "View on Explorer" to verify it opens correctly

---

## Troubleshooting

**Update not showing?**
- Hard refresh browser (Ctrl+F5)
- Check if file was committed to main branch
- Wait 1-2 minutes for CDN cache
- Check browser console for errors

**Invalid JSON error?**
- Validate JSON at [jsonlint.com](https://jsonlint.com)
- Make sure quotes are correct
- No trailing commas

**Need help?**
- Open issue: https://github.com/fidolity/fidolity/issues
- Discord: https://discord.gg/fidolity

---

## Best Practices

1. **Backup first**: Save a copy of current config
2. **Validate JSON**: Use JSON validator before committing
3. **Test on staging**: If you have a staging environment
4. **Announce**: Let users know about the update
5. **Document**: Keep track of address changes

---

**That's it! You can now update your token address anytime without rebuilding the entire site.** 🚀
