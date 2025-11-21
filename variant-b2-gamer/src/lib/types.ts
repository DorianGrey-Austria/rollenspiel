// Type definitions for Neon Gamer variant

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
  xpGained?: number  // GAMING FEATURE: XP per scene
}

export interface PlayerStats {
  level: number
  xp: number
  xpToNextLevel: number
  totalScenes: number
  achievements: string[]
}
