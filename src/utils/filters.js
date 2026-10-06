import { priceRanges, areaRanges, propertyTypes } from '../data/properties'
import { locations } from '../data/locations'

// Filters live in the URL (?purpose=sale&location=Maadi…) so searches are
// shareable and the hero search can hand off to the listing page.
export const FILTER_KEYS = ['purpose', 'location', 'type', 'price', 'beds', 'baths', 'area', 'amenities', 'sort']

export function readFilters(params) {
  const f = {}
  for (const k of FILTER_KEYS) f[k] = params.get(k) ?? ''
  return f
}

export function toSearchString(filters) {
  const params = new URLSearchParams()
  for (const k of FILTER_KEYS) if (filters[k]) params.set(k, filters[k])
  const s = params.toString()
  return s ? `?${s}` : ''
}

export const locationOptions = locations.map((l) => ({ value: l.name, label: l.name }))
export const typeOptions = propertyTypes.map((t) => ({ value: t, label: t }))
export const bedOptions = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ bedrooms` }))
export const bathOptions = [1, 2, 3, 4].map((n) => ({ value: String(n), label: `${n}+ bathrooms` }))
export const areaOptions = areaRanges.map((r, i) => ({ value: String(i), label: r.label }))
export const sortOptions = [
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'area-desc', label: 'Largest first' },
]

/** Price values are "sale:1" / "rent:0" so they stay meaningful when purpose is "all". */
export function priceOptions(purpose) {
  const groups = purpose ? [purpose] : ['sale', 'rent']
  return groups.flatMap((g) =>
    priceRanges[g].map((r, i) => ({
      value: `${g}:${i}`,
      label: purpose ? r.label : `${g === 'sale' ? 'Buy' : 'Rent'} · ${r.label}`,
    })),
  )
}

export function applyFilters(list, f) {
  const amenities = f.amenities ? f.amenities.split(',') : []
  let out = list.filter((p) => {
    if (f.purpose && p.purpose !== f.purpose) return false
    if (f.location && p.location !== f.location) return false
    if (f.type && p.type !== f.type) return false
    if (f.beds && p.beds < Number(f.beds)) return false
    if (f.baths && p.baths < Number(f.baths)) return false
    if (f.area) {
      const r = areaRanges[Number(f.area)]
      if (r && (p.area < r.min || p.area >= r.max)) return false
    }
    if (f.price) {
      const [g, i] = f.price.split(':')
      const r = priceRanges[g]?.[Number(i)]
      if (r && (p.purpose !== g || p.price < r.min || p.price >= r.max)) return false
    }
    if (amenities.length && !amenities.every((a) => p.amenities.includes(a))) return false
    return true
  })
  if (f.sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price)
  if (f.sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price)
  if (f.sort === 'area-desc') out = [...out].sort((a, b) => b.area - a.area)
  return out
}
