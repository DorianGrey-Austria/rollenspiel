import { create } from 'zustand'
import { AgeMode, Location, StoryMessage, PlayerStats } from '../lib/types'

interface GameState {
  // Age Mode
  ageMode: AgeMode | null
  setAgeMode: (mode: AgeMode) => void

  // Location
  location: Location | null
  setLocation: (location: Location) => void

  // Story
  storyHistory: StoryMessage[]
  currentStory: StoryMessage | null
  isGenerating: boolean
  addStoryMessage: (message: StoryMessage) => void
  setCurrentStory: (message: StoryMessage | null) => void
  setIsGenerating: (generating: boolean) => void

  // GAMING FEATURES: Player Stats
  playerStats: PlayerStats
  addXP: (amount: number) => void
  levelUp: () => void
  unlockAchievement: (achievement: string) => void

  // Reset
  reset: () => void
}

const INITIAL_STATS: PlayerStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalScenes: 0,
  achievements: [],
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  ageMode: null,
  location: null,
  storyHistory: [],
  currentStory: null,
  isGenerating: false,
  playerStats: INITIAL_STATS,

  // Actions
  setAgeMode: (mode) => set({ ageMode: mode }),
  setLocation: (location) => set({ location }),

  addStoryMessage: (message) => {
    set((state) => ({
      storyHistory: [...state.storyHistory, message],
      currentStory: message,
      playerStats: {
        ...state.playerStats,
        totalScenes: state.playerStats.totalScenes + 1,
      },
    }))

    // Add XP for completing scene
    if (message.xpGained) {
      get().addXP(message.xpGained)
    }
  },

  setCurrentStory: (message) => set({ currentStory: message }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),

  // GAMING FEATURE: XP System
  addXP: (amount) => {
    set((state) => {
      const newXP = state.playerStats.xp + amount
      const { xpToNextLevel, level } = state.playerStats

      // Check for level up
      if (newXP >= xpToNextLevel) {
        const overflow = newXP - xpToNextLevel
        const newLevel = level + 1
        const newXPToNext = Math.floor(xpToNextLevel * 1.5)

        return {
          playerStats: {
            ...state.playerStats,
            level: newLevel,
            xp: overflow,
            xpToNextLevel: newXPToNext,
          },
        }
      }

      return {
        playerStats: {
          ...state.playerStats,
          xp: newXP,
        },
      }
    })
  },

  levelUp: () => {
    set((state) => ({
      playerStats: {
        ...state.playerStats,
        level: state.playerStats.level + 1,
        xpToNextLevel: Math.floor(state.playerStats.xpToNextLevel * 1.5),
      },
    }))
  },

  unlockAchievement: (achievement) => {
    set((state) => {
      if (state.playerStats.achievements.includes(achievement)) {
        return state
      }
      return {
        playerStats: {
          ...state.playerStats,
          achievements: [...state.playerStats.achievements, achievement],
        },
      }
    })
  },

  reset: () =>
    set({
      ageMode: null,
      location: null,
      storyHistory: [],
      currentStory: null,
      isGenerating: false,
      playerStats: INITIAL_STATS,
    }),
}))
