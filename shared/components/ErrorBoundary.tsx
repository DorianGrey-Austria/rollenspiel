/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  variant?: 'medieval' | 'gamer' | 'museum'
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo)

    // TODO: Send to error tracking service (e.g., Sentry)
    // trackError(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI (variant-specific)
      return this.renderDefaultFallback()
    }

    return this.props.children
  }

  renderDefaultFallback() {
    const { variant = 'medieval' } = this.props
    const { error } = this.state

    if (variant === 'medieval') {
      return (
        <div className="min-h-screen parchment-bg flex items-center justify-center p-4">
          <div className="max-w-2xl w-full parchment-bg ornate-border p-8 text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-heading text-burgundy mb-4">
              Ein Fehler ist aufgetreten
            </h1>
            <p className="font-body text-ink-dark mb-6">
              Die Chronik konnte nicht geladen werden. Bitte versucht es erneut.
            </p>
            {error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer font-body text-sm text-ink-medium">
                  Technische Details
                </summary>
                <pre className="mt-2 p-4 bg-parchment-dark text-xs overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-burgundy text-parchment font-heading hover:bg-opacity-90"
            >
              Neu beginnen
            </button>
          </div>
        </div>
      )
    }

    if (variant === 'gamer') {
      return (
        <div className="min-h-screen bg-dark-bg scanlines flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-dark-card neon-border-purple p-8 text-center">
            <div className="text-6xl mb-6">💥</div>
            <h1 className="text-3xl font-heading text-neon-purple mb-4">
              GAME OVER
            </h1>
            <p className="font-body text-white mb-6">
              Ein kritischer Fehler ist aufgetreten. Quest abgebrochen.
            </p>
            {error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer font-mono text-sm text-gray-400">
                  [ERROR LOG]
                </summary>
                <pre className="mt-2 p-4 bg-dark-bg text-xs overflow-auto text-red-400 font-mono">
                  {error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-neon-purple text-white font-heading hover:bg-opacity-80 btn-gaming"
            >
              RESPAWN
            </button>
          </div>
        </div>
      )
    }

    // Museum variant
    return (
      <div className="min-h-screen bg-museum-cream flex items-center justify-center p-4">
        <div className="max-w-2xl w-full museum-card p-8 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-3xl font-heading text-museum-navy mb-4">
            Technischer Fehler
          </h1>
          <p className="font-body text-museum-gray mb-6">
            Die Anwendung konnte nicht geladen werden. Bitte versuchen Sie es erneut.
          </p>
          {error && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer font-body text-sm text-museum-gray">
                Fehlerdetails anzeigen
              </summary>
              <pre className="mt-2 p-4 bg-museum-cream text-xs overflow-auto border border-museum-border">
                {error.message}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            className="btn-museum"
          >
            Neu starten
          </button>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
