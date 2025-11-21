import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'

// NEON GAMER VARIANT: Gaming-style location input
export function LocationInput() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setLocation, ageMode } = useGameStore()
  const navigate = useNavigate()

  const handleTextSubmit = async () => {
    if (!input.trim()) {
      setError('⚠️ Yo, gib mal nen Ort ein!')
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
        setError('🚫 Location not found. Try again!')
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
      setError('❌ Connection Error. Retry?')
      setLoading(false)
    }
  }

  const handleGPSClick = () => {
    if (!navigator.geolocation) {
      setError('⚠️ GPS not supported by your device')
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
          setError('❌ GPS Error. Try manual input?')
          setLoading(false)
        }
      },
      () => {
        setError('⚠️ GPS Permission denied')
        setLoading(false)
      }
    )
  }

  const modeTitles = {
    kids: 'EASY MODE',
    teen: 'NORMAL MODE',
    adult: 'HARD MODE',
  }

  return (
    <div className="min-h-screen bg-dark-bg scanlines flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl font-heading mb-4 neon-text-cyan">
            📍 SPAWN LOCATION
          </h1>
          <p className="text-xl font-body text-gray-300">
            Wo startet dein Abenteuer?
          </p>
        </div>

        {/* Input card */}
        <div className="bg-dark-card neon-border-purple p-8 mb-6">
          <div className="space-y-6">
            {/* Text input */}
            <div>
              <label className="block font-mono text-neon-cyan mb-3 text-sm">
                &gt; ENTER LOCATION_
              </label>
              <input
                type="text"
                placeholder="z.B. Stephansdom Wien"
                className="w-full p-4 bg-dark-bg border-2 border-neon-purple text-white font-body text-lg focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-900 bg-opacity-30 border-2 border-red-500">
                <p className="font-mono text-red-400">{error}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleTextSubmit}
                disabled={loading}
                className="w-full p-4 bg-neon-purple text-white font-heading text-xl hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-gaming neon-border-purple"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="inline-block w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    LOADING...
                  </span>
                ) : (
                  '🔍 SEARCH LOCATION'
                )}
              </button>

              <div className="text-center font-mono text-gray-500 text-sm">
                — OR —
              </div>

              <button
                onClick={handleGPSClick}
                disabled={loading}
                className="w-full p-4 bg-neon-cyan text-dark-bg font-heading text-xl hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-gaming neon-border-cyan"
              >
                📍 USE GPS COORDINATES
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 font-mono text-sm">
          <p>
            Current Mode: <span className="text-neon-green">{modeTitles[ageMode || 'adult']}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
