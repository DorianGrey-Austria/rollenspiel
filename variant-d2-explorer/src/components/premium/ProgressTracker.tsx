import { FC } from 'react'

export interface ProgressStats {
  totalPoints: number
  storiesCompleted: number
  locationsVisited: number
  achievementsEarned: number
  totalAchievements: number
  currentStreak: number
}

interface Props {
  stats: ProgressStats
  showDetailed?: boolean
}

export const ProgressTracker: FC<Props> = ({ stats, showDetailed = true }) => {
  const level = Math.floor(stats.totalPoints / 100) + 1
  const pointsForNextLevel = (level * 100) - stats.totalPoints
  const progressPercentage = ((stats.totalPoints % 100) / 100) * 100

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Level Display */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-2">
          <span className="text-4xl">⏰</span>
          <div>
            <h3 className="text-2xl font-bold">Level {level}</h3>
            <p className="text-sm opacity-80">Zeit-Entdecker</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{stats.totalPoints} XP</span>
            <span>{level * 100} XP</span>
          </div>
          <div className="progress-explorer">
            <div
              className="progress-explorer-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs mt-1 opacity-70">
            Noch {pointsForNextLevel} XP bis Level {level + 1}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {showDetailed && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="stat-display">
            <div className="stat-number">{stats.storiesCompleted}</div>
            <p className="text-xs mt-1 opacity-80">Geschichten</p>
          </div>

          <div className="stat-display">
            <div className="stat-number">{stats.locationsVisited}</div>
            <p className="text-xs mt-1 opacity-80">Orte besucht</p>
          </div>

          <div className="stat-display">
            <div className="stat-number">
              {stats.achievementsEarned}/{stats.totalAchievements}
            </div>
            <p className="text-xs mt-1 opacity-80">Achievements</p>
          </div>

          <div className="stat-display">
            <div className="stat-number">{stats.currentStreak}</div>
            <p className="text-xs mt-1 opacity-80">Tage Streak 🔥</p>
          </div>
        </div>
      )}
    </div>
  )
}
