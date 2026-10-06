import { useEffect } from 'react'

export function useClickOutside(ref, onOutside, active = true) {
  useEffect(() => {
    if (!active) return
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside()
    }
    const onKey = (e) => e.key === 'Escape' && onOutside()
    document.addEventListener('pointerdown', handle)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', handle)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, onOutside, active])
}
