import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

// NEON GAMER VARIANT: Fast-paced typewriter for gaming feel
export function TypewriterText({
  text,
  speed = 20, // Faster for gaming feel
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

  return (
    <div className="prose prose-lg max-w-none text-white">
      <p className="whitespace-pre-wrap font-body leading-relaxed text-lg">
        {displayedText}
        {currentIndex < text.length && (
          <span className="inline-block w-2 h-5 bg-neon-cyan animate-pulse ml-1">█</span>
        )}
      </p>
    </div>
  )
}
