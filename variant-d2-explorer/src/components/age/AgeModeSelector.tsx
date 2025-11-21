import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'
import { StatsPanel } from '../premium/StatsPanel'
import { useState } from 'react'

// TIME EXPLORER VARIANT: Premium interactive experience
export function AgeModeSelector() {
  const setAgeMode = useGameStore((state) => state.setAgeMode)
  const updateStreak = useGameStore((state) => state.updateStreak)
  const navigate = useNavigate()
  const [showStats, setShowStats] = useState(false)

  const handleSelect = (mode: 'kids' | 'teen' | 'adult') => {
    setAgeMode(mode)
    updateStreak() // Update daily streak
    navigate('/location')
  }

  return (
    <div className="min-h-screen bg-gradient-explorer p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-explorer-highlight opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-explorer-accent opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Stats Toggle Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowStats(!showStats)}
            className="glass-card px-4 py-2 flex items-center gap-2 hover:bg-white/20"
          >
            <span className="text-xl">📊</span>
            <span className="text-sm font-semibold">
              {showStats ? 'Ausblenden' : 'Stats'}
            </span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Premium header with glassmorphism */}
            <div className="text-center glass-card p-8 animate-slide-up">
              <div className="inline-block mb-4">
                <span className="text-6xl animate-float">⏰</span>
              </div>
              <h1 className="text-5xl font-heading mb-4 text-white">
                Wähle deine Zeitreise
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Erlebe Geschichte interaktiv • Sammle Achievements • Entdecke die Vergangenheit
              </p>
            </div>

            {/* Premium Mode Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Kids */}
              <button
                onClick={() => handleSelect('kids')}
                className="character-card p-6 text-left group"
              >
                <div className="mb-4">
                  <span className="text-5xl">🌟</span>
                </div>
                <h2 className="text-2xl font-heading mb-2">
                  Entdecker
                </h2>
                <div className="achievement-badge text-sm mb-4">
                  6-12 Jahre
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  Spannende Geschichten für junge Zeitreisende. Lerne spielerisch über Geschichte!
                </p>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>✨ Einfache Sprache</li>
                  <li>✨ Positive Helden</li>
                  <li>✨ +10 XP pro Story</li>
                </ul>
              </button>

              {/* Teen */}
              <button
                onClick={() => handleSelect('teen')}
                className="character-card p-6 text-left border-glow-animate"
              >
                <div className="mb-4">
                  <span className="text-5xl">🎯</span>
                </div>
                <h2 className="text-2xl font-heading mb-2">
                  Abenteurer
                </h2>
                <div className="achievement-badge text-sm mb-4">
                  13-17 Jahre
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  Erlebe tiefgehende historische Abenteuer mit komplexen Herausforderungen.
                </p>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>🔥 Spannende Dilemmata</li>
                  <li>🔥 Kritisches Denken</li>
                  <li>🔥 +15 XP pro Story</li>
                </ul>
              </button>

              {/* Adult */}
              <button
                onClick={() => handleSelect('adult')}
                className="character-card p-6 text-left"
              >
                <div className="mb-4">
                  <span className="text-5xl">🏆</span>
                </div>
                <h2 className="text-2xl font-heading mb-2">
                  Zeitmeister
                </h2>
                <div className="achievement-badge text-sm mb-4">
                  18+ Jahre
                </div>
                <p className="text-white/80 mb-4 text-sm">
                  Akademische Tiefe und vollständige historische Komplexität erwarten dich.
                </p>
                <ul className="text-sm text-white/70 space-y-2">
                  <li>⚡ Wissenschaftlich</li>
                  <li>⚡ Vollständige Quellen</li>
                  <li>⚡ +20 XP pro Story</li>
                </ul>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-white/50 text-sm animate-fade-in">
              <p>Premium Zeitreise-Erlebnis • Gamification • Pädagogisch wertvoll</p>
            </div>
          </div>

          {/* Stats Sidebar */}
          {showStats && (
            <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <StatsPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
