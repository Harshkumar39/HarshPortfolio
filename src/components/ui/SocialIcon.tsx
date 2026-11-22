import { Mail } from 'lucide-react'
import type { SocialLink } from '../../types'

interface SocialIconProps {
  name: SocialLink['name']
  size?: number
}

export function SocialIcon({ name, size = 18 }: SocialIconProps) {
  if (name === 'Email') return <Mail size={size} aria-hidden="true" />

  if (name === 'Instagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'LeetCode') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m13.5 3.5-6.2 6.2a3.25 3.25 0 0 0 0 4.6l6.2 6.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12h9M14.2 7.3l-2.7 2.7M14.2 16.7l-2.7-2.7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'LinkedIn') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.73V1.73c0-.96-.8-1.73-1.78-1.73Z" />
      </svg>
    )
  }

  if (name === 'GitHub') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.08c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1.01 1.71 2.63 1.22 3.28.94.1-.73.39-1.22.71-1.5-2.5-.28-5.16-1.25-5.16-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.44.11-3 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.65 0c2.16-1.45 3.1-1.15 3.1-1.15.62 1.56.23 2.72.12 3 .72.79 1.15 1.8 1.15 3.03 0 4.34-2.66 5.3-5.19 5.58.41.36.77 1.03.77 2.08v3.07c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
      </svg>
    )
  }

  return <span className="social-icon-text" aria-hidden="true">GfG</span>
}
