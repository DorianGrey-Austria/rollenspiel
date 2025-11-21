import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// MEDIEVAL SCHOLAR VARIANT: Formal location input
export function LocationInput() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setLocation, ageMode } = useGameStore()
  const navigate = useNavigate()

  const handleTextSubmit = async () => {
    if (!input.trim()) {
      setError('Bitte gebet einen Ort ein, werter Leser')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Geocode using Nominatim (OSM)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=1&accept-language=de`
      )
      const data = await response.json()

      if (data.length === 0) {
        setError('Dieser Ort ist uns unbekannt. Versucht eine andere Bezeichnung.')
        setLoading(false)
        return
      }

      const location = {
        name: data[0].display_name,
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      }

      setLocation(location)
      navigate('/story')
    } catch (err) {
      setError('Ein Fehler ereignete sich bei der Suche. Versucht es erneut.')
      setLoading(false)
    }
  }

  const handleGPSClick = () => {
    if (!navigator.geolocation) {
      setError('Euer Gerät unterstützt die Standortbestimmung nicht')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocode
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=de`
          )
          const data = await response.json()

          const location = {
            name: data.display_name,
            lat: latitude,
            lon: longitude,
          }

          setLocation(location)
          navigate('/story')
        } catch (err) {
          setError('Euer Standort konnte nicht ermittelt werden')
          setLoading(false)
        }
      },
      () => {
        setError('Standort konnte nicht ermittelt werden')
        setLoading(false)
      }
    )
  }

  // AUTONOMOUS DECISION: Medieval-style age mode labels
  const ageModeLabels = {
    kids: 'Junge Schüler',
    teen: 'Junge Gelehrte',
    adult: 'Gelehrte Meister',
  }

  return (
    <div className="min-h-screen parchment-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="wax-seal mx-auto mb-6"></div>
          <h1 className="text-4xl font-bold font-heading mb-4 text-burgundy">
            An welchem Orte befindet Ihr Euch?
          </h1>
          <p className="text-lg font-body italic text-ink-medium">
            Nennet uns den Ort, und wir werden Euch eine Chronik desselben verfassen
          </p>
        </div>

        {/* Input card */}
        <div className="parchment-bg ornate-border p-8 mb-6">
          <div className="space-y-6">
            {/* Text input */}
            <div>
              <label className="block font-heading text-burgundy mb-3 text-lg">
                Ort eingeben
              </label>
              <input
                type="text"
                placeholder="z.B. Burg Hohenwerfen, Salzburg"
                className="w-full p-4 bg-parchment-dark border-2 border-ink-medium rounded-none font-body text-lg focus:outline-none focus:border-burgundy"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-burgundy bg-opacity-10 border-2 border-burgundy">
                <p className="font-body text-burgundy">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleTextSubmit}
                disabled={loading}
                className="w-full p-4 bg-burgundy text-parchment font-heading text-xl hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="inline-block w-5 h-5 border-2 border-parchment border-t-transparent rounded-full animate-spin"></span>
                    Suchen...
                  </span>
                ) : (
                  '🔍 Ort suchen'
                )}
              </button>

              <div className="text-center font-body italic text-ink-medium">
                — oder —
              </div>

              <button
                onClick={handleGPSClick}
                disabled={loading}
                className="w-full p-4 bg-forest text-parchment font-heading text-xl hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📍 Aktuellen Standort verwenden
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-ink-medium font-body">
          <p className="text-sm">
            Ausgewählter Modus: <strong>{ageModeLabels[ageMode || 'adult']}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
