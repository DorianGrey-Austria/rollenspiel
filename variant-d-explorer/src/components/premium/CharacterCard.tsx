import { FC } from 'react'

export interface HistoricalCharacter {
  id: string
  name: string
  role: string
  era: string
  description: string
  funFact?: string
  imageUrl?: string // Optional: for future image integration
  relevance: 'high' | 'medium' | 'low'
}

interface Props {
  character: HistoricalCharacter
  compact?: boolean
}

export const CharacterCard: FC<Props> = ({ character, compact = false }) => {
  const relevanceColors = {
    high: 'border-explorer-accent',
    medium: 'border-explorer-highlight',
    low: 'border-white/20',
  }

  const relevanceIcons = {
    high: '⭐',
    medium: '✨',
    low: '📌',
  }

  if (compact) {
    return (
      <div className="glass-card p-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-explorer-accent to-explorer-highlight flex items-center justify-center text-2xl">
          👤
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{character.name}</h4>
          <p className="text-xs opacity-70 truncate">{character.role}</p>
        </div>
        <span className="text-xl">{relevanceIcons[character.relevance]}</span>
      </div>
    )
  }

  return (
    <div
      className={`character-card border-l-4 ${relevanceColors[character.relevance]}`}
    >
      {/* Header with Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-explorer-accent to-explorer-highlight flex items-center justify-center text-3xl shrink-0 shadow-glow">
          {character.imageUrl ? (
            <img
              src={character.imageUrl}
              alt={character.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            '👤'
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold">{character.name}</h3>
            <span className="text-lg">{relevanceIcons[character.relevance]}</span>
          </div>
          <p className="text-sm font-semibold text-explorer-accent">
            {character.role}
          </p>
          <p className="text-xs opacity-70 mt-1">📅 {character.era}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-3 opacity-90">
        {character.description}
      </p>

      {/* Fun Fact */}
      {character.funFact && (
        <div className="fact-box-explorer text-sm">
          <strong>Wusstest du?</strong> {character.funFact}
        </div>
      )}

      {/* Relevance Indicator */}
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="opacity-70">Relevanz:</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-2 rounded-full ${
                i < (character.relevance === 'high' ? 3 : character.relevance === 'medium' ? 2 : 1)
                  ? 'bg-explorer-accent shadow-glow'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
