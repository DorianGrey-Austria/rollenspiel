/**
 * Serverless Function: Geocoding
 * POST /api/location/geocode
 *
 * Geocodes location names to coordinates using Nominatim
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

interface GeocodeRequest {
  query: string
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
    const { query, language = 'de' }: GeocodeRequest = req.body

    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' })
    }

    // Call Nominatim
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&accept-language=${language}`,
      {
        headers: {
          'User-Agent': 'rollenspiel.ai/1.0',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Geocoding service unavailable')
    }

    const data = await response.json()

    if (data.length === 0) {
      return res.status(404).json({ error: 'Location not found' })
    }

    const location = {
      name: data[0].display_name,
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    }

    return res.status(200).json(location)

  } catch (error: any) {
    console.error('Geocoding error:', error)
    return res.status(500).json({
      error: 'Geocoding failed',
      message: error.message
    })
  }
}
