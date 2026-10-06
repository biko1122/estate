import { Link } from 'react-router-dom'
import { site } from '../../config/site'

// Placeholder mark: an arched doorway. Replace with the client's logo file.
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M7 27V14.5a9 9 0 0 1 18 0V27" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12.5 27v-9.5a3.5 3.5 0 0 1 7 0V27"
        fill="none"
        stroke="var(--logo-accent, var(--color-accent))"
        strokeWidth="2.2"
      />
    </svg>
  )
}

export default function Logo({ tone = 'dark', className = '', onClick }) {
  const light = tone === 'light'
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`flex items-center gap-2.5 transition-colors duration-300 ${light ? 'text-white [--logo-accent:var(--color-accent-bright)]' : 'text-ink'} ${className}`}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.4rem] font-medium tracking-[-0.01em]">{site.shortName}</span>
        <span
          className={`mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.36em] ${light ? 'text-white/60' : 'text-muted'}`}
        >
          Estates
        </span>
      </span>
    </Link>
  )
}
