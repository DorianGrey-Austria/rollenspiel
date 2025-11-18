# 🚀 Deployment Guide

## Quick Start (Vercel - Recommended)

### 1. Prerequisites
- Vercel account (free tier OK)
- Anthropic API Key

### 2. Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up project: Yes
# - Link to existing project: No
# - Name: rollenspiel-ai (or your choice)
# - Framework preset: Other
# - Build command: Leave empty (handled by vercel.json)
# - Output directory: Leave empty
```

### 3. Set Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```
ANTHROPIC_API_KEY = your_key_here
```

### 4. Deploy to Production

```bash
vercel --prod
```

✅ Done! Your app is live on `https://your-project.vercel.app`

---

## Alternative: Netlify

### 1. Deploy via Git

1. Push to GitHub
2. Go to Netlify Dashboard
3. Click "New site from Git"
4. Select your repo
5. Configure:
   - Build command: (handled by netlify.toml)
   - Publish directory: `.`
6. Add environment variable:
   - `ANTHROPIC_API_KEY`

### 2. Deploy via CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

---

## Variant-Specific Deployments

Each variant can be deployed separately:

### Variant A (Medieval)
```bash
cd variant-a-medieval
npm install
npm run build
# Deploy dist/ folder
```

### Variant B (Gamer)
```bash
cd variant-b-gamer
npm install
npm run build
# Deploy dist/ folder
```

### Variant C (Museum)
```bash
cd variant-c-museum
npm install
npm run build
# Deploy dist/ folder
```

---

## URL Structure

After deployment, variants are accessible at:

- Medieval: `https://your-domain.com/medieval`
- Gamer: `https://your-domain.com/gamer`
- Museum: `https://your-domain.com/museum`
- Default: `https://your-domain.com` (points to Medieval)

---

## Environment Variables Explained

### Required

**ANTHROPIC_API_KEY**
- Get from: https://console.anthropic.com/
- Used for: Story generation via Claude API
- Scope: Server-side only (secure)

### Optional

**VITE_DEMO_MODE**
- Values: `true` / `false`
- Default: `false`
- Effect: Enables mock data mode (no API calls)

**VITE_ANALYTICS_ENABLED**
- Values: `true` / `false`
- Default: `false` (dev), `true` (prod)
- Effect: Enables event tracking

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module '@anthropic-ai/sdk'"**
```bash
npm install @anthropic-ai/sdk
```

**Error: "ANTHROPIC_API_KEY not found"**
- Add environment variable in Vercel/Netlify dashboard
- For local dev: Create `.env` file (see `.env.example`)

### API Errors

**Error: "Rate limit exceeded"**
- Wait 1 minute and try again
- Server-side rate limiting is active (10 req/min per IP)

**Error: "API key invalid"**
- Check your Anthropic API key
- Verify it's set in environment variables

### Deployment Fails

**Vercel: "No build output"**
- Check `vercel.json` configuration
- Ensure `package.json` has `build` script

**Netlify: "Build script not found"**
- Check `netlify.toml` configuration
- Ensure each variant has `build` script in `package.json`

---

## Custom Domain

### Vercel
1. Go to Project → Settings → Domains
2. Add your domain
3. Configure DNS (Vercel provides instructions)

### Netlify
1. Go to Site → Domain settings
2. Add custom domain
3. Configure DNS

---

## CI/CD (GitHub Actions)

GitHub Actions workflow is included (`.github/workflows/deploy.yml`).

**Setup:**
1. Add secrets in GitHub repo settings:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

2. Push to main branch → Auto-deploys!

---

## Performance Optimization

### Recommended Settings

**Vercel:**
```json
{
  "headers": [
    {
      "source": "/(.*).(js|css|png|jpg|jpeg|gif|svg|ico)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Netlify:**
```toml
[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Monitoring

### Vercel Analytics
- Enable in Project settings
- View real-time traffic, performance

### Netlify Analytics
- Enable in Site settings (paid)
- Traffic insights

### Error Tracking (Optional)
- Sentry: https://sentry.io
- LogRocket: https://logrocket.com

---

## Scaling

### Free Tier Limits

**Vercel:**
- Bandwidth: 100 GB/month
- Functions: 100 GB-hrs/month
- OK for prototype & small scale

**Netlify:**
- Bandwidth: 100 GB/month
- Build minutes: 300 min/month
- OK for prototype

### Upgrade Path
- Start with free tier
- Monitor usage in dashboards
- Upgrade when needed

---

## Security Checklist

- ✅ API keys server-side only (never in browser)
- ✅ Rate limiting enabled
- ✅ CORS configured
- ✅ Input validation
- ✅ HTTPS only
- ⏳ TODO: Add authentication (future)
- ⏳ TODO: Add user data encryption (future)

---

**Need help?** Check the main README.md or ROADMAP.md
