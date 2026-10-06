import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Img from '../ui/Img'

/** Arch-topped neighbourhood card — the site's signature doorway shape. */
export default function LocationCard({ location, count }) {
  return (
    <Link
      to={`/properties?location=${encodeURIComponent(location.name)}`}
      className="group block focus-visible:outline-offset-4"
      aria-label={`${location.name} — ${count} properties`}
    >
      <div className="arch relative aspect-[3/4] bg-limestone shadow-card transition-shadow duration-500 group-hover:shadow-lift">
        <Img
          id={location.image}
          alt=""
          width={700}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 75vw"
          className="group-hover:scale-[1.07] duration-[1400ms]!"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1113]/80 via-[#0d1113]/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
          <p className="tabular text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            {count} {count === 1 ? 'property' : 'properties'}
          </p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <h3 className="font-display text-[1.75rem] leading-none sm:text-[2rem]">{location.name}</h3>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
              <ArrowUpRight size={17} />
            </span>
          </div>
          <p className="mt-3 text-[0.88rem] leading-snug text-white/70">{location.blurb}</p>
        </div>
      </div>
    </Link>
  )
}
