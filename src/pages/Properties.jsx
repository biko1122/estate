import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX, X } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SearchFilters from '../components/property/SearchFilters'
import PropertyGrid from '../components/property/PropertyGrid'
import Dropdown from '../components/ui/Dropdown'
import Button from '../components/ui/Button'
import { CtaBanner } from '../components/home/Sections'
import { properties } from '../data/properties'
import { amenities } from '../data/amenities'
import { P } from '../data/photos'
import {
  applyFilters, areaOptions, priceOptions, readFilters, sortOptions, toSearchString,
} from '../utils/filters'

const PAGE_SIZE = 9

function chipLabel(key, value, filters) {
  switch (key) {
    case 'purpose': return value === 'sale' ? 'For sale' : 'For rent'
    case 'beds': return `${value}+ beds`
    case 'baths': return `${value}+ baths`
    case 'area': return areaOptions.find((o) => o.value === value)?.label
    case 'price': return priceOptions(filters.purpose).find((o) => o.value === value)?.label ?? priceOptions('').find((o) => o.value === value)?.label
    default: return value
  }
}

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const filters = readFilters(params)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const results = useMemo(() => applyFilters(properties, filters), [params]) // eslint-disable-line react-hooks/exhaustive-deps
  const shown = results.slice(0, visible)

  const update = (patch) => {
    setParams(toSearchString({ ...filters, ...patch }), { replace: true, preventScrollReset: true })
    setVisible(PAGE_SIZE)
  }
  const clearAll = () => update({ purpose: '', location: '', type: '', price: '', beds: '', baths: '', area: '', amenities: '' })

  const chips = [
    ...['purpose', 'location', 'type', 'price', 'beds', 'baths', 'area']
      .filter((k) => filters[k])
      .map((k) => ({ key: k, label: chipLabel(k, filters[k], filters), clear: () => update({ [k]: '' }) })),
    ...(filters.amenities ? filters.amenities.split(',') : []).map((a) => ({
      key: `a-${a}`,
      label: amenities[a]?.label ?? a,
      clear: () => update({ amenities: filters.amenities.split(',').filter((x) => x !== a).join(',') }),
    })),
  ]

  const heading = filters.location
    ? `Homes in ${filters.location}`
    : filters.purpose === 'rent'
      ? 'Homes for rent'
      : filters.purpose === 'sale'
        ? 'Homes for sale'
        : 'All properties'

  return (
    <>
      <PageHero
        image={P.houseTreeDusk}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Properties' }]}
        title="Properties"
        intro="Villas, apartments and coastal homes across Greater Cairo and the North Coast — every listing visited and verified by our team."
      >
        <SearchFilters filters={filters} onChange={update} onClear={clearAll} resultCount={results.length} />
      </PageHero>

      <section className="pb-24 pt-12 sm:pt-14 lg:pb-32">
        <div className="container-x">
          <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-[1.9rem] leading-tight sm:text-[2.2rem]">{heading}</h2>
              <p className="mt-1.5 text-[0.92rem] text-muted" aria-live="polite">
                <span className="tabular font-semibold text-ink">{results.length}</span> {results.length === 1 ? 'home matches' : 'homes match'} your search
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-[0.85rem] text-muted sm:inline">Sort by</span>
              <Dropdown
                variant="pill"
                label="Recommended"
                placeholder="Recommended"
                value={filters.sort}
                onChange={(v) => update({ sort: v })}
                options={sortOptions}
                align="right"
                className="w-[210px]"
              />
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.clear}
                  className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-limestone pl-3.5 pr-2.5 text-[0.82rem] font-medium text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {c.label}
                  <X size={14} className="opacity-60 group-hover:opacity-100" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="ml-1 text-[0.82rem] font-semibold text-accent underline-offset-4 hover:underline">
                Clear all
              </button>
            </div>
          )}

          {results.length > 0 ? (
            <>
              <PropertyGrid properties={shown} className="mt-10" key={params.toString()} />
              <div className="mt-16 flex flex-col items-center gap-4">
                <p className="text-[0.85rem] text-muted">
                  Showing <span className="tabular font-semibold text-ink">{shown.length}</span> of{' '}
                  <span className="tabular font-semibold text-ink">{results.length}</span>
                </p>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${(shown.length / results.length) * 100}%` }} />
                </div>
                {shown.length < results.length && (
                  <Button variant="outline" size="lg" className="mt-3" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load more homes
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="mt-12 flex flex-col items-center rounded-[1.5rem] border border-dashed border-line bg-limestone/50 px-6 py-20 text-center">
              <span className="arch grid h-20 w-16 place-items-center bg-white pt-3 text-muted">
                <SearchX size={26} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-[1.7rem]">No homes match these filters</h3>
              <p className="mt-2 max-w-md text-[0.95rem] text-muted">
                Try removing a filter or two — or tell us what you need and we’ll look off-market for you.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button onClick={clearAll} variant="dark">Clear all filters</Button>
                <Button to="/contact" variant="outline">Ask a consultant</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        title="Can’t find the right home?"
        text="Many of our best homes are never listed publicly. Tell us what you need and we’ll search off-market for you."
      />
    </>
  )
}
