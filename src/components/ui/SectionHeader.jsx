import Reveal from './Reveal'

export function Eyebrow({ children, tone = 'light', center = false, className = '' }) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''} ${tone === 'dark' ? 'text-accent-bright' : 'text-accent'} ${className}`}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  )
}

export default function SectionHeader({ eyebrow, title, intro, align = 'left', tone = 'light', action, className = '' }) {
  const centered = align === 'center'
  const dark = tone === 'dark'
  return (
    <div
      className={`flex flex-col gap-6 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'} ${className}`}
    >
      <Reveal className="max-w-3xl">
        {eyebrow && (
          <Eyebrow tone={tone} center={centered} className="mb-4">
            {eyebrow}
          </Eyebrow>
        )}
        <h2
          className={`font-display text-[2.1rem] leading-[1.06] sm:text-[2.6rem] lg:text-[3.1rem] ${dark ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 max-w-2xl text-[1.02rem] leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}>{intro}</p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={120} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  )
}
