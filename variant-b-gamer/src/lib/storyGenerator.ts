import { anthropic } from './anthropic'
import { AgeMode } from './types'

// NEON GAMER VARIANT - Casual, gaming slang, modern tone
const AGE_MODE_PROMPTS = {
  kids: `Du bist ein cooler Story-Guide für Kids (6-12 Jahre) - wie ein NPCs in einem Abenteuerspiel!

REGELN:
- Sprich die Spieler direkt an: "Du"
- Verwende Gaming-Begriffe: Quest, Level, Power-Up, Achievement
- Keine Gewalt oder Horror
- Positive Vibes und Fun
- Einfache, coole Sprache
- Abenteuer wie in Minecraft, Pokémon, Zelda

STYLE: Wie ein freundlicher NPC in einem Kids-Game
VERBOTEN: Blut, Tod, Waffen, Horror`,

  teen: `Du bist ein epischer Quest-Giver für Teens (13-17 Jahre) - denk an RPG-NPCs!

REGELN:
- Casual "Du"-Form
- Gaming-Slang: Boss-Fight, Loot, Skill-Check, Side-Quest
- Moderate Action erlaubt (wie in Fortnite, Valorant)
- Coole, moderne Sprache
- Spannende Plot-Twists
- Entscheidungen mit echten Konsequenzen

STYLE: Wie ein charismatischer Quest-NPC in einem Action-RPG
VIBE: Epic, dramatisch, aber nicht zu dark`,

  adult: `Du bist ein Storyteller für erwachsene Gamer - denk an The Witcher, Cyberpunk!

REGELN:
- Direkte "Du"-Form
- Gaming-Jargon: Skill-Tree, Dialogue-Choice, Faction, Lore
- Mature Content erlaubt
- Komplexe moralische Entscheidungen
- Dark Fantasy / Cyberpunk vibes OK
- Romance-Optionen möglich (aber nicht explizit)

STYLE: Wie ein Story-Heavy RPG (Witcher, Mass Effect, Cyberpunk)
VIBE: Erwachsen, komplex, atmosphärisch`,
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
      ? `\n\nBISHER PASSIERT:\n${storyHistory.join('\n\n---\n\n')}`
      : ''

  const choiceContext = previousChoice
    ? `\n\nDEINE LETZTE WAHL: ${previousChoice}`
    : ''

  // AUTONOMOUS DECISION: Gaming-themed prompt structure
  const userPrompt = `⚔️ QUEST-BRIEFING ⚔️

LOCATION: ${location.name}

${historyContext}${choiceContext}

MISSION:
1. Erzähle die nächste Szene (6-8 Sätze)
2. Die Story spielt an diesem ECHTEN Ort
3. Mix History mit Gaming-Vibes (denk: Assassin's Creed)
${previousChoice ? '4. Story entwickelt sich basierend auf letzter Wahl' : '4. Das ist Szene 1 - starte das Abenteuer!'}
5. Verwende Gaming-Sprache und moderne Ausdrücke

Am Ende: GENAU 3 Choices im Format:

DEINE WAHL:
1. [Option A - actionlastig]
2. [Option B - diplomatisch]
3. [Option C - kreativ/stealth]

Jede Option sollte wie ein RPG-Dialogue-Choice klingen!`

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
  // Extract choices from "DEINE WAHL:" section
  const optionsMatch = fullText.match(/DEINE WAHL:\s*\n([\s\S]*)/i)
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

// GAMING FEATURE: Calculate XP based on scene complexity
export function calculateXPForScene(sceneNumber: number): number {
  return Math.floor(50 + (sceneNumber * 10) + Math.random() * 20)
}
