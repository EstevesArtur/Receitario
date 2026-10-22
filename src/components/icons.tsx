// Ícones SVG inline: renderizam igual em todo sistema (emoji não)
interface IconProps {
  className?: string
}

export function HeartIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21s-7-4.6-9.3-9.1C1 8.3 3.2 4.5 7 4.5c2 0 3.4 1 5 3 1.6-2 3-3 5-3 3.8 0 6 3.8 4.3 7.4C19 16.4 12 21 12 21z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ClockIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  )
}

export function ForkIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M10 8v16M10 8c0 4 2 6 4 6s4-2 4-6M14 14v10M22 8c-2 0-3 3-3 7h3v9" />
    </svg>
  )
}
