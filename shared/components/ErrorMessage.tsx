/**
 * Error Message Component
 * Variant-specific error displays
 */

interface ErrorMessageProps {
  variant?: 'medieval' | 'gamer' | 'museum'
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ variant = 'medieval', message, onRetry }: ErrorMessageProps) {
  if (variant === 'medieval') {
    return (
      <div className="p-6 bg-burgundy bg-opacity-10 border-2 border-burgundy">
        <div className="flex items-start gap-4">
          <span className="text-3xl">⚠️</span>
          <div className="flex-1">
            <h3 className="font-heading text-lg text-burgundy mb-2">
              Ein Fehler ist aufgetreten
            </h3>
            <p className="font-body text-ink-dark mb-4">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-burgundy text-parchment font-body hover:bg-opacity-90 transition-all"
              >
                Erneut versuchen
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'gamer') {
    return (
      <div className="p-6 bg-red-900 bg-opacity-30 border-2 border-red-500">
        <div className="flex items-start gap-4">
          <span className="text-3xl">❌</span>
          <div className="flex-1">
            <h3 className="font-heading text-lg text-red-400 mb-2">
              ERROR DETECTED
            </h3>
            <p className="font-mono text-white mb-4">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 text-white font-mono hover:bg-red-700 transition-all btn-gaming"
              >
                [RETRY]
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Museum variant
  return (
    <div className="p-6 bg-red-50 border-l-4 border-red-500">
      <div className="flex items-start gap-4">
        <span className="text-3xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-heading text-lg text-red-700 mb-2">
            Fehler aufgetreten
          </h3>
          <p className="font-body text-red-800 mb-4">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white font-body hover:bg-red-700 transition-all"
            >
              Erneut versuchen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
