import { FC } from 'react'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  progress?: number
  maxProgress?: number
}

interface Props {
  achievement: Achievement
  size?: 'sm' | 'md' | 'lg'
}

export const AchievementBadge: FC<Props> = ({ achievement, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4',
  }

  const iconSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  }

  if (!achievement.earned && !achievement.progress) {
    // Locked achievement
    return (
      <div className={`glass-card ${sizeClasses[size]} opacity-50 grayscale`}>
        <div className="flex items-center gap-3">
          <span className={iconSizes[size]}>🔒</span>
          <div className="flex-1">
            <h4 className="font-semibold text-white/70">???</h4>
            <p className="text-xs text-white/50">Verstecktes Achievement</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${achievement.earned ? 'achievement-badge' : 'glass-card'} ${
        sizeClasses[size]
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={iconSizes[size]}>{achievement.icon}</span>
        <div className="flex-1">
          <h4 className="font-semibold">{achievement.title}</h4>
          <p className="text-xs opacity-80">{achievement.description}</p>
          {achievement.progress !== undefined && achievement.maxProgress && (
            <div className="mt-2">
              <div className="progress-explorer">
                <div
                  className="progress-explorer-fill"
                  style={{
                    width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs mt-1 font-mono">
                {achievement.progress} / {achievement.maxProgress}
              </p>
            </div>
          )}
        </div>
        {achievement.earned && (
          <span className="text-2xl animate-pulse">✓</span>
        )}
      </div>
    </div>
  )
}
