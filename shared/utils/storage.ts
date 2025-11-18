/**
 * LocalStorage Utilities
 * Safe storage helpers with error handling
 */

import { APP_CONFIG } from '../constants/config'
import { StoryMessage } from '../types/shared'

export class StorageService {
  // Generic get/set with type safety
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key)
      if (!item) return defaultValue
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Storage get error for key ${key}:`, error)
      return defaultValue
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Storage set error for key ${key}:`, error)
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Storage remove error for key ${key}:`, error)
    }
  }

  static clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }

  // Story-specific helpers
  static saveStoryHistory(stories: StoryMessage[]): void {
    this.set(APP_CONFIG.STORAGE_KEYS.STORY_HISTORY, stories)
  }

  static getStoryHistory(): StoryMessage[] {
    return this.get<StoryMessage[]>(APP_CONFIG.STORAGE_KEYS.STORY_HISTORY, [])
  }

  static clearStoryHistory(): void {
    this.remove(APP_CONFIG.STORAGE_KEYS.STORY_HISTORY)
  }

  // Player stats (for gamer variant)
  static savePlayerStats(stats: any): void {
    this.set(APP_CONFIG.STORAGE_KEYS.PLAYER_STATS, stats)
  }

  static getPlayerStats(): any {
    return this.get(APP_CONFIG.STORAGE_KEYS.PLAYER_STATS, null)
  }

  // Settings
  static saveSettings(settings: any): void {
    this.set(APP_CONFIG.STORAGE_KEYS.SETTINGS, settings)
  }

  static getSettings(): any {
    return this.get(APP_CONFIG.STORAGE_KEYS.SETTINGS, {})
  }

  // Demo mode flag
  static setDemoMode(enabled: boolean): void {
    this.set(APP_CONFIG.STORAGE_KEYS.DEMO_MODE, enabled)
  }

  static isDemoMode(): boolean {
    return this.get(APP_CONFIG.STORAGE_KEYS.DEMO_MODE, false)
  }
}

export default StorageService
