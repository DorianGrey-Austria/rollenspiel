# ⚡ Quick Start Guide - rollenspiel.ai

Get up and running in **2 minutes** with demo mode (no API key needed)!

---

## 🎯 Choose Your Path

### Path 1: Try Demo Mode (2 minutes, no setup required)

Perfect for testing and exploring without an API key!

```bash
# 1. Clone the repository
git clone https://github.com/DorianGrey-Austria/rollenspiel.git
cd rollenspiel

# 2. Choose your favorite variant
cd variant-a-medieval  # or variant-b-gamer or variant-c-museum

# 3. Install & run
npm install
npm run dev

# 4. Open browser
# Visit: http://localhost:5173
```

**That's it!** Demo mode works automatically without any API key. 🎉

---

### Path 2: Full Setup with Claude AI (5 minutes)

For real AI-generated stories:

```bash
# 1. Clone & navigate
git clone https://github.com/DorianGrey-Austria/rollenspiel.git
cd rollenspiel

# 2. Get API key
# Visit: https://console.anthropic.com/
# Create account → Generate API key

# 3. Choose variant
cd variant-a-medieval  # or variant-b-gamer or variant-c-museum

# 4. Create .env file
cp .env.example .env

# 5. Edit .env and add your key
# VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here

# 6. Install & run
npm install
npm run dev

# 7. Open browser
# Visit: http://localhost:5173
```

---

## 🎨 The 3 Variants

### Variant A: Medieval Scholar 🏰
```bash
cd variant-a-medieval
npm install && npm run dev
# → http://localhost:5173
```
- **Style:** Parchment, gothic fonts, wax seals
- **Language:** Formal "Ihr/Sie" (historical)
- **Perfect for:** History enthusiasts, museums

### Variant B: Neon Gamer 🎮
```bash
cd variant-b-gamer
npm install && npm run dev
# → http://localhost:5173
```
- **Style:** Dark UI with neon accents, scanlines
- **Language:** Casual "Du" with gaming slang
- **Perfect for:** Gamers, teens (13-25)

### Variant C: Museum Guide 🏛️
```bash
cd variant-c-museum
npm install && npm run dev
# → http://localhost:5173
```
- **Style:** Clean, minimalist, professional
- **Language:** Neutral educational
- **Perfect for:** Schools, educators

---

## 🚀 Next Steps

### Test Demo Mode
1. **Select age mode** (Kids/Teen/Adult)
2. **Enter a location** (e.g., "Wien", "Salzburg", "Innsbruck")
3. **Start your story** - Pre-generated stories will load
4. **Make choices** - Shape your adventure
5. **View history** - See all your story scenes

### Enable Real AI Mode
1. **Get API key** from https://console.anthropic.com/
2. **Create .env** file in variant directory
3. **Add key:** `VITE_ANTHROPIC_API_KEY=sk-ant-...`
4. **Restart dev server**
5. **Stories will now be generated live by Claude AI!**

---

## 📱 Mobile Testing

Want to test on your phone?

```bash
# 1. Find your computer's IP address
# macOS/Linux:
ifconfig | grep "inet "
# Windows:
ipconfig

# 2. Start dev server with --host flag
npm run dev -- --host

# 3. Open on your phone
# http://YOUR_IP:5173
# Example: http://192.168.1.100:5173

# 4. Install as PWA
# Chrome: "Add to Home Screen"
# Safari: Share → "Add to Home Screen"
```

---

## 🏗️ Build for Production

```bash
# Build a single variant
cd variant-a-medieval
npm run build
# Output: dist/

# Preview production build
npm run preview
# → http://localhost:4173

# Build all variants at once
cd .. # back to root
npm run build
```

---

## 🔧 Troubleshooting

### Port already in use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### API key not working
```bash
# Check .env file exists
ls -la .env

# Check .env format (no quotes needed)
cat .env
# Should show: VITE_ANTHROPIC_API_KEY=sk-ant-...

# Restart dev server
# Ctrl+C, then: npm run dev
```

### Want to force demo mode?
```bash
# In browser console:
localStorage.setItem('rpg_demo_mode', 'true')
# Reload page
```

---

## 📚 Documentation

- **[README.md](README.md)** - Full project overview
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Vercel/Netlify
- **[ROADMAP.md](ROADMAP.md)** - Feature roadmap
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project statistics

---

## 🎮 Usage Tips

### Age Modes
- **Kids (6-12):** Friendly, educational, no complex themes
- **Teen (13-17):** More adventure, mild challenges
- **Adult (18+):** Complex narratives, historical depth

### Locations
Works best with:
- **Austrian cities:** Wien, Salzburg, Innsbruck, Graz
- **Historical sites:** Schönbrunn, Hofburg, Festung Hohensalzburg
- **Regions:** Tirol, Steiermark, Vorarlberg

### Choices
- Each story presents 3 choices
- Choices shape the narrative
- No wrong answers - just different adventures!

### History
- View past scenes via "Story History"
- Export your story (Text/Markdown/JSON)
- Share via Web Share API (mobile)

---

## 🤔 FAQ

**Q: Does demo mode require internet?**
A: After first load, it works offline (PWA)!

**Q: How much does the Claude API cost?**
A: ~$0.003 per 1000 tokens. Very cheap! Demo is free.

**Q: Can I run multiple variants at once?**
A: Yes! Use different ports:
```bash
# Terminal 1
cd variant-a-medieval && npm run dev
# Terminal 2
cd variant-b-gamer && npm run dev -- --port 5174
# Terminal 3
cd variant-c-museum && npm run dev -- --port 5175
```

**Q: Which variant should I use?**
A: Try all three! Pick your favorite style.

**Q: Can I customize the variants?**
A: Absolutely! Edit the code - it's yours.

**Q: Is this production-ready?**
A: Yes! See DEPLOYMENT.md for deployment guides.

---

## 🎉 You're Ready!

```bash
# Let's go!
cd variant-a-medieval
npm install
npm run dev
```

**Open http://localhost:5173 and start your historical adventure!** 🏰

---

**Need help?** Check the [full documentation](README.md) or [installation guide](INSTALLATION.md).

**Ready to deploy?** See the [deployment guide](DEPLOYMENT.md).

**Happy adventuring! 🗺️✨**
