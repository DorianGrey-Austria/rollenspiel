/**
 * useStoryGeneration Hook
 * Shared logic for story generation across all variants
 */

import { useState, useCallback } from 'react'
import { AgeMode, Variant, Location, StoryMessage } from '../types/shared'
import { APP_CONFIG } from '../constants/config'
import { getMockStory } from '../constants/mockData'
import { StorageService } from '../utils/storage'
import { FormattingService } from '../utils/formatting'

interface UseStoryGenerationProps {
  variant: Variant
  location: Location
  ageMode: AgeMode
  onStoryComplete: (story: StoryMessage) => void
  useDemoMode?: boolean
}

export function useStoryGeneration({
  variant,
  location,
  ageMode,
  onStoryComplete,
  useDemoMode = false,
}: UseStoryGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const generateStory = useCallback(
    async (previousChoice?: string, storyHistory?: string[]) => {
      setIsGenerating(true)
      setCurrentText('')
      setError(null)

      try {
        // Demo mode: Use mock data
        if (useDemoMode || StorageService.isDemoMode()) {
          await generateMockStory(storyHistory?.length || 0)
          return
        }

        // Real mode: Call API
        await generateRealStory(previousChoice, storyHistory)
      } catch (err: any) {
        console.error('Story generation error:', err)
        setError(err.message || 'Fehler bei der Story-Generierung')
        setIsGenerating(false)
      }
    },
    [variant, location, ageMode, onStoryComplete, useDemoMode]
  )

  // Mock story generation (for demo)
  async function generateMockStory(sceneNumber: number) {
    const mockStory = getMockStory(variant, ageMode, sceneNumber)

    // Simulate streaming
    let accumulated = ''
    for (let i = 0; i < mockStory.text.length; i++) {
      accumulated += mockStory.text[i]
      setCurrentText(accumulated)
      await new Promise((resolve) => setTimeout(resolve, 20))
    }

    const storyMessage: StoryMessage = {
      id: Date.now().toString(),
      text: mockStory.text,
      choices: mockStory.choices,
      timestamp: Date.now(),
    }

    onStoryComplete(storyMessage)
    setIsGenerating(false)
  }

  // Real story generation (API call)
  async function generateRealStory(previousChoice?: string, storyHistory?: string[]) {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}/story/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
        ageMode,
        variant,
        previousChoice,
        storyHistory,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'API Error')
    }

    // Handle SSE (Server-Sent Events) streaming
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    if (!reader) {
      throw new Error('Response body is null')
    }

    let accumulated = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.substring(6)

          if (data === '[DONE]') {
            // Parsing choices
            const choices = FormattingService.extractChoices(accumulated)

            const storyMessage: StoryMessage = {
              id: Date.now().toString(),
              text: accumulated,
              choices,
              timestamp: Date.now(),
            }

            onStoryComplete(storyMessage)
            setIsGenerating(false)
            return
          }

          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              accumulated += parsed.text
              setCurrentText(accumulated)
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }
  }

  return {
    generateStory,
    isGenerating,
    currentText,
    error,
  }
}

export default useStoryGeneration
