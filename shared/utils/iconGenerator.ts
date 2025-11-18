/**
 * PWA Icon Generator
 * Generates placeholder icons for development
 *
 * For production, use proper design tools like:
 * - Figma
 * - Adobe Illustrator
 * - https://realfavicongenerator.net/
 */

export function generatePlaceholderIcon(
  variant: 'medieval' | 'gamer' | 'museum',
  size: number
): string {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (!ctx) return ''

  // Background
  if (variant === 'medieval') {
    ctx.fillStyle = '#800020' // Burgundy
    ctx.fillRect(0, 0, size, size)

    // Icon (Castle/Crown)
    ctx.fillStyle = '#D4AF37' // Gold
    ctx.font = `bold ${size * 0.6}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🏰', size / 2, size / 2)
  } else if (variant === 'gamer') {
    ctx.fillStyle = '#0A0E27' // Dark bg
    ctx.fillRect(0, 0, size, size)

    // Neon border
    ctx.strokeStyle = '#B026FF' // Neon purple
    ctx.lineWidth = size * 0.05
    ctx.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8)

    // Icon (Game controller)
    ctx.fillStyle = '#00F0FF' // Neon cyan
    ctx.font = `bold ${size * 0.6}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🎮', size / 2, size / 2)
  } else {
    // Museum
    ctx.fillStyle = '#1A2332' // Navy
    ctx.fillRect(0, 0, size, size)

    // Icon (Museum/Building)
    ctx.fillStyle = '#C9A961' // Gold
    ctx.font = `bold ${size * 0.6}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🏛️', size / 2, size / 2)
  }

  return canvas.toDataURL('image/png')
}

// Generate and download icons
export function downloadIcons(variant: 'medieval' | 'gamer' | 'museum') {
  const sizes = [192, 512]

  sizes.forEach((size) => {
    const dataUrl = generatePlaceholderIcon(variant, size)
    const link = document.createElement('a')
    link.download = `icon-${size}x${size}.png`
    link.href = dataUrl
    link.click()
  })
}
