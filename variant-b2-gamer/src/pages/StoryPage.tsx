import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { useNavigate } from 'react-router-dom'
import { TypewriterText } from '../components/story/TypewriterText'
import { XPBar } from '../components/story/XPBar'
import { generateStory, parseChoicesFromStory, calculateXPForScene } from '../lib/storyGenerator'

// NEON GAMER VARIANT: Gaming-style story page
export function StoryPage() {
  const { location, ageMode, storyHistory, addStoryMessage, isGenerating, setIsGenerating, reset } =
    useGameStore()
  const navigate = useNavigate()

  const [currentText, setCurrentText] = useState('')
  const [fullText, setFullText] = useState('')
  const [choices, setChoices] = useState<string[]>([])
  const [showChoices, setShowChoices] = useState(false)

  // Redirect if missing required data
  useEffect(() => {
    if (!location || !ageMode) {
      navigate('/')
    }
  }, [location, ageMode, navigate])

  // Generate initial story on mount
  useEffect(() => {
    if (location && ageMode && storyHistory.length === 0) {
      handleGenerateStory()
    }
  }, [])

  const handleGenerateStory = async (previousChoice?: string) => {
    if (!location || !ageMode) return

    setIsGenerating(true)
    setShowChoices(false)
    setCurrentText('')
    setFullText('')

    try {
      let accumulated = ''

      for await (const chunk of generateStory({
        location,
        ageMode,
        previousChoice,
        storyHistory: storyHistory.map((m) => m.text),
      })) {
        accumulated += chunk
        setCurrentText(accumulated)
      }

      setFullText(accumulated)

      // Parse choices
      const extractedChoices = parseChoicesFromStory(accumulated)
      setChoices(extractedChoices)

      // Calculate XP
      const xpGained = calculateXPForScene(storyHistory.length + 1)

      // Save to history
      addStoryMessage({
        id: Date.now().toString(),
        text: accumulated,
        choices: extractedChoices,
        timestamp: Date.now(),
        xpGained,
      })
    } catch (error) {
      console.error('Story generation failed:', error)
      setCurrentText('❌ ERROR: Story generation failed. Retry quest?')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleChoice = (choice: string) => {
    handleGenerateStory(choice)
  }

  const handleReset = () => {
    if (confirm('Reset progress and start new game?')) {
      reset()
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg scanlines p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* XP Bar - Always visible */}
        <div className="mb-6">
          <XPBar />
        </div>

        {/* Location Header */}
        <div className="mb-6">
          <div className="bg-dark-card neon-border-purple p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📍</span>
                  <h2 className="text-2xl font-heading text-neon-purple">
                    {location?.name}
                  </h2>
                </div>
                <p className="font-mono text-sm text-neon-cyan">
                  &gt; QUEST_{storyHistory.length + 1:02d} ACTIVE
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white font-mono text-sm hover:bg-red-700 transition-all"
              >
                [EXIT]
              </button>
            </div>
          </div>
        </div>

        {/* Story Display */}
        <div className="mb-6">
          <div className="bg-dark-card neon-border-cyan p-8 min-h-[400px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="w-20 h-20 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
                <p className="font-heading text-2xl text-neon-purple animate-pulse">
                  LOADING QUEST...
                </p>
                <p className="font-mono text-sm text-gray-400">
                  Generating story... Please wait
                </p>
              </div>
            ) : currentText ? (
              <TypewriterText
                text={currentText}
                speed={20}
                onComplete={() => setShowChoices(true)}
              />
            ) : (
              <div className="flex items-center justify-center py-16">
                <p className="font-mono text-lg text-gray-400 animate-pulse">
                  &gt; Initializing quest...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Choices */}
        {showChoices && choices.length > 0 && !isGenerating && (
          <div className="mb-6">
            <div className="bg-dark-card neon-border-pink p-8">
              <h3 className="text-2xl font-heading text-neon-pink mb-6 text-center">
                ⚔️ YOUR MOVE ⚔️
              </h3>
              <div className="space-y-4">
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full p-6 bg-dark-bg neon-border-cyan hover:bg-opacity-80 transition-all text-left group btn-gaming"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-mono text-neon-cyan group-hover:scale-110 transition-transform">
                        [{index + 1}]
                      </span>
                      <p className="font-body text-lg text-white flex-1">
                        {choice}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quest Log */}
        {storyHistory.length > 1 && (
          <div className="mt-12">
            <div className="bg-dark-card border-2 border-dark-border p-6">
              <h3 className="text-lg font-mono text-neon-green mb-4 flex items-center gap-2">
                📜 QUEST_LOG [{storyHistory.length} COMPLETED]
              </h3>
              <div className="space-y-2">
                {storyHistory.map((story, index) => (
                  <div
                    key={story.id}
                    className="flex items-center gap-3 text-sm font-mono text-gray-400 hover:text-neon-cyan cursor-pointer transition-colors"
                  >
                    <span className="text-neon-green">▶</span>
                    <span>QUEST_{index + 1:02d}</span>
                    <span className="flex-1 border-b border-dotted border-gray-600"></span>
                    <span className="text-neon-purple">
                      +{story.xpGained || 0} XP
                    </span>
                    <span className="text-xs">
                      {new Date(story.timestamp).toLocaleTimeString('de-DE')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 font-mono text-xs text-gray-600">
          <p className="animate-pulse">&gt;&gt; POWERED BY AI STORYTELLING &lt;&lt;</p>
        </div>
      </div>
    </div>
  )
}
