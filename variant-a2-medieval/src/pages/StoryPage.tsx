import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { useNavigate } from 'react-router-dom'
import { TypewriterText } from '../components/story/TypewriterText'
import { generateStory, parseChoicesFromStory } from '../lib/storyGenerator'

// MEDIEVAL SCHOLAR VARIANT: Ornate story presentation
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

      // Save to history
      addStoryMessage({
        id: Date.now().toString(),
        text: accumulated,
        choices: extractedChoices,
        timestamp: Date.now(),
      })
    } catch (error) {
      console.error('Story generation failed:', error)
      setCurrentText('❌ Ein Fehler ereignete sich beim Verfassen der Chronik. Bitte versucht es erneut.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleChoice = (choice: string) => {
    handleGenerateStory(choice)
  }

  const handleReset = () => {
    if (confirm('Wollt Ihr die Chronik von neuem beginnen?')) {
      reset()
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen parchment-bg p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header with location */}
        <div className="mb-8">
          <div className="parchment-bg ornate-border p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">📍</span>
                  <h2 className="text-2xl font-heading text-burgundy">
                    {location?.name}
                  </h2>
                </div>
                <p className="font-body text-ink-medium text-sm">
                  Kapitel {storyHistory.length + 1} der Chronik
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-forest text-parchment font-body text-sm hover:bg-opacity-90"
              >
                Neubeginn
              </button>
            </div>
          </div>
        </div>

        {/* Story Display - Main parchment */}
        <div className="mb-8">
          <div className="parchment-bg ornate-border p-8 min-h-[400px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="wax-seal animate-pulse"></div>
                <p className="font-heading text-xl text-burgundy">
                  Die Chronik wird verfasst...
                </p>
                <p className="font-body italic text-ink-medium">
                  Habt Geduld, werter Leser
                </p>
              </div>
            ) : currentText ? (
              <TypewriterText
                text={currentText}
                speed={40}
                onComplete={() => setShowChoices(true)}
              />
            ) : (
              <div className="flex items-center justify-center py-16">
                <p className="font-body text-lg text-ink-medium italic">
                  Die Chronik beginnet...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Choices */}
        {showChoices && choices.length > 0 && !isGenerating && (
          <div className="mb-8">
            <div className="parchment-bg ornate-border p-8">
              <h3 className="text-xl font-heading text-burgundy mb-6 text-center">
                ⚜ Was möchtet Ihr nun tun? ⚜
              </h3>
              <div className="space-y-4">
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full p-6 bg-burgundy bg-opacity-10 border-2 border-burgundy hover:bg-opacity-20 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-heading text-burgundy group-hover:scale-110 transition-transform">
                        {['I', 'II', 'III'][index]}
                      </span>
                      <p className="font-body text-lg text-ink-dark flex-1">
                        {choice}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Story History Timeline */}
        {storyHistory.length > 1 && (
          <div className="mt-12">
            <div className="parchment-bg border-2 border-ink-medium p-6">
              <h3 className="text-lg font-heading text-burgundy mb-4 flex items-center gap-2">
                📜 Bisherige Chronik ({storyHistory.length} Kapitel)
              </h3>
              <div className="space-y-2">
                {storyHistory.map((story, index) => (
                  <div
                    key={story.id}
                    className="flex items-center gap-3 text-sm font-body text-ink-medium hover:text-burgundy cursor-pointer"
                  >
                    <span className="font-heading">Kapitel {index + 1}</span>
                    <span className="flex-1 border-b border-dotted border-ink-medium"></span>
                    <span className="text-xs">
                      {new Date(story.timestamp).toLocaleTimeString('de-DE')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer ornament */}
        <div className="text-center mt-12 text-ink-medium font-body italic text-sm">
          <p>⚜ Verfasst mit der Feder des Chronisten ⚜</p>
        </div>
      </div>
    </div>
  )
}
