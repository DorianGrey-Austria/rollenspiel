import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// NEON GAMER VARIANT: Gaming-style age selection
export function AgeModeSelector() {
  const setAgeMode = useGameStore((state) => state.setAgeMode)
  const navigate = useNavigate()

  const handleSelect = (mode: 'kids' | 'teen' | 'adult') => {
    setAgeMode(mode)
    navigate('/location')
  }

  return (
    <div className="min-h-screen bg-dark-bg scanlines flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Animated header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-6xl font-heading mb-4 neon-text-purple animate-pulse-slow">
            🎮 LEVEL SELECT
          </h1>
          <p className="text-xl font-body text-neon-cyan">
            Wähl dein Skill-Level für das perfekte Story-Erlebnis
          </p>
        </div>

        {/* Gaming cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kids */}
          <button
            onClick={() => handleSelect('kids')}
            className="bg-dark-card neon-border-cyan p-8 hover:scale-105 transition-all btn-gaming group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">👶</div>
              <h2 className="text-2xl font-heading text-neon-cyan mb-3">
                EASY MODE
              </h2>
              <div className="text-sm font-mono mb-2 text-gray-400">
                [LVL 6-12]
              </div>
              <p className="font-body text-gray-300">
                Chillige Abenteuer ohne Horror. Perfekt für Kids und Anfänger!
              </p>
              <div className="mt-4 font-mono text-xs text-neon-green">
                + Safe Content
                <br />+ Fun Quests
                <br />+ No Jumpscares
              </div>
            </div>
          </button>

          {/* Teen */}
          <button
            onClick={() => handleSelect('teen')}
            className="bg-dark-card neon-border-purple p-8 hover:scale-105 transition-all btn-gaming group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-heading text-neon-purple mb-3">
                NORMAL MODE
              </h2>
              <div className="text-sm font-mono mb-2 text-gray-400">
                [LVL 13-17]
              </div>
              <p className="font-body text-gray-300">
                Spannende Action mit Plot-Twists. Für Teens die es drauf haben!
              </p>
              <div className="mt-4 font-mono text-xs text-neon-green">
                + Moderate Action
                <br />+ Cool Storylines
                <br />+ Skill Checks
              </div>
            </div>
          </button>

          {/* Adult */}
          <button
            onClick={() => handleSelect('adult')}
            className="bg-dark-card neon-border-pink p-8 hover:scale-105 transition-all btn-gaming group"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">⚔️</div>
              <h2 className="text-2xl font-heading text-neon-pink mb-3">
                HARD MODE
              </h2>
              <div className="text-sm font-mono mb-2 text-gray-400">
                [LVL 18+]
              </div>
              <p className="font-body text-gray-300">
                Düstere mature Stories. Only für echte Gaming-Veterans!
              </p>
              <div className="mt-4 font-mono text-xs text-neon-green">
                + Mature Content
                <br />+ Complex Choices
                <br />+ Dark Themes
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 font-mono text-sm text-gray-500">
          <p className="animate-pulse">▶ SELECT YOUR DIFFICULTY ◀</p>
        </div>
      </div>
    </div>
  )
}
