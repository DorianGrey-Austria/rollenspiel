/**
 * Input Validation Utilities
 */

import { AgeMode, Variant, Location } from '../types/shared'

export class ValidationService {
  // Validate age mode
  static isValidAgeMode(mode: any): mode is AgeMode {
    return ['kids', 'teen', 'adult'].includes(mode)
  }

  // Validate variant
  static isValidVariant(variant: any): variant is Variant {
    return ['medieval', 'gamer', 'museum'].includes(variant)
  }

  // Validate location
  static isValidLocation(location: any): location is Location {
    return (
      location &&
      typeof location.name === 'string' &&
      location.name.length > 0 &&
      (location.lat === undefined || typeof location.lat === 'number') &&
      (location.lon === undefined || typeof location.lon === 'number')
    )
  }

  // Sanitize text input
  static sanitizeText(text: string): string {
    return text
      .trim()
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .substring(0, 1000) // Max length
  }

  // Validate coordinates
  static isValidCoordinates(lat: number, lon: number): boolean {
    return (
      lat >= -90 &&
      lat <= 90 &&
      lon >= -180 &&
      lon <= 180
    )
  }
}

export default ValidationService
