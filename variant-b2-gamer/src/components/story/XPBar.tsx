import { useGameStore } from '../../store/gameStore'

// GAMING FEATURE: XP Progress Bar
export function XPBar() {
  const playerStats = useGameStore((state) => state.playerStats)

  const percentage = (playerStats.xp / playerStats.xpToNextLevel) * 100

  return (
    <div className="bg-dark-card neon-border-cyan p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-heading text-neon-cyan">
          LEVEL {playerStats.level}
        </div>
        <div className="font-mono text-sm text-neon-green">
          {playerStats.xp} / {playerStats.xpToNextLevel} XP
        </div>
      </div>

      {/* XP Bar */}
      <div className="w-full h-6 bg-dark-bg border-2 border-neon-cyan overflow-hidden xp-bar">
        <div
          className="h-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full animate-pulse bg-white opacity-20"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between mt-2 text-xs font-mono text-gray-400">
        <span>📜 Szenen: {playerStats.totalScenes}</span>
        <span>🏆 Achievements: {playerStats.achievements.length}</span>
      </div>
    </div>
  )
}
