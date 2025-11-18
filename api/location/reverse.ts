/**
 * Serverless Function: Reverse Geocoding
 * POST /api/location/reverse
 *
 * Reverse geocodes coordinates to location name using Nominatim
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ReverseGeocodeRequest {
  lat: number
  lon: number
  language?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { lat, lon, language = 'de' }: ReverseGeocodeRequest = req.body

    if (lat === undefined || lon === undefined) {
      return res.status(400).json({ error: 'Latitude and longitude required' })
    }

    // Call Nominatim
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${language}`,
      {
        headers: {
          'User-Agent': 'rollenspiel.ai/1.0',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Reverse geocoding service unavailable')
    }

    const data = await response.json()

    const location = {
      name: data.display_name,
      lat,
      lon,
    }

    return res.status(200).json(location)

  } catch (error: any) {
    console.error('Reverse geocoding error:', error)
    return res.status(500).json({
      error: 'Reverse geocoding failed',
      message: error.message
    })
  }
}
