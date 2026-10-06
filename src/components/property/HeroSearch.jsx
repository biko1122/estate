import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BedDouble, Building2, MapPin, Search, Wallet } from 'lucide-react'
import Dropdown from '../ui/Dropdown'
import Segmented from '../ui/Segmented'
import { properties } from '../../data/properties'
import { bedOptions, locationOptions, priceOptions, toSearchString, typeOptions } from '../../utils/filters'

/** The search panel on the home hero. Hands its values to /properties via the URL. */
export default function HeroSearch({ className = '' }) {
  const navigate = useNavigate()
  const [f, setF] = useState({ purpose: 'sale', location: '', type: '', price: '', beds: '' })
  const set = (k) => (v) => setF((prev) => ({ ...prev, [k]: v }))

  const setPurpose = (purpose) => setF((prev) => ({ ...prev, purpose, price: '' }))

  const submit = (e) => {
    e.preventDefault()
    navigate(`/properties${toSearchString(f)}`)
  }

  return (
    <form
      onSubmit={submit}
      className={`rounded-[1.75rem] bg-white p-3 shadow-panel sm:p-4 ${className}`}
      aria-label="Search properties"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-3 pt-1 sm:px-2">
        <Segmented
          value={f.purpose}
          onChange={setPurpose}
          options={[
            { value: 'sale', label: 'Buy' },
            { value: 'rent', label: 'Rent' },
          ]}
          size="sm"
        />
        <p className="hidden text-[0.82rem] text-muted md:block">
          <span className="font-semibold text-ink">{properties.length} homes</span> verified this month
        </p>
      </div>

      <div className="grid gap-1 border-t border-line pt-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.85fr_auto] lg:items-center lg:gap-0">
        <Dropdown label="Location" icon={MapPin} value={f.location} onChange={set('location')} options={locationOptions} placeholder="Any area" />
        <Dropdown label="Property type" icon={Building2} value={f.type} onChange={set('type')} options={typeOptions} placeholder="Any type" className="lg:border-l lg:border-line lg:pl-1" />
        <Dropdown label="Price range" icon={Wallet} value={f.price} onChange={set('price')} options={priceOptions(f.purpose)} placeholder="Any price" className="lg:border-l lg:border-line lg:pl-1" />
        <Dropdown label="Bedrooms" icon={BedDouble} value={f.beds} onChange={set('beds')} options={bedOptions} placeholder="Any" align="right" className="lg:border-l lg:border-line lg:pl-1" />
        <button
          type="submit"
          className="mt-2 flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-accent px-7 text-[0.95rem] font-semibold text-white shadow-[0_12px_26px_-12px_var(--color-accent)] transition-all duration-300 hover:bg-accent-dark active:scale-[0.98] sm:col-span-2 lg:col-span-1 lg:mt-0 lg:ml-2 lg:h-[3.75rem]"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </form>
  )
}
