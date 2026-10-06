import { Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import { useFavorites } from '../../context/FavoritesContext'

export default function Toast() {
  const { toast, dismissToast } = useFavorites()
  if (!toast) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 lg:bottom-8">
      <div
        key={toast.key}
        role="status"
        className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-3 text-white shadow-panel animate-fade-up"
      >
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${toast.saved ? 'bg-accent' : 'bg-white/10'}`}>
          <Heart size={16} fill={toast.saved ? 'currentColor' : 'none'} />
        </span>
        <p className="min-w-0 truncate text-[0.88rem]">
          {toast.saved ? 'Saved' : 'Removed'} <span className="text-white/60">· {toast.title}</span>
        </p>
        {toast.saved && (
          <Link to="/favorites" onClick={dismissToast} className="shrink-0 text-[0.85rem] font-semibold text-accent-bright hover:text-white">
            View saved
          </Link>
        )}
        <button type="button" onClick={dismissToast} aria-label="Dismiss" className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
