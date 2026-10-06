import { Link } from 'react-router-dom'
import { ArrowUp, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import SocialIcons from '../ui/SocialIcons'
import { site } from '../../config/site'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'All properties', to: '/properties' },
      { label: 'About the agency', to: '/about' },
      { label: 'Saved homes', to: '/favorites' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Properties',
    links: [
      { label: 'Homes for sale', to: '/properties?purpose=sale' },
      { label: 'Homes for rent', to: '/properties?purpose=rent' },
      { label: 'Villas', to: '/properties?type=Villa' },
      { label: 'Apartments', to: '/properties?type=Apartment' },
      { label: 'North Coast', to: '/properties?location=North+Coast' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-basalt text-white">
      {/* oversized arch outline as a quiet signature */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-10 h-[520px] w-[520px] text-white/[0.04]"
      >
        <path d="M60 400V200a140 140 0 0 1 280 0v200" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M120 400V210a80 80 0 0 1 160 0v190" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="container-x relative pt-20 pb-10">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">{site.description}</p>
            <SocialIcons
              className="mt-8"
              itemClassName="border-white/15 text-white/80 hover:border-white hover:bg-white hover:text-ink"
            />
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="eyebrow text-white/45">{col.title}</h3>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[0.95rem] text-white/75 transition-colors duration-200 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="eyebrow text-white/45">Contact</h3>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-white/75">
              <li>
                <a href={site.phoneHref} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Phone size={17} className="mt-0.5 shrink-0 text-accent-bright" />
                  <span className="tabular">{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail size={17} className="mt-0.5 shrink-0 text-accent-bright" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-accent-bright" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={17} className="mt-0.5 shrink-0 text-accent-bright" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: <span className="text-white">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-[0.85rem] text-white/45">
            © {year} {site.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-[0.85rem] font-medium text-white/60 transition-colors hover:text-white"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-all group-hover:-translate-y-0.5 group-hover:border-white">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
