import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// ESSENTIAL VARIANT: Clean, modern, reliable age selection
export function AgeModeSelector() {
  const setAgeMode = useGameStore((state) => state.setAgeMode)
  const navigate = useNavigate()

  const handleSelect = (mode: 'kids' | 'teen' | 'adult') => {
    setAgeMode(mode)
    navigate('/location')
  }

  const modes = [
    {
      id: 'kids',
      icon: '🌟',
      title: 'Junge Entdecker',
      age: '6-12 Jahre',
      description: 'Spannende Geschichten für junge Zeitreisende mit einfacher Sprache und positiven Helden.',
      features: ['Einfache Sprache', 'Positive Helden', 'Spielerisch lernen'],
      color: 'from-primary to-primary-light'
    },
    {
      id: 'teen',
      icon: '🎯',
      title: 'Abenteurer',
      age: '13-17 Jahre',
      description: 'Tiefgehende historische Abenteuer mit spannenden Herausforderungen und komplexen Themen.',
      features: ['Spannende Dilemmata', 'Kritisches Denken', 'Historische Tiefe'],
      color: 'from-secondary to-secondary-light'
    },
    {
      id: 'adult',
      icon: '🏆',
      title: 'Zeitmeister',
      age: '18+ Jahre',
      description: 'Akademische historische Erzählungen mit vollständiger Komplexität und wissenschaftlicher Tiefe.',
      features: ['Wissenschaftlich fundiert', 'Vollständige Quellen', 'Kritische Analyse'],
      color: 'from-accent to-accent-light'
    }
  ]

  return (
    <div className="min-h-screen bg-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-6xl">📖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Wähle dein <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Abenteuer</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Erlebe Geschichte interaktiv • Lerne spielerisch • Entdecke die Vergangenheit
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          {modes.map((mode, index) => (
            <button
              key={mode.id}
              onClick={() => handleSelect(mode.id as 'kids' | 'teen' | 'adult')}
              className="essential-card text-left group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{mode.icon}</div>

              {/* Title & Age */}
              <h2 className="text-2xl font-bold mb-2">{mode.title}</h2>
              <div className="badge-essential mb-4">{mode.age}</div>

              {/* Description */}
              <p className="text-white/70 mb-4 text-sm leading-relaxed">
                {mode.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {mode.features.map((feature, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className={`mt-auto pt-4 border-t border-dark-light`}>
                <span className="text-sm font-semibold text-primary group-hover:text-primary-light transition-colors">
                  Auswählen →
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-white/50 text-sm animate-fade-in">
          <p>Powered by AI • Historisch akkurat • Pädagogisch wertvoll</p>
        </div>
      </div>
    </div>
  )
}
