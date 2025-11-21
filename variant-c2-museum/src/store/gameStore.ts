import { create } from 'zustand'
import { AgeMode, Location, StoryMessage } from '../lib/types'

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

  // Reset
  reset: () => void
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  ageMode: null,
  location: null,
  storyHistory: [],
  currentStory: null,
  isGenerating: false,
  factsLearned: [],

  // Actions
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
    set((state) => ({
      factsLearned: [...state.factsLearned, fact],
    })),

  reset: () =>
    set({
      ageMode: null,
      location: null,
      storyHistory: [],
      currentStory: null,
      isGenerating: false,
      factsLearned: [],
    }),
}))
