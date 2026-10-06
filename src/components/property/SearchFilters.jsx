import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, SlidersHorizontal, X } from 'lucide-react'
import Dropdown from '../ui/Dropdown'
import Segmented from '../ui/Segmented'
import Button from '../ui/Button'
import { amenities, filterableAmenities } from '../../data/amenities'
import {
  areaOptions, bathOptions, bedOptions, locationOptions, priceOptions, typeOptions,
} from '../../utils/filters'
import { useLockBody } from '../../hooks/useLockBody'

const purposeOptions = [
  { value: '', label: 'All' },
  { value: 'sale', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
]

function AmenityChips({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterableAmenities.map((key) => {
        const { label, icon: Icon } = amenities[key]
        const on = selected.includes(key)
        return (
          <button
            key={key}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(key)}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[0.85rem] font-medium transition-all duration-200 active:scale-95 ${
              on ? 'border-accent bg-accent-soft text-accent' : 'border-line bg-white text-ink/80 hover:border-ink/40'
            }`}
          >
            {on ? <Check size={15} /> : <Icon size={15} strokeWidth={1.7} />}
            {label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Listing-page filters. Desktop: an inline bar with a "More filters" drawer.
 * Mobile: purpose toggle + a "Filters" button that opens a bottom sheet.
 */
export default function SearchFilters({ filters, onChange, onClear, resultCount }) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  useLockBody(sheetOpen)

  const selectedAmenities = filters.amenities ? filters.amenities.split(',') : []
  const toggleAmenity = (key) => {
    const next = selectedAmenities.includes(key)
      ? selectedAmenities.filter((a) => a !== key)
      : [...selectedAmenities, key]
    onChange({ amenities: next.join(',') })
  }

  // A sale price band makes no sense once "Rent" is chosen, so drop it.
  const setPurpose = (v) => {
    const clearPrice = filters.price && v && !filters.price.startsWith(v)
    onChange(clearPrice ? { purpose: v, price: '' } : { purpose: v })
  }

  const activeCount = ['location', 'type', 'price', 'beds', 'baths', 'area'].filter((k) => filters[k]).length + selectedAmenities.length

  // Pills are narrow, so they get short labels; the mobile sheet uses full ones.
  const fields = (variant) => {
    const short = variant === 'pill'
    return (
      <>
        <Dropdown variant={variant} label="Location" value={filters.location} onChange={(v) => onChange({ location: v })} options={locationOptions} placeholder="Any location" />
        <Dropdown variant={variant} label={short ? 'Type' : 'Property type'} value={filters.type} onChange={(v) => onChange({ type: v })} options={typeOptions} placeholder="Any type" />
        <Dropdown variant={variant} label="Price" value={filters.price} onChange={(v) => onChange({ price: v })} options={priceOptions(filters.purpose)} placeholder="Any price" />
        <Dropdown variant={variant} label={short ? 'Beds' : 'Bedrooms'} value={filters.beds} onChange={(v) => onChange({ beds: v })} options={bedOptions} placeholder="Any" />
        <Dropdown variant={variant} label={short ? 'Baths' : 'Bathrooms'} value={filters.baths} onChange={(v) => onChange({ baths: v })} options={bathOptions} placeholder="Any" align="right" />
        <Dropdown variant={variant} label="Area" value={filters.area} onChange={(v) => onChange({ area: v })} options={areaOptions} placeholder="Any size" align="right" />
      </>
    )
  }

  return (
    <>
      <div className="rounded-[1.5rem] border border-line/70 bg-white p-3 shadow-panel sm:p-4">
        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <Segmented value={filters.purpose} onChange={setPurpose} options={purposeOptions} className="shrink-0" />
            <div className="grid min-w-0 flex-1 grid-cols-[1.15fr_1fr_1.25fr_0.9fr_0.9fr_0.9fr] gap-2">{fields('pill')}</div>
            <button
              type="button"
              onClick={() => setMoreOpen((o) => !o)}
              aria-expanded={moreOpen}
              className={`relative flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.88rem] font-semibold transition-all ${
                moreOpen || selectedAmenities.length ? 'border-accent bg-accent text-white' : 'border-line text-ink hover:border-ink/40'
              }`}
            >
              <SlidersHorizontal size={16} />
              More filters
              {selectedAmenities.length > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[0.7rem] font-bold text-accent">
                  {selectedAmenities.length}
                </span>
              )}
            </button>
          </div>
          <div
            className={`grid transition-all duration-500 ease-[var(--ease-out-soft)] ${moreOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
          >
            <div className="overflow-hidden">
              <div className="flex items-start justify-between gap-6 border-t border-line pt-4">
                <div>
                  <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">Features & amenities</p>
                  <AmenityChips selected={selectedAmenities} onToggle={toggleAmenity} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="flex items-center gap-2 lg:hidden">
          <Segmented value={filters.purpose} onChange={setPurpose} options={purposeOptions} className="flex-1" size="sm" />
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-[0.85rem] font-semibold text-white active:scale-95"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent-bright px-1 text-[0.7rem] font-bold text-ink">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile filter sheet — portalled so it sits above the navbar */}
      {createPortal(
      <div className={`fixed inset-0 z-[75] lg:hidden ${sheetOpen ? '' : 'pointer-events-none'}`} aria-hidden={!sheetOpen}>
        <div
          onClick={() => setSheetOpen(false)}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-400 ${sheetOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={`absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-[1.75rem] bg-white transition-transform duration-500 ease-[var(--ease-out-soft)] ${
            sheetOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-line" />
          <div className="flex items-center justify-between px-5 pb-3 pt-3">
            <h2 className="font-display text-[1.5rem]">Filters</h2>
            <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="grid h-10 w-10 place-items-center rounded-full bg-limestone">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto border-t border-line px-3 py-3">
            {sheetOpen && fields('field')}
            <div className="px-3 pt-4 pb-2">
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">Features & amenities</p>
              <AmenityChips selected={selectedAmenities} onToggle={toggleAmenity} />
            </div>
          </div>
          <div className="flex gap-3 border-t border-line p-4">
            <Button variant="outline" onClick={onClear} className="flex-1">
              Clear all
            </Button>
            <Button onClick={() => setSheetOpen(false)} className="flex-[1.6]">
              Show {resultCount} {resultCount === 1 ? 'home' : 'homes'}
            </Button>
          </div>
        </div>
      </div>,
      document.body,
      )}
    </>
  )
}
