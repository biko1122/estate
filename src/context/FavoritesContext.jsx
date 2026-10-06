import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'saray:favorites'
const FavoritesContext = createContext(null)

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Saved homes live in localStorage for the prototype; swap for a user API later.
export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readStored)
  const [toast, setToast] = useState(null)
  const idsRef = useRef(ids)
  const timer = useRef(null)
  idsRef.current = ids

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* storage unavailable (private mode) — keep in memory only */
    }
  }, [ids])

  const toggle = useCallback((id, title) => {
    const saved = !idsRef.current.includes(id)
    setIds((prev) => (saved ? [...prev.filter((x) => x !== id), id] : prev.filter((x) => x !== id)))
    setToast({ saved, title, key: Date.now() })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  const dismissToast = useCallback(() => setToast(null), [])

  const value = useMemo(
    () => ({ ids, count: ids.length, has: (id) => ids.includes(id), toggle, toast, dismissToast }),
    [ids, toggle, toast, dismissToast],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
