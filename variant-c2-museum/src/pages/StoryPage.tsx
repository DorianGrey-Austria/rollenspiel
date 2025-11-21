import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { useNavigate } from 'react-router-dom'
import { TypewriterText } from '../components/story/TypewriterText'
import { FactBox } from '../components/story/FactBox'
import { generateStory, parseChoicesFromStory, extractHistoricalFact } from '../lib/storyGenerator'

// MUSEUM GUIDE VARIANT: Professional, educational story page
export function StoryPage() {
  const { location, ageMode, storyHistory, addStoryMessage, isGenerating, setIsGenerating, reset, addFact, factsLearned } =
    useGameStore()
  const navigate = useNavigate()

  const [currentText, setCurrentText] = useState('')
  const [fullText, setFullText] = useState('')
  const [choices, setChoices] = useState<string[]>([])
  const [showChoices, setShowChoices] = useState(false)
  const [currentFact, setCurrentFact] = useState<string | undefined>()

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
    setCurrentFact(undefined)

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

      // Extract historical fact
      const fact = extractHistoricalFact(accumulated)
      if (fact) {
        setCurrentFact(fact)
        addFact(fact)
      }

      // Save to history
      addStoryMessage({
        id: Date.now().toString(),
        text: accumulated,
        choices: extractedChoices,
        timestamp: Date.now(),
        historicalFact: fact,
      })
    } catch (error) {
      console.error('Story generation failed:', error)
      setCurrentText('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleChoice = (choice: string) => {
    handleGenerateStory(choice)
  }

  const handleReset = () => {
    if (confirm('Möchten Sie die Erkundung neu beginnen?')) {
      reset()
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-museum-cream p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="museum-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-heading text-museum-navy mb-2">
                  {location?.name}
                </h2>
                <p className="font-body text-sm text-museum-gray">
                  Szene {storyHistory.length + 1} • {factsLearned.length} historische Fakten gelernt
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-museum-gray text-white font-body text-sm hover:bg-museum-blue transition-all"
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>

        {/* Story Display */}
        <div className="mb-6">
          <div className="learning-card min-h-[400px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="w-16 h-16 border-4 border-museum-navy border-t-transparent rounded-full animate-spin"></div>
                <p className="font-heading text-xl text-museum-navy">
                  Historischer Kontext wird geladen...
                </p>
                <p className="font-body text-sm text-museum-gray">
                  Bitte haben Sie einen Moment Geduld
                </p>
              </div>
            ) : currentText ? (
              <>
                <TypewriterText
                  text={currentText}
                  speed={30}
                  onComplete={() => setShowChoices(true)}
                />
                {currentFact && <FactBox fact={currentFact} />}
              </>
            ) : (
              <div className="flex items-center justify-center py-16">
                <p className="font-body text-lg text-museum-gray">
                  Die Erkundung beginnt...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Choices */}
        {showChoices && choices.length > 0 && !isGenerating && (
          <div className="mb-6">
            <div className="museum-card p-8">
              <h3 className="text-xl font-heading text-museum-navy mb-6">
                Ihre Handlungsoptionen
              </h3>
              <div className="space-y-4">
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="w-full p-6 bg-white border-2 border-museum-border hover:border-museum-gold hover:shadow-museum-lg transition-all text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="timeline-dot"></div>
                      </div>
                      <p className="font-body text-lg text-museum-navy flex-1">
                        {choice}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {storyHistory.length > 1 && (
          <div className="mt-12">
            <div className="museum-card p-6">
              <h3 className="text-lg font-heading text-museum-navy mb-4">
                Erkundungsverlauf
              </h3>
              <div className="space-y-3">
                {storyHistory.map((story, index) => (
                  <div
                    key={story.id}
                    className="flex items-center gap-3 text-sm font-body text-museum-gray hover:text-museum-navy cursor-pointer transition-colors"
                  >
                    <div className="timeline-dot flex-shrink-0"></div>
                    <span className="font-medium">Szene {index + 1}</span>
                    <span className="flex-1 border-b border-dotted border-museum-border"></span>
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
        <div className="text-center mt-12 text-xs text-museum-gray font-body">
          <p>Bildungsplattform für historische Erkundung • Powered by AI</p>
        </div>
      </div>
    </div>
  )
}
