import { anthropic } from './anthropic'
import { AgeMode } from './types'

// MEDIEVAL SCHOLAR VARIANT - Formal, historical tone
const AGE_MODE_PROMPTS = {
  kids: `Ihr seid ein gelehrter Mönch, der Kindern (6-12 Jahre) von historischen Ereignissen berichtet.

REGELN:
- Verwendet Ihr/Sie-Form (höflich und historisch)
- Keine Gewalt oder Schrecken
- Positive Vorbilder und lehrreiche Lehren
- Einfache, aber historisch angehauchte Sprache
- Fokus auf Entdeckungen, Wissenschaft, Handwerk
- Vermittelt historische Fakten spielerisch

VERBOTENE THEMEN: Kampf, Tod, Krieg, Hunger, Krankheiten`,

  teen: `Ihr seid ein Geschichtenerzähler, der jungen Gelehrten (13-17 Jahre) von historischen Begebenheiten berichtet.

REGELN:
- Verwendet Ihr/Sie-Form (höflich und historisch)
- Moderate Konflikte erlaubt (Machtkämpfe, Intrigen)
- Historisch akkurate Details
- Ethische Dilemmata zeigen
- Komplexere Sprache mit historischem Vokabular
- Fokus auf Geschichte, Politik, Kultur

STIL: Wie ein mittelalterlicher Chronist`,

  adult: `Ihr seid ein Historiker, der Erwachsenen von den wahren Begebenheiten vergangener Zeiten berichtet.

REGELN:
- Verwendet Ihr/Sie-Form (höflich und historisch)
- Historische Realität ungeschönt zeigen
- Ethisch ambivalente Situationen
- Komplexe politische Machenschaften
- Sophisticated historical language
- Tiefgründige Charakterstudien
- Romance erlaubt (aber dezent)

STIL: Wie ein Renaissance-Gelehrter`,
}

export interface StoryGenerationOptions {
  location: { name: string; lat?: number; lon?: number }
  ageMode: AgeMode
  previousChoice?: string
  storyHistory?: string[]
}

export async function* generateStory(
  options: StoryGenerationOptions
): AsyncGenerator<string, void, unknown> {
  const { location, ageMode, previousChoice, storyHistory = [] } = options

  const systemPrompt = AGE_MODE_PROMPTS[ageMode]

  const historyContext =
    storyHistory.length > 0
      ? `\n\nBISHERIGE CHRONIK:\n${storyHistory.join('\n\n---\n\n')}`
      : ''

  const choiceContext = previousChoice
    ? `\n\nLETZTE ENTSCHEIDUNG DES LESERS: ${previousChoice}`
    : ''

  // AUTONOMOUS DECISION: Medieval-themed prompt structure
  const userPrompt = `Verfasset eine Chronik über diesen historischen Ort:

ORT: ${location.name}

${historyContext}${choiceContext}

AUFGABE:
1. Erzählet die nächste Begebenheit (6-8 Sätze)
2. Die Geschichte muss an diesem realen Ort spielen
3. Bindet historische Details und lokale Besonderheiten ein
${previousChoice ? '4. Entwickelt die Chronik basierend auf der letzten Entscheidung weiter' : '4. Dies ist der Beginn der Chronik - setzet den historischen Kontext'}
5. Verwendet historischen Sprachstil (Ihr-Form, alte Wortwahl)

Am Ende gebt GENAU 3 Handlungsoptionen im folgenden Format:

WAHL DER HANDLUNG:
1. [Erste Option - beginnt mit Imperativ]
2. [Zweite Option - beginnt mit Imperativ]
3. [Dritte Option - beginnt mit Imperativ]

Beispiel: "Begebet Euch zum...", "Sprechet mit...", "Untersucht..."`

  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 600,
    stream: true,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  for await (const messageStreamEvent of stream) {
    if (
      messageStreamEvent.type === 'content_block_delta' &&
      messageStreamEvent.delta.type === 'text_delta'
    ) {
      yield messageStreamEvent.delta.text
    }
  }
}

export function parseChoicesFromStory(fullText: string): string[] {
  // Extract choices from "WAHL DER HANDLUNG:" section
  const optionsMatch = fullText.match(/WAHL DER HANDLUNG:\s*\n([\s\S]*)/i)
  if (!optionsMatch) {
    // Fallback: Try "OPTIONEN:" as well
    const fallbackMatch = fullText.match(/OPTIONEN:\s*\n([\s\S]*)/i)
    if (!fallbackMatch) return []
    return extractChoicesFromText(fallbackMatch[1])
  }

  return extractChoicesFromText(optionsMatch[1])
}

function extractChoicesFromText(text: string): string[] {
  const choices = text
    .split(/\n/)
    .filter((line) => /^\d+\./.test(line.trim()))
    .map((line) => line.replace(/^\d+\.\s*/, '').trim())
    .slice(0, 3)

  return choices
}
