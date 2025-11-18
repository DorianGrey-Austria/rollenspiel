import Anthropic from '@anthropic-ai/sdk'

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || 'dummy-key-for-development'

// AUTONOMOUS DECISION: Using dangerouslyAllowBrowser for prototype
// TODO: Move to backend for production
export const anthropic = new Anthropic({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
})
