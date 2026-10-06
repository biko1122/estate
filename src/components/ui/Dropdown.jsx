import { useCallback, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { useClickOutside } from '../../hooks/useClickOutside'

/**
 * Styled single-select. `options` are { value, label }. An empty-string
 * value acts as "any" and shows the placeholder.
 *
 * variant "field": labelled block used in search panels
 * variant "pill":  compact rounded trigger used in filter bars
 */
export default function Dropdown({
  label,
  icon: Icon,
  value,
  onChange,
  options,
  placeholder = 'Any',
  variant = 'field',
  align = 'left',
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const id = useId()
  const close = useCallback(() => setOpen(false), [])
  useClickOutside(ref, close, open)

  const selected = options.find((o) => o.value === value)
  const display = selected?.label ?? placeholder
  const isSet = value !== '' && value != null

  const choose = (v) => {
    onChange(v)
    setOpen(false)
  }

  const onListKey = (e) => {
    const items = [...e.currentTarget.querySelectorAll('[role="option"]')]
    const i = items.indexOf(document.activeElement)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      items[Math.min(i + 1, items.length - 1)]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      items[Math.max(i - 1, 0)]?.focus()
    }
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {variant === 'field' ? (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-limestone"
        >
          {Icon && (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-limestone text-ink/70 transition-colors group-hover:bg-white">
              <Icon size={16} strokeWidth={1.8} />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
            <span className={`block truncate text-[0.95rem] font-medium ${isSet ? 'text-ink' : 'text-ink/55'}`}>
              {display}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      ) : (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={`flex h-11 w-full items-center justify-between gap-2 rounded-full border px-4 text-[0.88rem] font-medium transition-all duration-200 ${
            isSet
              ? 'border-ink bg-ink text-white'
              : 'border-line bg-white text-ink hover:border-ink/40'
          } ${open && !isSet ? 'border-ink/40' : ''}`}
        >
          <span className="truncate">
            {isSet ? display : label}
          </span>
          <ChevronDown size={15} className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
      )}

      {open && (
        <ul
          id={id}
          role="listbox"
          aria-label={label}
          onKeyDown={onListKey}
          className={`absolute z-40 mt-2 max-h-80 min-w-full overflow-auto rounded-2xl border border-line bg-white p-1.5 shadow-lift animate-fade-in sm:min-w-[220px] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {[{ value: '', label: placeholder }, ...options].map((o, idx) => {
            const active = o.value === value || (o.value === '' && !isSet)
            return (
              <li key={o.value || `any-${idx}`}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  autoFocus={active}
                  onClick={() => choose(o.value)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-left text-[0.9rem] transition-colors hover:bg-limestone focus:bg-limestone focus:outline-none ${
                    active ? 'font-semibold text-accent' : 'text-ink'
                  }`}
                >
                  <span className="whitespace-nowrap">{o.label}</span>
                  {active && <Check size={15} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
