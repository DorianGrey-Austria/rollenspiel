// Type definitions for Medieval Scholar variant

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
}

export interface HistoricalFact {
  title: string
  description: string
  year?: string
}
