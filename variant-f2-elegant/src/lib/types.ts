// Type definitions for Museum Guide variant

export type AgeMode = 'kids' | 'teen' | 'adult'

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
  historicalFact?: string  // EDUCATIONAL FEATURE
}

export interface HistoricalContext {
  period?: string
  significance?: string
  relatedFigures?: string[]
}
