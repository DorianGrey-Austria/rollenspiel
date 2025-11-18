/**
 * Shared TypeScript Types
 * Used across all variants
 */

export type AgeMode = 'kids' | 'teen' | 'adult'
export type Variant = 'medieval' | 'gamer' | 'museum'

export interface Location {
  name: string
  lat?: number
  lon?: number
}

export interface StoryMessage {
  id: string
  text: string
  choices: string[]
  timestamp: number
  xpGained?: number // Gamer variant
  historicalFact?: string // Museum variant
}

export interface APIError {
  error: string
  message?: string
}

export interface StoryGenerationRequest {
  location: Location
  ageMode: AgeMode
  variant: Variant
  previousChoice?: string
  storyHistory?: string[]
}

export interface GeocodeRequest {
  query: string
  language?: string
}

export interface ReverseGeocodeRequest {
  lat: number
  lon: number
  language?: string
}
