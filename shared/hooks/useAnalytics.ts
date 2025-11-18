/**
 * useAnalytics Hook
 * Simple event tracking (privacy-friendly)
 */

import { useCallback } from 'react'
import { APP_CONFIG } from '../constants/config'

export type AnalyticsEvent =
  | 'age_mode_selected'
  | 'location_entered'
  | 'story_generated'
  | 'choice_made'
  | 'demo_mode_enabled'
  | 'story_exported'
  | 'error_occurred'

interface AnalyticsProperties {
  [key: string]: string | number | boolean
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent, properties?: AnalyticsProperties) => {
    if (!APP_CONFIG.ANALYTICS_ENABLED) {
      // In dev mode, just log
      console.log('[Analytics]', event, properties)
      return
    }

    // TODO: Implement actual analytics
    // Options:
    // - Plausible Analytics (privacy-friendly)
    // - Simple custom endpoint
    // - PostHog
    // - etc.

    // For now, just console log
    console.log('[Analytics]', event, properties)

    // Example implementation:
    // fetch('/api/analytics/track', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event, properties, timestamp: Date.now() }),
    // })
  }, [])

  return { trackEvent }
}

export default useAnalytics
