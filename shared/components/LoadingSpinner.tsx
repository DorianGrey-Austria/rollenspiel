/**
 * Loading Spinner Component
 * Variant-specific loading states
 */

interface LoadingSpinnerProps {
  variant?: 'medieval' | 'gamer' | 'museum'
  message?: string
}

export function LoadingSpinner({ variant = 'medieval', message }: LoadingSpinnerProps) {
  if (variant === 'medieval') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="wax-seal animate-pulse"></div>
        <p className="font-heading text-xl text-burgundy">
          {message || 'Die Chronik wird verfasst...'}
        </p>
        <p className="font-body italic text-ink-medium text-sm">
          Habt Geduld, werter Leser
        </p>
      </div>
    )
  }

  if (variant === 'gamer') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-20 h-20 border-4 border-neon-purple border-t-transparent rounded-full animate-spin"></div>
        <p className="font-heading text-2xl text-neon-purple animate-pulse">
          {message || 'LOADING QUEST...'}
        </p>
        <p className="font-mono text-sm text-gray-400">
          Generating story... Please wait
        </p>
      </div>
    )
  }

  // Museum variant
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="w-16 h-16 border-4 border-museum-navy border-t-transparent rounded-full animate-spin"></div>
      <p className="font-heading text-xl text-museum-navy">
        {message || 'Historischer Kontext wird geladen...'}
      </p>
      <p className="font-body text-sm text-museum-gray">
        Bitte haben Sie einen Moment Geduld
      </p>
    </div>
  )
}

export default LoadingSpinner
