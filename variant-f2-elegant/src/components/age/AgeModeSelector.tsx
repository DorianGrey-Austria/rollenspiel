import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// ELEGANT VARIANT: Beautiful, stable, guaranteed to work
export function AgeModeSelector() {
  const setAgeMode = useGameStore((state) => state.setAgeMode)
  const navigate = useNavigate()

  const handleSelect = (mode: 'kids' | 'teen' | 'adult') => {
    setAgeMode(mode)
    navigate('/location')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="mb-6">
            <span className="text-7xl">✨</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Deine Geschichte beginnt hier
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Erlebe Geschichten die zu dir passen • Interaktiv • Spannend • Lehrreich
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Kids */}
          <button
            onClick={() => handleSelect('kids')}
            className="group bg-gradient-to-br from-violet-500/10 to-violet-600/10 border-2 border-violet-500/20 hover:border-violet-400 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌟</div>
            <h2 className="text-3xl font-bold mb-3">Junge Entdecker</h2>
            <div className="inline-flex px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-semibold mb-4">
              6-12 Jahre
            </div>
            <p className="text-gray-300 mb-6">
              Spannende Geschichten mit einfacher Sprache und positiven Helden.
            </p>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-violet-400">✓</span> Einfache Sprache
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-violet-400">✓</span> Positive Helden
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-violet-400">✓</span> Spielerisch lernen
              </li>
            </ul>
            <div className="pt-4 border-t border-violet-500/20">
              <span className="text-violet-400 font-semibold">Auswählen →</span>
            </div>
          </button>

          {/* Teen */}
          <button
            onClick={() => handleSelect('teen')}
            className="group bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-2 border-pink-500/20 hover:border-pink-400 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
            <h2 className="text-3xl font-bold mb-3">Abenteurer</h2>
            <div className="inline-flex px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-semibold mb-4">
              13-17 Jahre
            </div>
            <p className="text-gray-300 mb-6">
              Tiefgehende Abenteuer mit spannenden Herausforderungen.
            </p>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-pink-400">✓</span> Spannende Dilemmata
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-pink-400">✓</span> Kritisches Denken
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-pink-400">✓</span> Historische Tiefe
              </li>
            </ul>
            <div className="pt-4 border-t border-pink-500/20">
              <span className="text-pink-400 font-semibold">Auswählen →</span>
            </div>
          </button>

          {/* Adult */}
          <button
            onClick={() => handleSelect('adult')}
            className="group bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-2 border-cyan-500/20 hover:border-cyan-400 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
            <h2 className="text-3xl font-bold mb-3">Zeitmeister</h2>
            <div className="inline-flex px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-semibold mb-4">
              18+ Jahre
            </div>
            <p className="text-gray-300 mb-6">
              Akademische Erzählungen mit wissenschaftlicher Tiefe.
            </p>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-cyan-400">✓</span> Wissenschaftlich
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-cyan-400">✓</span> Vollständige Quellen
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <span className="text-cyan-400">✓</span> Kritische Analyse
              </li>
            </ul>
            <div className="pt-4 border-t border-cyan-500/20">
              <span className="text-cyan-400 font-semibold">Auswählen →</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Powered by AI • Historisch akkurat • Pädagogisch wertvoll</p>
        </div>
      </div>
    </div>
  )
}
