import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AgeMode, Location, StoryMessage } from '../lib/types'
import type { Achievement } from '../components/premium/AchievementBadge'
import type { TimelineEvent } from '../components/premium/TimelineView'
import type { HistoricalCharacter } from '../components/premium/CharacterCard'

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

  // Educational tracking
  factsLearned: string[]
  addFact: (fact: string) => void

  // Progress & Gamification
  totalPoints: number
  storiesCompleted: number
  locationsVisited: Set<string>
  currentStreak: number
  lastPlayDate: string | null
  addPoints: (points: number) => void
  incrementStoriesCompleted: () => void
  visitLocation: (locationName: string) => void
  updateStreak: () => void

  // Achievements
  achievements: Achievement[]
  unlockAchievement: (achievementId: string) => void
  updateAchievementProgress: (achievementId: string, progress: number) => void

  // Timeline
  timeline: TimelineEvent[]
  addTimelineEvent: (event: TimelineEvent) => void

  // Characters
  discoveredCharacters: HistoricalCharacter[]
  addCharacter: (character: HistoricalCharacter) => void

  // Reset
  reset: () => void
}

// Initial Achievements
const initialAchievements: Achievement[] = [
  {
    id: 'first_story',
    title: 'Erste Schritte',
    description: 'Erlebe deine erste Geschichte',
    icon: '🌟',
    earned: false,
  },
  {
    id: 'explorer_5',
    title: 'Entdecker',
    description: 'Besuche 5 verschiedene Orte',
    icon: '🗺️',
    earned: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'scholar',
    title: 'Gelehrter',
    description: 'Lerne 10 historische Fakten',
    icon: '📚',
    earned: false,
    progress: 0,
    maxProgress: 10,
  },
  {
    id: 'time_master',
    title: 'Zeitmeister',
    description: 'Erreiche Level 5',
    icon: '⏰',
    earned: false,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: 'streak_7',
    title: 'Beständigkeit',
    description: '7 Tage in Folge spielen',
    icon: '🔥',
    earned: false,
    progress: 0,
    maxProgress: 7,
  },
  {
    id: 'story_master',
    title: 'Geschichtenmeister',
    description: 'Schließe 20 Geschichten ab',
    icon: '📖',
    earned: false,
    progress: 0,
    maxProgress: 20,
  },
]

export const useGameStore = create<GameState>(
  persist(
    (set, get) => ({
      // Initial state
      ageMode: null,
      location: null,
      storyHistory: [],
      currentStory: null,
      isGenerating: false,
      factsLearned: [],
      totalPoints: 0,
      storiesCompleted: 0,
      locationsVisited: new Set(),
      currentStreak: 0,
      lastPlayDate: null,
      achievements: initialAchievements,
      timeline: [],
      discoveredCharacters: [],

      // Basic Actions
      setAgeMode: (mode) => set({ ageMode: mode }),
      setLocation: (location) => set({ location }),

      addStoryMessage: (message) =>
        set((state) => ({
          storyHistory: [...state.storyHistory, message],
          currentStory: message,
        })),

      setCurrentStory: (message) => set({ currentStory: message }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),

      addFact: (fact) =>
        set((state) => {
          const newFacts = [...state.factsLearned, fact]
          // Update scholar achievement
          const achievements = state.achievements.map((a) =>
            a.id === 'scholar'
              ? { ...a, progress: newFacts.length, earned: newFacts.length >= 10 }
              : a
          )
          return { factsLearned: newFacts, achievements }
        }),

      // Gamification Actions
      addPoints: (points) =>
        set((state) => {
          const newTotal = state.totalPoints + points
          const newLevel = Math.floor(newTotal / 100) + 1
          const achievements = state.achievements.map((a) =>
            a.id === 'time_master'
              ? { ...a, progress: newLevel, earned: newLevel >= 5 }
              : a
          )
          return { totalPoints: newTotal, achievements }
        }),

      incrementStoriesCompleted: () =>
        set((state) => {
          const newCount = state.storiesCompleted + 1
          const achievements = state.achievements.map((a) => {
            if (a.id === 'first_story' && newCount >= 1) {
              return { ...a, earned: true }
            }
            if (a.id === 'story_master') {
              return { ...a, progress: newCount, earned: newCount >= 20 }
            }
            return a
          })
          return { storiesCompleted: newCount, achievements }
        }),

      visitLocation: (locationName) =>
        set((state) => {
          const newLocations = new Set(state.locationsVisited)
          newLocations.add(locationName)
          const achievements = state.achievements.map((a) =>
            a.id === 'explorer_5'
              ? {
                  ...a,
                  progress: newLocations.size,
                  earned: newLocations.size >= 5,
                }
              : a
          )
          return { locationsVisited: newLocations, achievements }
        }),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toDateString()
          const lastDate = state.lastPlayDate
          let newStreak = state.currentStreak

          if (!lastDate || lastDate !== today) {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayStr = yesterday.toDateString()

            if (lastDate === yesterdayStr) {
              newStreak++
            } else if (!lastDate) {
              newStreak = 1
            } else {
              newStreak = 1
            }

            const achievements = state.achievements.map((a) =>
              a.id === 'streak_7'
                ? { ...a, progress: newStreak, earned: newStreak >= 7 }
                : a
            )

            return {
              currentStreak: newStreak,
              lastPlayDate: today,
              achievements,
            }
          }
          return state
        }),

      // Achievement Actions
      unlockAchievement: (achievementId) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId ? { ...a, earned: true } : a
          ),
        })),

      updateAchievementProgress: (achievementId, progress) =>
        set((state) => ({
          achievements: state.achievements.map((a) =>
            a.id === achievementId
              ? { ...a, progress, earned: a.maxProgress ? progress >= a.maxProgress : a.earned }
              : a
          ),
        })),

      // Timeline Actions
      addTimelineEvent: (event) =>
        set((state) => ({
          timeline: [...state.timeline, event],
        })),

      // Character Actions
      addCharacter: (character) =>
        set((state) => {
          // Check if character already exists
          if (state.discoveredCharacters.some((c) => c.id === character.id)) {
            return state
          }
          return {
            discoveredCharacters: [...state.discoveredCharacters, character],
          }
        }),

      reset: () =>
        set({
          ageMode: null,
          location: null,
          storyHistory: [],
          currentStory: null,
          isGenerating: false,
          factsLearned: [],
          totalPoints: 0,
          storiesCompleted: 0,
          locationsVisited: new Set(),
          currentStreak: 0,
          lastPlayDate: null,
          achievements: initialAchievements,
          timeline: [],
          discoveredCharacters: [],
        }),
    }),
    {
      name: 'explorer-game-storage',
      partialize: (state) => ({
        totalPoints: state.totalPoints,
        storiesCompleted: state.storiesCompleted,
        locationsVisited: Array.from(state.locationsVisited),
        currentStreak: state.currentStreak,
        lastPlayDate: state.lastPlayDate,
        achievements: state.achievements,
        factsLearned: state.factsLearned,
        timeline: state.timeline,
        discoveredCharacters: state.discoveredCharacters,
      }),
    }
  )
)
