# 🤝 Contributing to rollenspiel.ai

Thank you for your interest in contributing! This guide will help you get started.

---

## 📋 Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Project Structure](#project-structure)
5. [Adding Features](#adding-features)
6. [Testing](#testing)
7. [Submitting Changes](#submitting-changes)
8. [Need Help?](#need-help)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**
- (Optional) **Anthropic API key** for testing

### Setup Development Environment

```bash
# 1. Fork & clone
git clone https://github.com/YOUR_USERNAME/rollenspiel.git
cd rollenspiel

# 2. Install dependencies for all variants
npm run install:all

# 3. Validate setup
bash scripts/validate-setup.sh

# 4. Test builds
bash scripts/test-builds.sh
```

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b fix/bug-description
```

### 2. Make Changes

Work on a single variant at a time:

```bash
# Medieval variant
cd variant-a-medieval
npm run dev
# → http://localhost:5173

# Gamer variant
cd variant-b-gamer
npm run dev
# → http://localhost:5173

# Museum variant
cd variant-c-museum
npm run dev
# → http://localhost:5173
```

### 3. Test Your Changes

```bash
# Run validation
bash scripts/validate-setup.sh

# Test builds
bash scripts/test-builds.sh

# Test demo mode (no API key)
# → Select age mode, enter location, verify story loads

# Test with real API (if you have key)
# → Create .env, add ANTHROPIC_API_KEY, verify AI generation
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with clear message
git commit -m "feat: Add XYZ feature to medieval variant"

# Or for bugfixes
git commit -m "fix: Resolve story generation error in gamer variant"
```

### 5. Push & Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# → Describe changes, add screenshots if UI changes
```

---

## 📐 Code Standards

### TypeScript

```typescript
// ✅ Good
interface StoryScene {
  text: string
  choices: string[]
  timestamp: number
}

export function generateStory(location: string, ageMode: AgeMode): Promise<StoryScene> {
  // Implementation
}

// ❌ Bad
function generateStory(location, ageMode) {
  // No types!
}
```

### React Components

```typescript
// ✅ Good - Functional component with TypeScript
interface Props {
  title: string
  onSelect: (choice: string) => void
}

export function StoryChoice({ title, onSelect }: Props) {
  return (
    <button onClick={() => onSelect(title)}>
      {title}
    </button>
  )
}

// ❌ Bad - Missing types, unclear props
export function StoryChoice(props) {
  return <button onClick={props.onClick}>{props.title}</button>
}
```

### File Naming

- **Components:** `PascalCase.tsx` (e.g., `StoryDisplay.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `storyGenerator.ts`)
- **Hooks:** `useCamelCase.ts` (e.g., `useStoryGeneration.ts`)
- **Types:** `shared.ts`, `types.ts`

### Imports

```typescript
// ✅ Good - Organized imports
import { useState, useEffect } from 'react'
import type { AgeMode, Variant } from '@/types/shared'
import { generateStory } from '@/lib/storyGenerator'
import { Button } from '@/components/ui/Button'

// ❌ Bad - Unorganized
import { Button } from '@/components/ui/Button'
import { generateStory } from '@/lib/storyGenerator'
import type { AgeMode } from '@/types/shared'
import { useState } from 'react'
import type { Variant } from '@/types/shared'
import { useEffect } from 'react'
```

### Comments

```typescript
// ✅ Good - Explain WHY, not WHAT
// Stream text with delay to create typewriter effect
// This improves user engagement and readability
const streamText = async (text: string) => {
  // Implementation
}

// ❌ Bad - States the obvious
// This function streams text
const streamText = async (text: string) => {
  // Implementation
}
```

---

## 🏗️ Project Structure

### Variant Structure

Each variant follows the same structure:

```
variant-x-name/
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── story/           # Story-specific (StoryDisplay, Choices)
│   │   └── ui/              # Reusable UI (Button, Card)
│   ├── lib/                 # Business logic
│   │   └── storyGenerator.ts
│   ├── store/               # Zustand stores
│   │   └── storyStore.ts
│   ├── types/               # TypeScript types
│   │   └── story.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Styles
├── public/                  # Static assets
│   ├── manifest.json        # PWA manifest
│   └── icons/               # App icons
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind config
└── package.json             # Dependencies
```

### Shared Library

Code shared across variants:

```
shared/
├── components/              # Shared React components
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── hooks/                   # Shared hooks
│   ├── useStoryGeneration.ts
│   ├── useLocation.ts
│   └── useAnalytics.ts
├── utils/                   # Utilities
│   ├── storage.ts
│   ├── validation.ts
│   └── export.ts
├── constants/               # Constants & mock data
│   ├── config.ts
│   ├── mockData.ts
│   └── extendedMockData.ts
└── types/                   # Shared types
    └── shared.ts
```

### Backend API

Serverless functions (Vercel):

```
api/
├── story/
│   └── generate.ts          # Story generation endpoint
└── location/
    ├── geocode.ts           # Forward geocoding
    └── reverse.ts           # Reverse geocoding
```

---

## ✨ Adding Features

### Adding a New Story Element

1. **Define the type:**

```typescript
// shared/types/shared.ts
export interface StoryElement {
  type: 'narrative' | 'dialogue' | 'action'
  content: string
  speaker?: string
}
```

2. **Update the generator:**

```typescript
// variant-x/src/lib/storyGenerator.ts
export async function generateStoryWithElements(
  location: string,
  ageMode: AgeMode
): Promise<StoryElement[]> {
  // Implementation
}
```

3. **Create a component:**

```typescript
// variant-x/src/components/story/StoryElement.tsx
interface Props {
  element: StoryElement
}

export function StoryElementDisplay({ element }: Props) {
  // Render based on type
}
```

4. **Update the store:**

```typescript
// variant-x/src/store/storyStore.ts
interface StoryState {
  elements: StoryElement[]
  addElement: (element: StoryElement) => void
}
```

### Adding a New Variant

Want to create "Variant D"?

1. **Copy existing variant:**
```bash
cp -r variant-a-medieval variant-d-yourtheme
cd variant-d-yourtheme
```

2. **Update package.json:**
```json
{
  "name": "variant-d-yourtheme",
  "description": "Your theme description"
}
```

3. **Customize styling:**
   - Edit `tailwind.config.js` for colors/fonts
   - Edit `src/index.css` for theme-specific styles
   - Update `public/manifest.json` for PWA

4. **Update prompts:**
   - Edit `src/lib/storyGenerator.ts`
   - Change tone, language, storytelling style

5. **Add to root package.json:**
```json
{
  "scripts": {
    "dev:yourtheme": "cd variant-d-yourtheme && npm run dev",
    "build:yourtheme": "cd variant-d-yourtheme && npm install && npm run build"
  }
}
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Age mode selection works (Kids/Teen/Adult)
- [ ] Location input works (text entry)
- [ ] GPS location works (if supported)
- [ ] Demo mode stories load
- [ ] Real API mode works (with key)
- [ ] Choices advance the story
- [ ] Story history is tracked
- [ ] Export works (Text/Markdown/JSON)
- [ ] Mobile responsive design
- [ ] PWA installation
- [ ] Offline functionality
- [ ] Error handling (network failures)

### Build Testing

```bash
# Test all builds
bash scripts/test-builds.sh

# Test specific variant
cd variant-a-medieval
npm run build
npm run preview
```

### Validation

```bash
# Run full validation
bash scripts/validate-setup.sh

# Should show: ✓ Perfect! No errors or warnings.
```

---

## 📝 Submitting Changes

### Commit Message Format

```
type(scope): Short description

Longer description (optional)

- Bullet point 1
- Bullet point 2
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```bash
git commit -m "feat(medieval): Add historical fact boxes to stories"
git commit -m "fix(gamer): Resolve XP calculation error on level up"
git commit -m "docs: Update QUICKSTART with mobile testing section"
git commit -m "style(museum): Improve button contrast for accessibility"
```

### Pull Request Checklist

- [ ] Code follows project standards
- [ ] All validation passes (`bash scripts/validate-setup.sh`)
- [ ] All builds successful (`bash scripts/test-builds.sh`)
- [ ] Manual testing completed
- [ ] No console errors
- [ ] Documentation updated (if needed)
- [ ] Screenshots added (if UI changes)
- [ ] Commit messages are clear

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Description:**
Brief description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Variant: Medieval/Gamer/Museum
- Browser: Chrome 120
- OS: macOS 14
- Mode: Demo/Real API

**Screenshots:**
(if applicable)

**Additional Context:**
Any other relevant information
```

---

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check existing issues first
2. Describe the feature clearly
3. Explain the use case
4. Suggest implementation (optional)

### Feature Request Template

```markdown
**Feature:**
Brief description

**Use Case:**
Who benefits and how?

**Proposed Solution:**
How should it work?

**Alternatives:**
Other approaches considered

**Additional Context:**
Mockups, examples, etc.
```

---

## 🎨 Design Guidelines

### Variant Consistency

Each variant has a distinct theme:

**Medieval Scholar:**
- Colors: Burgundy (#800020), Gold (#D4AF37)
- Fonts: Cinzel (headings), Crimson Text (body)
- Elements: Parchment, wax seals, gothic letters
- Tone: Formal "Ihr/Sie"

**Neon Gamer:**
- Colors: Neon Purple (#B026FF), Cyan (#00F0FF)
- Fonts: Orbitron (headings), Rajdhani (body)
- Elements: Scanlines, glitch effects, XP bars
- Tone: Casual "Du" with gaming slang

**Museum Guide:**
- Colors: Navy (#1E3A8A), Cream (#F5F5DC)
- Fonts: Playfair Display (headings), Lora (body)
- Elements: Clean lines, fact boxes, timelines
- Tone: Neutral educational

### Accessibility

- Maintain WCAG 2.1 AA compliance
- Color contrast ratio >= 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators visible

---

## 📚 Resources

- **React Docs:** https://react.dev/
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **Vite Docs:** https://vitejs.dev/
- **TailwindCSS:** https://tailwindcss.com/docs
- **DaisyUI:** https://daisyui.com/
- **Anthropic API:** https://docs.anthropic.com/

---

## 🤔 Need Help?

- **Documentation:** Check [README.md](README.md), [QUICKSTART.md](QUICKSTART.md)
- **Issues:** Search [GitHub Issues](https://github.com/DorianGrey-Austria/rollenspiel/issues)
- **Questions:** Open a discussion on GitHub
- **Bugs:** Report via GitHub Issues

---

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Credit others for their work
- Follow the project standards

---

## 🎉 Thank You!

Every contribution helps make rollenspiel.ai better!

Whether it's:
- 🐛 Fixing a bug
- ✨ Adding a feature
- 📖 Improving docs
- 🎨 Enhancing design
- 🧪 Adding tests

**Your work is appreciated!** 🙏

---

**Happy contributing! 🚀**
