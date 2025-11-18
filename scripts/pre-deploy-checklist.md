# 🚀 Pre-Deployment Checklist - rollenspiel.ai

Use this checklist before deploying to production.

## 📋 Pre-Deployment Steps

### 1. Local Validation
- [ ] Run validation script: `bash scripts/validate-setup.sh`
- [ ] All errors fixed (0 errors)
- [ ] Warnings addressed (or documented as acceptable)

### 2. Environment Setup
- [ ] API Key obtained from Anthropic (https://console.anthropic.com/)
- [ ] API Key copied to clipboard (starts with `sk-ant-...`)
- [ ] `.env` file created locally for testing (DO NOT COMMIT!)
- [ ] Environment variables ready for deployment platform

### 3. Local Testing

#### Test Demo Mode (No API Key Required)
- [ ] Medieval variant starts: `cd variant-a-medieval && npm install && npm run dev`
- [ ] Gamer variant starts: `cd variant-b-gamer && npm install && npm run dev`
- [ ] Museum variant starts: `cd variant-c-museum && npm install && npm run dev`
- [ ] Age selection works in each variant
- [ ] Location input works (text or GPS)
- [ ] Demo mode stories load correctly
- [ ] Choices work and advance the story
- [ ] Story history is tracked
- [ ] Export functionality works (Text/Markdown/JSON)

#### Test Real API Mode (Requires API Key)
- [ ] Stories generate successfully (not demo mode)
- [ ] Streaming text works (typewriter effect)
- [ ] Error handling works (try invalid API key)
- [ ] Rate limiting works (try rapid requests)

### 4. Build Verification
- [ ] Build all variants: `npm run build`
- [ ] Medieval build successful → `variant-a-medieval/dist/`
- [ ] Gamer build successful → `variant-b-gamer/dist/`
- [ ] Museum build successful → `variant-c-museum/dist/`
- [ ] Check build sizes (should be < 2MB each):
  ```bash
  du -sh variant-*/dist
  ```
- [ ] Test production build locally:
  ```bash
  cd variant-a-medieval && npm run preview
  # Visit http://localhost:4173
  ```

### 5. Git & Version Control
- [ ] All changes committed
- [ ] Commit messages are clear and descriptive
- [ ] Pushed to remote repository
  ```bash
  git status
  git push -u origin claude/rpg-progress-plan-01MeyDqWJERYeK97QJmPqiZb
  ```
- [ ] Branch is up to date with remote

### 6. Documentation Review
- [ ] `README.md` is accurate and up-to-date
- [ ] `INSTALLATION.md` has correct setup steps
- [ ] `DEPLOYMENT.md` has deployment instructions
- [ ] API endpoints documented
- [ ] Environment variables listed in `.env.example`

### 7. Deployment Platform Setup

#### For Vercel:
- [ ] Vercel account created/logged in
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run initial deployment: `vercel`
- [ ] Add environment variable in dashboard:
  - Key: `ANTHROPIC_API_KEY`
  - Value: `sk-ant-your-key-here`
- [ ] Deploy to production: `vercel --prod`
- [ ] Test all 3 variants on deployed URLs
- [ ] Custom domain configured (optional)

#### For Netlify:
- [ ] Netlify account created/logged in
- [ ] Install Netlify CLI: `npm i -g netlify-cli`
- [ ] Run initial deployment: `netlify deploy`
- [ ] Add environment variable in dashboard:
  - Key: `ANTHROPIC_API_KEY`
  - Value: `sk-ant-your-key-here`
- [ ] Deploy to production: `netlify deploy --prod`
- [ ] Test all 3 variants on deployed URLs
- [ ] Custom domain configured (optional)

### 8. Post-Deployment Testing

#### Functionality Testing
- [ ] Visit deployed Medieval variant
- [ ] Visit deployed Gamer variant
- [ ] Visit deployed Museum variant
- [ ] Test age selection on mobile
- [ ] Test GPS location on mobile
- [ ] Test story generation (real API)
- [ ] Test demo mode (works without login)
- [ ] Test error handling (network issues)
- [ ] Test on different devices (phone, tablet, desktop)

#### Performance Testing
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)
- [ ] Page load time < 3 seconds
- [ ] API response time < 2 seconds

#### Browser Testing
- [ ] Chrome (desktop)
- [ ] Chrome (mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Safari (iOS)
- [ ] Edge (desktop)

#### PWA Testing
- [ ] "Add to Home Screen" appears
- [ ] Install works on Android
- [ ] Install works on iOS
- [ ] App works offline (after first load)
- [ ] Service Worker registered
- [ ] Cache working correctly

#### Accessibility Testing
- [ ] Screen reader works (NVDA/JAWS/VoiceOver)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Text readable at 200% zoom
- [ ] Reduced motion preference respected

### 9. Monitoring & Analytics

#### Error Tracking (Optional)
- [ ] Sentry configured (optional)
- [ ] Error alerts working
- [ ] Error dashboard accessible

#### Analytics (Optional)
- [ ] Analytics configured (Plausible/GA)
- [ ] Events tracking correctly
- [ ] Dashboard accessible

### 10. Security Check
- [ ] API keys NOT in frontend code
- [ ] API keys only in serverless functions
- [ ] Environment variables configured correctly
- [ ] CORS configured properly
- [ ] Rate limiting working
- [ ] Input validation working
- [ ] No sensitive data in git history
- [ ] `.env` in `.gitignore`

### 11. Final Checks
- [ ] All variants accessible at public URLs
- [ ] Demo mode works without API key
- [ ] Real mode works with API key
- [ ] Mobile responsive design works
- [ ] No console errors in production
- [ ] README updated with live URLs
- [ ] Announced/shared with team (optional)

---

## ✅ Deployment Complete!

Once all items are checked:

1. **Document your deployment:**
   - Add deployed URLs to README.md
   - Update PROJECT_SUMMARY.md with deployment info

2. **Share your work:**
   - Test with real users
   - Gather feedback
   - Iterate and improve

3. **Celebrate! 🎉**
   - You've built a production-ready AI storytelling platform!

---

## 🐛 Common Issues

### Build Fails
```bash
# Clean install
rm -rf variant-*/node_modules variant-*/dist
npm run install:all
npm run build
```

### API Key Not Working
- Check key starts with `sk-ant-`
- Verify key is set in deployment platform dashboard
- Test key locally first with curl
- Check rate limits on Anthropic account

### Push to Git Fails (504 Error)
```bash
# Retry with delays
git push -u origin <branch-name>
# If still fails, check network/proxy settings
# All commits are safe locally
```

### PWA Not Installing
- Must be served over HTTPS
- Check manifest.json is valid
- Check Service Worker is registered
- Use Chrome DevTools > Application tab to debug

---

**Good luck with your deployment! 🚀**
