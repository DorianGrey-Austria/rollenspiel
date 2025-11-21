import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// MUSEUM GUIDE VARIANT: Professional, educational age selection
export function AgeModeSelector() {
  const setAgeMode = useGameStore((state) => state.setAgeMode)
  const navigate = useNavigate()

  const handleSelect = (mode: 'kids' | 'teen' | 'adult') => {
    setAgeMode(mode)
    navigate('/location')
  }

  return (
    <div className="min-h-screen bg-museum-cream flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Professional header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading mb-4 text-museum-navy">
            Bildungsebene wählen
          </h1>
          <p className="text-xl font-body text-museum-gray max-w-2xl mx-auto">
            Wählen Sie die passende Komplexitätsstufe für Ihre historische Erkundung
          </p>
        </div>

        {/* Educational cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kids */}
          <button
            onClick={() => handleSelect('kids')}
            className="museum-card p-8 text-left hover:border-museum-gold transition-all"
          >
            <div className="mb-4">
              <span className="text-5xl">📚</span>
            </div>
            <h2 className="text-2xl font-heading text-museum-navy mb-3">
              Grundstufe
            </h2>
            <div className="stat-badge mb-4">
              6-12 Jahre
            </div>
            <p className="font-body text-museum-gray mb-4">
              Altersgerechte historische Erzählungen mit pädagogischem Fokus.
              Vereinfachte Darstellung komplexer Zusammenhänge.
            </p>
            <ul className="text-sm text-museum-gray space-y-2">
              <li>• Einfache Sprache (B1)</li>
              <li>• Positive Vorbilder</li>
              <li>• Bildungsorientiert</li>
            </ul>
          </button>

          {/* Teen */}
          <button
            onClick={() => handleSelect('teen')}
            className="museum-card p-8 text-left hover:border-museum-gold transition-all"
          >
            <div className="mb-4">
              <span className="text-5xl">🎓</span>
            </div>
            <h2 className="text-2xl font-heading text-museum-navy mb-3">
              Mittelstufe
            </h2>
            <div className="stat-badge mb-4">
              13-17 Jahre
            </div>
            <p className="font-body text-museum-gray mb-4">
              Vertiefte Betrachtung historischer Ereignisse und Zusammenhänge.
              Förderung kritischen Denkens.
            </p>
            <ul className="text-sm text-museum-gray space-y-2">
              <li>• Komplexere Sprache (B2-C1)</li>
              <li>• Historische Dilemmata</li>
              <li>• Quellenarbeit</li>
            </ul>
          </button>

          {/* Adult */}
          <button
            onClick={() => handleSelect('adult')}
            className="museum-card p-8 text-left hover:border-museum-gold transition-all"
          >
            <div className="mb-4">
              <span className="text-5xl">🏛️</span>
            </div>
            <h2 className="text-2xl font-heading text-museum-navy mb-3">
              Oberstufe
            </h2>
            <div className="stat-badge mb-4">
              18+ Jahre
            </div>
            <p className="font-body text-museum-gray mb-4">
              Akademische Auseinandersetzung mit historischen Themen.
              Vollständige Komplexität und kritische Reflexion.
            </p>
            <ul className="text-sm text-museum-gray space-y-2">
              <li>• Wissenschaftliche Sprache</li>
              <li>• Kontroverse Themen</li>
              <li>• Kritische Analyse</li>
            </ul>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-museum-gray font-body">
          <p>Historische Bildungsplattform • Faktenbasiert • Wissenschaftlich fundiert</p>
        </div>
      </div>
    </div>
  )
}
