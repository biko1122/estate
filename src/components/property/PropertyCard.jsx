import { Link } from 'react-router-dom'
import { ArrowRight, Camera, MapPin } from 'lucide-react'
import Img from '../ui/Img'
import FavoriteButton from './FavoriteButton'
import PropertySpecs from './PropertySpecs'
import PriceTag from './PriceTag'

export function PurposeBadge({ purpose, className = '' }) {
  const sale = purpose === 'sale'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] backdrop-blur-md ${
        sale ? 'bg-white/90 text-ink' : 'bg-ink/80 text-white'
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${sale ? 'bg-accent' : 'bg-accent-bright'}`} />
      {sale ? 'For sale' : 'For rent'}
    </span>
  )
}

export default function PropertyCard({ property, priority = false }) {
  const href = `/properties/${property.slug}`
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line/70 bg-white shadow-card transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-limestone">
        <Link to={href} tabIndex={-1} aria-hidden="true" className="block h-full">
          <Img
            id={property.images[0]}
            alt=""
            width={800}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="group-hover:scale-[1.06] duration-[1200ms]!"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
          <PurposeBadge purpose={property.purpose} />
          {property.tag && (
            <span className="rounded-full bg-accent px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
              {property.tag}
            </span>
          )}
        </div>
        <FavoriteButton property={property} className="absolute right-4 top-4" />

        <div className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-center justify-between text-[0.75rem] font-medium text-white/90">
          <span className="flex items-center gap-1.5">
            <Camera size={13} /> {property.images.length}
          </span>
          <span className="tracking-[0.08em]">{property.type}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-[0.82rem] text-muted">
          <MapPin size={14} strokeWidth={1.8} className="shrink-0 text-accent" />
          <span className="truncate">
            {property.district}, {property.location}
          </span>
        </p>
        <h3 className="mt-2 font-display text-[1.45rem] leading-tight text-ink">
          <Link to={href} className="transition-colors duration-300 hover:text-accent">
            {property.title}
          </Link>
        </h3>
        <PriceTag property={property} className="mt-3" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-4 border-t border-line pt-4">
          <PropertySpecs property={property} />
        </div>

        <Link
          to={href}
          className="mt-5 inline-flex h-11 items-center justify-between rounded-full bg-limestone pl-5 pr-1.5 text-[0.88rem] font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-white"
        >
          View property
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>
    </article>
  )
}
