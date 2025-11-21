import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

// MEDIEVAL SCHOLAR VARIANT: Slower, more deliberate text reveal
export function TypewriterText({
  text,
  speed = 40, // Slower for medieval feel
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length && onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  // AUTONOMOUS DECISION: Extract first letter for gothic initial
  const firstChar = displayedText.charAt(0)
  const restText = displayedText.slice(1)

  return (
    <div className="prose prose-lg max-w-none text-ink-dark">
      <p className="whitespace-pre-wrap font-body leading-relaxed text-lg">
        {firstChar && <span className="gothic-initial">{firstChar}</span>}
        {restText}
        {currentIndex < text.length && (
          <span className="inline-block w-2 h-5 bg-burgundy animate-pulse ml-1">│</span>
        )}
      </p>
    </div>
  )
}
