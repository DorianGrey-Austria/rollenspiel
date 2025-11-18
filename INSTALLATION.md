# 📦 Installation Guide - rollenspiel.ai

Komplette Installations-Anleitung für Entwickler und Tester.

---

## 🚀 Quick Start (Demo Mode - KEIN API Key nötig!)

### Option 1: Online testen (wenn deployed)
Besuche einfach die deployed URL und los geht's!

### Option 2: Lokal installieren

```bash
# 1. Repository clonen
git clone https://github.com/your-username/rollenspiel.git
cd rollenspiel

# 2. Wähle eine Variante
cd variant-a-medieval  # oder variant-b-gamer oder variant-c-museum

# 3. Dependencies installieren
npm install

# 4. Starten (Demo Mode ist default!)
npm run dev

# 5. Browser öffnen
# http://localhost:5173
```

**Das war's!** Demo Mode funktioniert ohne API Key! 🎉

---

## 🔑 Installation mit Claude API (Production Mode)

### Voraussetzungen
- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+
- Git
- Anthropic API Key ([Registrieren](https://console.anthropic.com/))

### Schritt 1: Repository Setup

```bash
# Clone
git clone https://github.com/your-username/rollenspiel.git
cd rollenspiel

# Check Node version
node --version  # sollte v18+ sein
npm --version   # sollte v9+ sein
```

### Schritt 2: API Key besorgen

1. Gehe zu https://console.anthropic.com/
2. Registriere dich / Login
3. Erstelle einen API Key
4. Kopiere den Key (beginnt mit `sk-ant-...`)

### Schritt 3: Environment Setup

```bash
# Wähle eine Variante
cd variant-a-medieval  # oder variant-b-gamer oder variant-c-museum

# Erstelle .env file
cp .env.example .env

# Öffne .env und füge deinen API Key ein
# VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Wichtig:** Die `.env` Datei wird von Git ignoriert (sicher!).

### Schritt 4: Dependencies installieren

```bash
# In der Variante (z.B. variant-a-medieval):
npm install
```

Das dauert 1-2 Minuten und installiert:
- React & TypeScript
- Vite (Build Tool)
- TailwindCSS & DaisyUI
- Zustand (State)
- Anthropic SDK
- etc.

### Schritt 5: Development Server starten

```bash
npm run dev
```

Output sollte sein:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Öffne `http://localhost:5173` im Browser! 🎉

---

## 🔧 Alle Varianten installieren

```bash
# Von der Root des Projekts:
npm run install:all

# Startet dann:
npm run dev:medieval   # Port 5173
npm run dev:gamer      # Port 5174
npm run dev:museum     # Port 5175
```

---

## 🏗️ Build für Production

```bash
# In einer Variante:
npm run build

# Output: dist/ folder
# Enthält optimierte, production-ready files
```

Preview des Builds:
```bash
npm run preview
# Opens http://localhost:4173
```

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"

**Lösung:** Node.js ist nicht installiert.
```bash
# Download & Install:
https://nodejs.org/
```

### Problem: "Cannot find module '@anthropic-ai/sdk'"

**Lösung:** Dependencies nicht installiert.
```bash
npm install
```

### Problem: Port 5173 already in use

**Lösung:** Anderer Prozess nutzt den Port.
```bash
# Option 1: Kill existing process
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
npm run dev -- --port 3000
```

### Problem: API Key Error / "ANTHROPIC_API_KEY not found"

**Zwei Szenarien:**

1. **Demo Mode (kein API Key nötig):**
   - Lösche/Rename `.env` file
   - App nutzt automatisch Demo Mode mit Mock Data

2. **Real Mode (mit API):**
   - Check `.env` file exists
   - Check `VITE_ANTHROPIC_API_KEY=sk-ant-...` korrekt
   - Restart dev server (`Ctrl+C`, dann `npm run dev`)

### Problem: Build fails

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: TypeScript errors

```bash
# Check TypeScript
npm run tsc

# Most errors auto-fix with:
npm install --save-dev @types/node
```

---

## 📱 Mobile Testing (PWA)

### Lokal auf Handy testen

1. **Finde deine IP-Adresse:**
   ```bash
   # macOS/Linux:
   ifconfig | grep "inet "

   # Windows:
   ipconfig
   ```

2. **Start dev server with --host:**
   ```bash
   npm run dev -- --host
   ```

3. **Öffne auf Handy:**
   ```
   http://YOUR_IP:5173
   # z.B. http://192.168.1.100:5173
   ```

4. **Install PWA:**
   - Chrome: "Add to Home Screen"
   - Safari: "Add to Home Screen"

---

## 🔄 Updates pullen

```bash
# Latest code holen
git pull origin main

# Dependencies updaten
npm install

# Dev server neu starten
npm run dev
```

---

## 🧹 Cleanup

```bash
# Clean node_modules & build artifacts
npm run clean

# Or manually:
rm -rf variant-*/node_modules
rm -rf variant-*/dist
```

---

## 💡 Development Tips

### Hot Module Replacement (HMR)
Vite unterstützt HMR - Code-Änderungen werden instant im Browser sichtbar!

### Browser DevTools
- Chrome DevTools: F12
- React DevTools: [Extension](https://chrome.google.com/webstore/detail/react-developer-tools/)
- Network Tab: Check API calls

### Environment Variables
Alle `VITE_` prefixed variables sind im Browser verfügbar:
```typescript
// Access in code:
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
```

### Demo vs Real Mode
```typescript
// Force demo mode:
localStorage.setItem('rpg_demo_mode', 'true')

// Force real mode:
localStorage.removeItem('rpg_demo_mode')
```

---

## 📚 Weiterführende Docs

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment auf Vercel/Netlify
- [ROADMAP.md](./ROADMAP.md) - Feature Roadmap
- [README.md](./README.md) - Projekt Overview

---

## ❓ FAQ

**Q: Wie viel kostet die Claude API?**
A: ~$0.003 per 1000 tokens. Demo Mode ist komplett gratis!

**Q: Kann ich offline arbeiten?**
A: Ja, nach dem ersten Load (PWA). Demo Mode ist immer offline-fähig.

**Q: Welche Variante soll ich nutzen?**
A:
- Medieval: Für Geschichte-Fans
- Gamer: Für junge Zielgruppe
- Museum: Für Bildungskontext

**Q: Kann ich mehrere Varianten gleichzeitig laufen lassen?**
A: Ja! Nutze unterschiedliche Ports:
```bash
# Terminal 1:
cd variant-a-medieval && npm run dev

# Terminal 2:
cd variant-b-gamer && npm run dev -- --port 5174

# Terminal 3:
cd variant-c-museum && npm run dev -- --port 5175
```

---

**Happy Coding! 🚀**

Bei Problemen: Check [GitHub Issues](https://github.com/your-username/rollenspiel/issues)
