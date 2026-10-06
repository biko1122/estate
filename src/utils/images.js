// Demo photography is served from Unsplash. When the client supplies real
// listing photos, point `src` at their CDN and this helper becomes a no-op.
const UNSPLASH = 'https://images.unsplash.com/photo-'

export function photo(id, width = 1200) {
  if (id.startsWith('http') || id.startsWith('/')) return id
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=78`
}

export function photoSrcSet(id, widths = [480, 800, 1200, 1800]) {
  if (id.startsWith('http') || id.startsWith('/')) return undefined
  return widths.map((w) => `${photo(id, w)} ${w}w`).join(', ')
}
