/**
 * Serverless Function: Story Generation
 * POST /api/story/generate
 *
 * Securely generates stories using Claude API
 * API key stored server-side
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

// Rate limiting cache (in-memory, resets on cold start)
const rateLimitCache = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10

interface StoryRequest {
  location: {
    name: string
    lat?: number
    lon?: number
  }
  ageMode: 'kids' | 'teen' | 'adult'
  variant: 'medieval' | 'gamer' | 'museum'
  previousChoice?: string
  storyHistory?: string[]
}

// Age mode prompts for each variant
const PROMPTS = {
  medieval: {
    kids: `Sie sind ein gelehrter Mönch, der Kindern (6-12 Jahre) von historischen Ereignissen berichtet.

REGELN:
- Verwenden Sie Ihr/Sie-Form (höflich und historisch)
- Keine Gewalt oder Schrecken
- Positive Vorbilder und lehrreiche Lehren
- Einfache, aber historisch angehauchte Sprache
- Fokus auf Entdeckungen, Wissenschaft, Handwerk

VERBOTENE THEMEN: Kampf, Tod, Krieg, Hunger, Krankheiten`,

    teen: `Sie sind ein Geschichtenerzähler, der jungen Gelehrten (13-17 Jahre) von historischen Begebenheiten berichtet.

REGELN:
- Verwenden Sie Ihr/Sie-Form (höflich und historisch)
- Moderate Konflikte erlaubt (Machtkämpfe, Intrigen)
- Historisch akkurate Details
- Ethische Dilemmata zeigen

STIL: Wie ein mittelalterlicher Chronist`,

    adult: `Sie sind ein Historiker, der Erwachsenen von den wahren Begebenheiten vergangener Zeiten berichtet.

REGELN:
- Verwenden Sie Ihr/Sie-Form (höflich und historisch)
- Historische Realität ungeschönt zeigen
- Ethisch ambivalente Situationen
- Komplexe politische Machenschaften

STIL: Wie ein Renaissance-Gelehrter`,
  },

  gamer: {
    kids: `Du bist ein cooler Story-Guide für Kids (6-12 Jahre) - wie ein NPC in einem Abenteuerspiel!

REGELN:
- Sprich die Spieler direkt an: "Du"
- Verwende Gaming-Begriffe: Quest, Level, Power-Up, Achievement
- Keine Gewalt oder Horror
- Positive Vibes und Fun

STYLE: Wie ein freundlicher NPC in einem Kids-Game`,

    teen: `Du bist ein epischer Quest-Giver für Teens (13-17 Jahre) - denk an RPG-NPCs!

REGELN:
- Casual "Du"-Form
- Gaming-Slang: Boss-Fight, Loot, Skill-Check, Side-Quest
- Moderate Action erlaubt
- Spannende Plot-Twists

STYLE: Wie ein charismatischer Quest-NPC in einem Action-RPG`,

    adult: `Du bist ein Storyteller für erwachsene Gamer - denk an The Witcher, Cyberpunk!

REGELN:
- Direkte "Du"-Form
- Gaming-Jargon: Skill-Tree, Dialogue-Choice, Faction, Lore
- Mature Content erlaubt
- Komplexe moralische Entscheidungen

STYLE: Wie ein Story-Heavy RPG`,
  },

  museum: {
    kids: `Sie sind ein professioneller Museumsführer für junge Besucher (6-12 Jahre).

REGELN:
- Neutrale, höfliche Ansprache
- Bildungssprache, aber altersgerecht
- Historische Genauigkeit
- Keine Gewalt oder Horror

STIL: Wie ein freundlicher Museumsguide`,

    teen: `Sie sind ein Kurator und führen Jugendliche (13-17 Jahre) durch die Geschichte.

REGELN:
- Professionelle, neutrale Ansprache
- Akademischer Sprachstil (B2-C1)
- Historische Genauigkeit ist wichtig
- Komplexe Zusammenhänge erklären

STIL: Wie ein Museumsexperte`,

    adult: `Sie sind ein Historiker und Kurator für erwachsene Besucher.

REGELN:
- Sachliche, professionelle Sprache
- Akademisches Niveau
- Vollständige historische Komplexität
- Quellenbasiert und faktentreu

STIL: Wie ein Universitätsprofessor`,
  },
}

// Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimitCache.get(ip) || []

  // Filter out old requests
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  recentRequests.push(now)
  rateLimitCache.set(ip, recentRequests)

  return true
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please try again in a minute.'
    })
  }

  try {
    const body: StoryRequest = req.body

    // Validation
    if (!body.location || !body.ageMode || !body.variant) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({ apiKey })

    // Build prompt
    const systemPrompt = PROMPTS[body.variant][body.ageMode]

    const historyContext = body.storyHistory && body.storyHistory.length > 0
      ? `\n\nBISHERIGER VERLAUF:\n${body.storyHistory.join('\n\n---\n\n')}`
      : ''

    const choiceContext = body.previousChoice
      ? `\n\nLETZTE ENTSCHEIDUNG: ${body.previousChoice}`
      : ''

    const userPrompt = `Erzähle die nächste Szene für diesen Ort:

ORT: ${body.location.name}

${historyContext}${choiceContext}

AUFGABE:
1. Erzähle die nächste Episode (6-8 Sätze)
2. Die Handlung spielt an diesem realen Ort
3. Integriere historische Details
${body.previousChoice ? '4. Entwickle die Story basierend auf der letzten Wahl' : '4. Dies ist der Einstieg'}

Am Ende: GENAU 3 Handlungsoptionen im Format:

${body.variant === 'medieval' ? 'WAHL DER HANDLUNG:' : body.variant === 'gamer' ? 'DEINE WAHL:' : 'HANDLUNGSOPTIONEN:'}
1. [Option A]
2. [Option B]
3. [Option C]`

    // Generate story (streaming)
    const stream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 700,
      stream: true,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    // Setup SSE (Server-Sent Events) for streaming
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    for await (const messageStreamEvent of stream) {
      if (
        messageStreamEvent.type === 'content_block_delta' &&
        messageStreamEvent.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: messageStreamEvent.delta.text })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()

  } catch (error: any) {
    console.error('Story generation error:', error)
    return res.status(500).json({
      error: 'Failed to generate story',
      message: error.message
    })
  }
}
