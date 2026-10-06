/** Pill toggle, e.g. Buy / Rent. `options` are { value, label }. */
export default function Segmented({ value, onChange, options, tone = 'light', size = 'md', className = '' }) {
  const dark = tone === 'dark'
  const h = size === 'sm' ? 'h-9 text-[0.82rem]' : 'h-11 text-[0.9rem]'
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === value))
  return (
    <div
      role="tablist"
      className={`relative inline-grid rounded-full p-1 ${dark ? 'bg-white/10 backdrop-blur-md' : 'bg-limestone'} ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 rounded-full shadow-sm transition-transform duration-400 ease-[var(--ease-out-soft)] ${dark ? 'bg-white' : 'bg-ink'}`}
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`relative z-10 rounded-full px-5 font-semibold transition-colors duration-300 ${h} ${
              active ? (dark ? 'text-ink' : 'text-white') : dark ? 'text-white/75 hover:text-white' : 'text-ink/60 hover:text-ink'
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
