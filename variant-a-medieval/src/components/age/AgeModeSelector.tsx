import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// MEDIEVAL SCHOLAR VARIANT: Formal, historical age selection
export function AgeModeSelector() {
  const setAgeMode = useGameStore((state) => state.setAgeMode)
  const navigate = useNavigate()

  const handleSelect = (mode: 'kids' | 'teen' | 'adult') => {
    setAgeMode(mode)
    navigate('/location')
  }

  return (
    <div className="min-h-screen parchment-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Ornate header */}
        <div className="text-center mb-12">
          <div className="wax-seal mx-auto mb-6"></div>
          <h1 className="text-5xl font-bold font-heading mb-4 text-burgundy">
            Willkommen, werter Leser
          </h1>
          <p className="text-xl font-body italic text-ink-medium">
            Wählet Euer Alter, damit wir die Chronik Eurem Verständnis entsprechend verfassen können
          </p>
        </div>

        {/* Age cards with medieval styling */}
        <div className="space-y-6">
          {/* Kids */}
          <button
            onClick={() => handleSelect('kids')}
            className="w-full p-8 parchment-bg ornate-border hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="text-6xl">📚</div>
              <div className="text-left flex-1">
                <h2 className="text-2xl font-heading text-burgundy mb-2">
                  Junge Schüler (6-12 Jahre)
                </h2>
                <p className="font-body text-ink-medium">
                  Für junge Gemüter, die von vergangenen Zeiten lernen möchten.
                  Geschichten voller Weisheit und Abenteuer.
                </p>
              </div>
            </div>
          </button>

          {/* Teen */}
          <button
            onClick={() => handleSelect('teen')}
            className="w-full p-8 parchment-bg ornate-border hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="text-6xl">⚔️</div>
              <div className="text-left flex-1">
                <h2 className="text-2xl font-heading text-burgundy mb-2">
                  Junge Gelehrte (13-17 Jahre)
                </h2>
                <p className="font-body text-ink-medium">
                  Für wissbegierige Geister, die die Komplexität der Geschichte
                  erfassen wollen. Chroniken voller Intrigen und Entscheidungen.
                </p>
              </div>
            </div>
          </button>

          {/* Adult */}
          <button
            onClick={() => handleSelect('adult')}
            className="w-full p-8 parchment-bg ornate-border hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-6">
              <div className="text-6xl">🏛️</div>
              <div className="text-left flex-1">
                <h2 className="text-2xl font-heading text-burgundy mb-2">
                  Gelehrte Meister (18+ Jahre)
                </h2>
                <p className="font-body text-ink-medium">
                  Für reife Geister, die die ungefilterte Wahrheit der Geschichte
                  erfahren wollen. Komplexe Annalen voller Ambivalenz.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer ornament */}
        <div className="text-center mt-12 text-ink-medium font-body italic">
          <p>⚜ Anno Domini 2025 ⚜</p>
        </div>
      </div>
    </div>
  )
}
