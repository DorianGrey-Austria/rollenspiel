/**
 * Story Export Utilities
 * Export stories as various formats
 */

import { StoryMessage } from '../types/shared'
import { FormattingService } from './formatting'

export class ExportService {
  // Export as plain text
  static exportAsText(stories: StoryMessage[], location: string): string {
    return FormattingService.formatStoryForExport(stories)
  }

  // Export as Markdown
  static exportAsMarkdown(stories: StoryMessage[], location: string, ageMode: string): string {
    let output = `# rollenspiel.ai - Story Export\n\n`
    output += `**Location:** ${location}\n`
    output += `**Age Mode:** ${ageMode}\n`
    output += `**Exported:** ${FormattingService.formatDate(Date.now())} ${FormattingService.formatTime(Date.now())}\n\n`
    output += `---\n\n`

    stories.forEach((story, index) => {
      output += `## Szene ${index + 1}\n\n`
      output += `${story.text}\n\n`

      if (story.choices && story.choices.length > 0) {
        output += `### Optionen\n\n`
        story.choices.forEach((choice, i) => {
          output += `${i + 1}. ${choice}\n`
        })
        output += `\n`
      }

      if (story.xpGained) {
        output += `**XP Gewonnen:** ${story.xpGained}\n\n`
      }

      if (story.historicalFact) {
        output += `> 📚 **Historischer Kontext:** ${story.historicalFact}\n\n`
      }

      output += `---\n\n`
    })

    return output
  }

  // Export as JSON
  static exportAsJSON(stories: StoryMessage[], location: string, ageMode: string): string {
    const exportData = {
      meta: {
        exportedAt: Date.now(),
        location,
        ageMode,
        storyCount: stories.length,
      },
      stories: stories.map((story) => ({
        id: story.id,
        text: story.text,
        choices: story.choices,
        timestamp: story.timestamp,
        xpGained: story.xpGained,
        historicalFact: story.historicalFact,
      })),
    }

    return JSON.stringify(exportData, null, 2)
  }

  // Download file
  static downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Share via Web Share API (if available)
  static async shareStory(stories: StoryMessage[], location: string): Promise<boolean> {
    if (!navigator.share) {
      return false
    }

    try {
      const text = this.exportAsText(stories, location)

      await navigator.share({
        title: 'Meine rollenspiel.ai Story',
        text: FormattingService.truncate(text, 500),
      })

      return true
    } catch (error) {
      console.error('Share error:', error)
      return false
    }
  }

  // Copy to clipboard
  static async copyToClipboard(content: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(content)
      return true
    } catch (error) {
      console.error('Clipboard error:', error)
      return false
    }
  }
}

export default ExportService
