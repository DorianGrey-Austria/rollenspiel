/**
 * useLocation Hook
 * Shared logic for location handling
 */

import { useState } from 'react'
import { Location } from '../types/shared'
import { APP_CONFIG } from '../constants/config'
import { ValidationService } from '../utils/validation'

export function useLocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Geocode text to location
  async function geocode(query: string): Promise<Location | null> {
    setLoading(true)
    setError(null)

    try {
      // Validation
      const sanitized = ValidationService.sanitizeText(query)
      if (!sanitized) {
        throw new Error('Ungültige Eingabe')
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/location/geocode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: sanitized }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Geocoding fehlgeschlagen')
      }

      const location: Location = await response.json()

      // Validate response
      if (!ValidationService.isValidLocation(location)) {
        throw new Error('Ungültige Antwort vom Server')
      }

      setLoading(false)
      return location
    } catch (err: any) {
      console.error('Geocoding error:', err)
      setError(err.message)
      setLoading(false)
      return null
    }
  }

  // Reverse geocode coordinates to location
  async function reverseGeocode(lat: number, lon: number): Promise<Location | null> {
    setLoading(true)
    setError(null)

    try {
      // Validation
      if (!ValidationService.isValidCoordinates(lat, lon)) {
        throw new Error('Ungültige Koordinaten')
      }

      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/location/reverse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Reverse Geocoding fehlgeschlagen')
      }

      const location: Location = await response.json()

      setLoading(false)
      return location
    } catch (err: any) {
      console.error('Reverse geocoding error:', err)
      setError(err.message)
      setLoading(false)
      return null
    }
  }

  // Get current position using browser geolocation
  async function getCurrentLocation(): Promise<Location | null> {
    if (!navigator.geolocation) {
      setError('Geolocation wird nicht unterstützt')
      return null
    }

    setLoading(true)
    setError(null)

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const location = await reverseGeocode(latitude, longitude)
          resolve(location)
        },
        (err) => {
          setError('Standort konnte nicht ermittelt werden')
          setLoading(false)
          resolve(null)
        }
      )
    })
  }

  return {
    geocode,
    reverseGeocode,
    getCurrentLocation,
    loading,
    error,
  }
}

export default useLocation
