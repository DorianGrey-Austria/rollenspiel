/**
 * Shared Configuration
 * Environment-aware config
 */

export const APP_CONFIG = {
  // API Endpoints
  API_BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://rollenspiel.vercel.app/api' // Update with actual domain
    : '/api',

  // Feature Flags
  DEMO_MODE_ENABLED: true,
  ANALYTICS_ENABLED: process.env.NODE_ENV === 'production',
  PWA_ENABLED: true,

  // Rate Limiting (client-side tracking)
  MAX_STORIES_PER_SESSION: 50,
  STORY_GENERATION_TIMEOUT: 30000, // 30 seconds

  // Storage Keys
  STORAGE_KEYS: {
    STORY_HISTORY: 'rpg_story_history',
    PLAYER_STATS: 'rpg_player_stats',
    SETTINGS: 'rpg_settings',
    DEMO_MODE: 'rpg_demo_mode',
  },

  // Typewriter Speeds (ms per character)
  TYPEWRITER_SPEEDS: {
    medieval: 40,
    gamer: 20,
    museum: 30,
  },

  // XP System (Gamer variant)
  XP_CONFIG: {
    BASE_XP: 50,
    XP_PER_SCENE: 10,
    LEVEL_UP_MULTIPLIER: 1.5,
    INITIAL_XP_TO_NEXT: 100,
  },
}

export default APP_CONFIG
