import { Heart } from 'lucide-react'
import { useFavorites } from '../../context/FavoritesContext'

export default function FavoriteButton({ property, variant = 'overlay', className = '' }) {
  const { has, toggle } = useFavorites()
  const saved = has(property.id)
  const label = saved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(property.id, property.title)
  }

  if (variant === 'labelled') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        aria-label={label}
        className={`inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[0.88rem] font-semibold transition-all duration-300 active:scale-95 ${
          saved ? 'border-accent bg-accent-soft text-accent' : 'border-line bg-white text-ink hover:border-ink'
        } ${className}`}
      >
        <Heart size={17} fill={saved ? 'currentColor' : 'none'} className={saved ? 'animate-pop' : ''} />
        {saved ? 'Saved' : 'Save'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={label}
      className={`grid h-10 w-10 place-items-center rounded-full shadow-card backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-90 ${
        saved ? 'bg-white text-accent' : 'bg-white/85 text-ink hover:bg-white'
      } ${className}`}
    >
      <Heart key={String(saved)} size={18} strokeWidth={2} fill={saved ? 'currentColor' : 'none'} className={saved ? 'animate-pop' : ''} />
    </button>
  )
}
