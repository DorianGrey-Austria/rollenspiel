/**
 * Text Formatting Utilities
 */

export class FormattingService {
  // Format timestamp
  static formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Format date
  static formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Format story text for export
  static formatStoryForExport(stories: any[]): string {
    let output = '# rollenspiel.ai - Story Export\n\n'
    output += `Exported: ${this.formatDate(Date.now())} ${this.formatTime(Date.now())}\n\n`
    output += '---\n\n'

    stories.forEach((story, index) => {
      output += `## Szene ${index + 1}\n\n`
      output += `${story.text}\n\n`
      if (story.choices && story.choices.length > 0) {
        output += '**Optionen:**\n'
        story.choices.forEach((choice: string, i: number) => {
          output += `${i + 1}. ${choice}\n`
        })
      }
      output += '\n---\n\n'
    })

    return output
  }

  // Truncate text
  static truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Extract choices from story text
  static extractChoices(text: string): string[] {
    // Try different patterns
    const patterns = [
      /(?:WAHL DER HANDLUNG|DEINE WAHL|HANDLUNGSOPTIONEN):\s*\n([\s\S]*)/i,
      /(?:OPTIONEN|CHOICES):\s*\n([\s\S]*)/i,
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        return match[1]
          .split(/\n/)
          .filter((line) => /^\d+[\.)]\s/.test(line.trim()))
          .map((line) => line.replace(/^\d+[\.)]\s*/, '').trim())
          .slice(0, 3)
      }
    }

    return []
  }
}

export default FormattingService
