import { FC } from 'react'

export interface TimelineEvent {
  id: string
  timestamp: string
  title: string
  description: string
  location?: string
  icon?: string
}

interface Props {
  events: TimelineEvent[]
  currentIndex?: number
}

export const TimelineView: FC<Props> = ({ events, currentIndex }) => {
  if (events.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <span className="text-4xl mb-2 block">📜</span>
        <p className="opacity-70">Deine Zeitreise beginnt hier...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🕰️</span>
        <h3 className="text-xl font-bold">Deine Zeitreise</h3>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-explorer-accent via-explorer-highlight to-explorer-success" />

        {/* Timeline Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const isCurrent = index === currentIndex
            const isPast = currentIndex !== undefined && index < currentIndex
            const isFuture = currentIndex !== undefined && index > currentIndex

            return (
              <div
                key={event.id}
                className={`relative pl-12 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Marker */}
                <div
                  className={`absolute left-0 top-2 ${
                    isCurrent
                      ? 'timeline-marker'
                      : isPast
                      ? 'w-4 h-4 rounded-full bg-explorer-success shadow-glow'
                      : 'w-4 h-4 rounded-full bg-white/20 border-2 border-white/40'
                  }`}
                />

                {/* Event Card */}
                <div
                  className={`character-card ${
                    isCurrent ? 'border-glow-animate' : ''
                  } ${isFuture ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {event.icon && (
                      <span className="text-2xl">{event.icon}</span>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        {isCurrent && (
                          <span className="text-xs px-2 py-1 rounded-full bg-explorer-highlight text-white">
                            Aktuell
                          </span>
                        )}
                      </div>
                      <p className="text-sm opacity-80 mb-2">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs opacity-70">
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <span>📍</span>
                            {event.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <span>🕐</span>
                          {event.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
