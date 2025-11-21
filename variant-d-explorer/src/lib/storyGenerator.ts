import { anthropic } from './anthropic'
import { AgeMode } from './types'

// MUSEUM GUIDE VARIANT - Professional, educational, neutral tone
const AGE_MODE_PROMPTS = {
  kids: `Sie sind ein professioneller Museumsführer für junge Besucher (6-12 Jahre).

REGELN:
- Neutrale, höfliche Ansprache
- Bildungssprache, aber altersgerecht
- Historische Genauigkeit
- Keine Gewalt oder Horror
- Fokus auf Lerninhalte und Fakten
- Verwenden Sie einfache, klare Sprache

STIL: Wie ein freundlicher Museumsguide oder Lehrer
ZIEL: Bildung und Wissensvermittlung`,

  teen: `Sie sind ein Kurator und führen Jugendliche (13-17 Jahre) durch die Geschichte.

REGELN:
- Professionelle, neutrale Ansprache
- Akademischer Sprachstil (B2-C1)
- Historische Genauigkeit ist wichtig
- Komplexe Zusammenhänge erklären
- Kritisches Denken fördern
- Quellenbasiertes Arbeiten

STIL: Wie ein Museumsexperte oder Geschichtslehrer
ZIEL: Tiefgründiges Verständnis historischer Zusammenhänge`,

  adult: `Sie sind ein Historiker und Kurator für erwachsene Besucher.

REGELN:
- Sachliche, professionelle Sprache
- Akademisches Niveau
- Vollständige historische Komplexität
- Kontroverse Themen erlaubt
- Quellenbasiert und faktentreu
- Kritische Geschichtsbetrachtung

STIL: Wie ein Universitätsprofessor oder Museumsdirektor
ZIEL: Wissenschaftliche Genauigkeit und kritische Reflexion`,
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
      ? `\n\nBISHERIGER VERLAUF:\n${storyHistory.join('\n\n---\n\n')}`
      : ''

  const choiceContext = previousChoice
    ? `\n\nLETZTE ENTSCHEIDUNG: ${previousChoice}`
    : ''

  // AUTONOMOUS DECISION: Educational, museum-style prompt
  const userPrompt = `Sie führen Besucher durch die Geschichte an folgendem Ort:

ORT: ${location.name}

${historyContext}${choiceContext}

AUFGABE:
1. Erzählen Sie die nächste Episode (6-8 Sätze)
2. Die Handlung muss an diesem realen, historischen Ort spielen
3. Integrieren Sie historische Fakten und Kontext
${previousChoice ? '4. Entwickeln Sie die Handlung basierend auf der letzten Entscheidung weiter' : '4. Dies ist der Einstieg - setzen Sie den historischen Kontext'}
5. Verwenden Sie eine professionelle, bildende Sprache

WICHTIG: Fügen Sie einen HISTORISCHEN FAKT ein (markiert mit "📚 HISTORISCHER KONTEXT:")

Am Ende: GENAU 3 Handlungsoptionen im Format:

HANDLUNGSOPTIONEN:
1. [Option A - historisch korrekt]
2. [Option B - alternative Perspektive]
3. [Option C - vertiefende Erkundung]

Jede Option sollte bildenden Wert haben.`

  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 700,
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
  // Extract choices from "HANDLUNGSOPTIONEN:" section
  const optionsMatch = fullText.match(/HANDLUNGSOPTIONEN:\s*\n([\s\S]*)/i)
  if (!optionsMatch) {
    // Fallback patterns
    const fallbackMatch = fullText.match(/(?:OPTIONEN|CHOICES|WAHL):\s*\n([\s\S]*)/i)
    if (!fallbackMatch) return []
    return extractChoicesFromText(fallbackMatch[1])
  }

  return extractChoicesFromText(optionsMatch[1])
}

function extractChoicesFromText(text: string): string[] {
  const choices = text
    .split(/\n/)
    .filter((line) => /^\d+[\.)]\s/.test(line.trim()))
    .map((line) => line.replace(/^\d+[\.)]\s*/, '').trim())
    .slice(0, 3)

  return choices
}

// EDUCATIONAL FEATURE: Extract historical fact from story
export function extractHistoricalFact(fullText: string): string | undefined {
  const factMatch = fullText.match(/📚 HISTORISCHER KONTEXT:\s*(.+?)(?=\n\n|HANDLUNGSOPTIONEN|$)/is)
  return factMatch ? factMatch[1].trim() : undefined
}
