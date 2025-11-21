import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// MUSEUM GUIDE VARIANT: Professional location input
export function LocationInput() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setLocation, ageMode } = useGameStore()
  const navigate = useNavigate()

  const handleTextSubmit = async () => {
    if (!input.trim()) {
      setError('Bitte geben Sie einen Ort ein')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=1&accept-language=de`
      )
      const data = await response.json()

      if (data.length === 0) {
        setError('Der angegebene Ort konnte nicht gefunden werden. Bitte überprüfen Sie Ihre Eingabe.')
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
      setError('Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
      setLoading(false)
    }
  }

  const handleGPSClick = () => {
    if (!navigator.geolocation) {
      setError('Ihr Gerät unterstützt keine Standortbestimmung')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
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
          setError('Der Standort konnte nicht ermittelt werden')
          setLoading(false)
        }
      },
      () => {
        setError('Standortberechtigung wurde verweigert')
        setLoading(false)
      }
    )
  }

  const modeTitles = {
    kids: 'Grundstufe',
    teen: 'Mittelstufe',
    adult: 'Oberstufe',
  }

  return (
    <div className="min-h-screen bg-museum-cream flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading mb-4 text-museum-navy">
            Standortauswahl
          </h1>
          <p className="text-lg font-body text-museum-gray">
            Geben Sie einen historischen Ort ein oder verwenden Sie Ihren aktuellen Standort
          </p>
        </div>

        {/* Input card */}
        <div className="learning-card mb-6">
          <div className="space-y-6">
            {/* Text input */}
            <div>
              <label className="block font-heading text-museum-navy mb-3">
                Historischer Ort
              </label>
              <input
                type="text"
                placeholder="z.B. Mauthausen Gedenkstätte"
                className="w-full p-4 bg-white border-2 border-museum-border text-museum-navy font-body text-lg focus:outline-none focus:border-museum-gold transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                disabled={loading}
              />
              <p className="text-sm text-museum-gray mt-2">
                Tipp: Verwenden Sie bekannte historische Orte, Gedenkstätten oder Museen
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500">
                <p className="font-body text-red-700">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleTextSubmit}
                disabled={loading}
                className="w-full btn-museum disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Ort wird gesucht...
                  </span>
                ) : (
                  'Ort suchen'
                )}
              </button>

              <div className="text-center font-body text-museum-gray text-sm">
                oder
              </div>

              <button
                onClick={handleGPSClick}
                disabled={loading}
                className="w-full p-4 bg-white border-2 border-museum-navy text-museum-navy font-medium hover:bg-museum-navy hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aktuellen Standort verwenden
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-museum-gray font-body">
          <p>
            Ausgewählte Bildungsebene: <strong>{modeTitles[ageMode || 'adult']}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
