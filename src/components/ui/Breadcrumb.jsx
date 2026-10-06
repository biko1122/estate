import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items, tone = 'light', className = '' }) {
  const dark = tone === 'dark'
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={`flex flex-wrap items-center gap-1.5 text-[0.82rem] ${dark ? 'text-white/65' : 'text-muted'}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined} className={dark ? 'text-white' : 'text-ink'}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-ink'}`}>
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight size={13} className="opacity-60" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
