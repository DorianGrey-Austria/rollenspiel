import { FC } from 'react'
import { useGameStore } from '../../store/gameStore'
import { ProgressTracker } from './ProgressTracker'
import { AchievementBadge } from './AchievementBadge'

export const StatsPanel: FC = () => {
  const {
    totalPoints,
    storiesCompleted,
    locationsVisited,
    achievements,
    currentStreak,
  } = useGameStore()

  const earnedAchievements = achievements.filter((a) => a.earned)
  const progressAchievements = achievements.filter(
    (a) => !a.earned && a.progress !== undefined
  )

  const stats = {
    totalPoints,
    storiesCompleted,
    locationsVisited: locationsVisited.size,
    achievementsEarned: earnedAchievements.length,
    totalAchievements: achievements.length,
    currentStreak,
  }

  return (
    <div className="space-y-6">
      {/* Progress Tracker */}
      <ProgressTracker stats={stats} />

      {/* Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <h3 className="text-xl font-bold">Erfolge</h3>
        </div>

        {/* Earned Achievements */}
        {earnedAchievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold opacity-70">
              Freigeschaltet ({earnedAchievements.length})
            </h4>
            {earnedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                size="sm"
              />
            ))}
          </div>
        )}

        {/* In Progress Achievements */}
        {progressAchievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold opacity-70">
              In Arbeit ({progressAchievements.length})
            </h4>
            {progressAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                size="sm"
              />
            ))}
          </div>
        )}

        {/* Locked Achievements */}
        {achievements.filter((a) => !a.earned && !a.progress).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold opacity-70">
              Versteckt (
              {achievements.filter((a) => !a.earned && !a.progress).length})
            </h4>
            {achievements
              .filter((a) => !a.earned && !a.progress)
              .map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  size="sm"
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
