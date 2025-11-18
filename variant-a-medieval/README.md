# 🏰 Medieval Scholar - Variant A

> **rollenspiel.ai** - Location-Based AI Storytelling Platform

## 🎨 Design Concept

**Medieval Scholar** is a historically-themed variant featuring:
- 📜 Parchment and ink aesthetics
- ⚜ Gothic and Renaissance typography
- 🏛️ Formal "Ihr/Sie" language style
- 🎭 Focus on historical accuracy and education

### Target Audience
- History enthusiasts
- Educational institutions
- Museum visitors
- Classical storytelling fans

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Anthropic API Key

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env and add your VITE_ANTHROPIC_API_KEY

# 3. Start development server
npm run dev
```

Server runs on: http://localhost:5173

---

## ✨ Features

### Implemented
- ✅ Age Mode Selection (formal historical wording)
- ✅ Location Input (Text + GPS geocoding)
- ✅ AI Story Generation (Claude API with medieval prompts)
- ✅ Typewriter Effect (with Gothic initial letter)
- ✅ Choice System (Roman numerals I, II, III)
- ✅ Story History Timeline
- ✅ Ornate medieval UI (parchment, wax seals, borders)

### Unique to Medieval Scholar
- 📜 Formal "Ihr" addressing
- ⚜ Gothic initial letters in stories
- 🏛️ Wax seal decorations
- 📚 Historical chronicle terminology
- 🎨 Burgundy, gold, and parchment color scheme

---

## 🎨 Design System

### Colors
- **Parchment**: #F4E8D0 (background)
- **Burgundy**: #800020 (primary actions)
- **Gold**: #D4AF37 (accents)
- **Ink Dark**: #2C1810 (text)
- **Forest Green**: #2D5016 (secondary)

### Typography
- **Headings**: Cinzel (serif, elegant)
- **Body**: Crimson Text (serif, readable)
- **Special**: UnifrakturMaguntia (Gothic)

### Components
- Ornate borders with burgundy/gold pattern
- Wax seal decorations (⚜)
- Parchment texture backgrounds
- Roman numeral choices

---

## 📁 Project Structure

```
src/
├── components/
│   ├── age/
│   │   └── AgeModeSelector.tsx    # Age selection with medieval cards
│   ├── location/
│   │   └── LocationInput.tsx      # Formal location input
│   └── story/
│       └── TypewriterText.tsx     # Gothic initial letter effect
├── pages/
│   ├── AgeSelectionPage.tsx
│   ├── LocationInputPage.tsx
│   └── StoryPage.tsx              # Main chronicle display
├── lib/
│   ├── storyGenerator.ts          # Medieval-themed prompts
│   ├── anthropic.ts               # Claude API client
│   └── types.ts                   # TypeScript definitions
├── store/
│   └── gameStore.ts               # Zustand state management
└── index.css                       # Medieval styling
```

---

## 🎮 User Flow

1. **Age Selection** → Choose "Junge Schüler", "Junge Gelehrte", or "Gelehrte Meister"
2. **Location Input** → Enter location or use GPS
3. **Story Generation** → Claude generates medieval-style chronicle
4. **Read & Choose** → Story unfolds with typewriter effect, choose from 3 options
5. **Continue** → Story develops based on choices

---

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Comparison to Other Variants

| Feature | Medieval Scholar | Neon Gamer | Museum Guide |
|---------|-----------------|------------|--------------|
| **Design** | Parchment, ornate | Neon, gaming UI | Minimalist, clean |
| **Tone** | Formal "Ihr" | Casual slang | Professional neutral |
| **Colors** | Burgundy, gold | Purple, cyan | Navy, white |
| **Typography** | Gothic serifs | Bold sans | Clean sans |
| **Target** | History buffs | Gamers, youth | Educators |

---

## 📝 Notes

- **Prototype**: Focus on core functionality
- **API Keys**: Exposed in browser (OK for demo)
- **No Tests**: Manual testing only
- **Nominatim**: 1 req/sec rate limit

---

## 🙏 Credits

- Built with Claude Code (Anthropic)
- Autonomous 3-Hour Code Generation
- November 18, 2025

**Status**: 🟢 Functional Prototype
**Variant**: A - Medieval Scholar 🏰
