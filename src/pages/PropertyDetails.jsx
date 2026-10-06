import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ArrowRight, Bath, BedDouble, Building2, CalendarDays, Car, Check, Copy, Hash, Mail, MapPin, Maximize, MessageCircle,
  Phone, Share2, Sofa,
} from 'lucide-react'
import Gallery from '../components/property/Gallery'
import FavoriteButton from '../components/property/FavoriteButton'
import { PurposeBadge } from '../components/property/PropertyCard'
import PriceTag from '../components/property/PriceTag'
import PropertyGrid from '../components/property/PropertyGrid'
import ViewingModal from '../components/property/ViewingModal'
import Breadcrumb from '../components/ui/Breadcrumb'
import Button from '../components/ui/Button'
import Img from '../components/ui/Img'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import { getProperty, getSimilar } from '../data/properties'
import { getAgent } from '../data/agents'
import { amenities } from '../data/amenities'
import { formatArea, formatNumber } from '../utils/format'
import NotFound from './NotFound'

function Fact({ icon: Icon, label, value }) {
  return (
    <div>
      <Icon size={20} strokeWidth={1.5} className="text-accent" />
      <span className="mt-3 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
      <span className="tabular mt-0.5 block whitespace-nowrap text-[1.05rem] font-semibold text-ink">{value}</span>
    </div>
  )
}

function ShareButton() {
  const [copied, setCopied] = useState(false)
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      /* clipboard blocked — still show feedback in the demo */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[0.88rem] font-semibold text-ink transition-all hover:border-ink active:scale-95"
    >
      {copied ? <Check size={17} className="text-accent" /> : <Share2 size={17} />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}

function AgentPanel({ agent, property, onRequest }) {
  const firstName = agent.name.split(' ')[0]
  const waText = encodeURIComponent(`Hello ${firstName}, I'm interested in ${property.title} (${property.id}).`)
  return (
    <div className="rounded-[1.5rem] border border-line bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-center gap-4">
        <div className="arch h-[84px] w-[68px] shrink-0 bg-limestone">
          <Img id={agent.photo} alt={agent.name} width={200} className="object-top" />
        </div>
        <div className="min-w-0">
          <p className="eyebrow text-[0.62rem] text-accent">Listing agent</p>
          <p className="mt-1 font-display text-[1.35rem] leading-tight">{agent.name}</p>
          <p className="text-[0.84rem] text-muted">{agent.role}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5 border-y border-line py-5 text-[0.9rem]">
        <li>
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-ink transition-colors hover:text-accent">
            <Phone size={16} className="text-muted" />
            <span className="tabular">{agent.phone}</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-ink transition-colors hover:text-accent">
            <Mail size={16} className="text-muted" />
            <span className="truncate">{agent.email}</span>
          </a>
        </li>
      </ul>

      <div className="mt-5 space-y-2.5">
        <Button size="lg" className="w-full" onClick={onRequest}>
          <CalendarDays size={18} />
          Request a viewing
        </Button>
        <Button href={`mailto:${agent.email}?subject=${encodeURIComponent(`${property.title} (${property.id})`)}`} variant="dark" size="lg" className="w-full">
          <Mail size={17} />
          Contact agent
        </Button>
        <div className="grid grid-cols-2 gap-2.5">
          <Button href={`https://wa.me/${agent.phone.replace(/\D/g, '')}?text=${waText}`} target="_blank" rel="noreferrer" variant="outline" className="w-full">
            <MessageCircle size={17} />
            WhatsApp
          </Button>
          <Button href={`tel:${agent.phone.replace(/\s/g, '')}`} variant="outline" className="w-full">
            <Phone size={16} />
            Call
          </Button>
        </div>
      </div>
      <p className="mt-5 text-center text-[0.78rem] text-muted">Usually replies within the hour, Sat – Thu</p>
    </div>
  )
}

export default function PropertyDetails() {
  const { slug } = useParams()
  const property = getProperty(slug)
  const [viewingOpen, setViewingOpen] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  if (!property) return <NotFound />

  const agent = getAgent(property.agentId)
  const similar = getSimilar(property, 3)

  const copyId = () => {
    navigator.clipboard?.writeText(property.id).catch(() => {})
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 1500)
  }

  const details = [
    ['Property ID', property.id],
    ['Type', property.type],
    ['Status', property.purpose === 'sale' ? 'For sale' : 'For rent'],
    ['Built-up area', formatArea(property.area)],
    property.plot && ['Plot size', formatArea(property.plot)],
    property.floor && ['Floor', property.floor],
    ['Bedrooms', property.beds],
    ['Bathrooms', property.baths],
    ['Parking', `${property.parking} ${property.parking === 1 ? 'space' : 'spaces'}`],
    ['Furnishing', property.furnishing],
    ['Year built', String(property.yearBuilt)],
  ].filter(Boolean)

  return (
    <>
      <div className="pt-24 sm:pt-28">
        <div className="container-x">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'Properties', to: '/properties' },
              { label: property.location, to: `/properties?location=${encodeURIComponent(property.location)}` },
              { label: property.title },
            ]}
            className="mb-6"
          />

          {/* Title row */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <PurposeBadge purpose={property.purpose} className="border border-line" />
                {property.tag && (
                  <span className="rounded-full bg-accent-soft px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent">
                    {property.tag}
                  </span>
                )}
                <button
                  type="button"
                  onClick={copyId}
                  className="tabular inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.75rem] font-medium text-muted transition-colors hover:bg-limestone hover:text-ink"
                  title="Copy property ID"
                >
                  {copiedId ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                  {property.id}
                </button>
              </div>
              <h1 className="mt-4 font-display text-[2.4rem] leading-[1.05] sm:text-[3rem] lg:text-[3.6rem]">{property.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-[1rem] text-muted">
                <MapPin size={17} className="text-accent" />
                {property.district}, {property.location}
              </p>
            </div>
            <div className="flex flex-col gap-4 animate-fade-up [animation-delay:120ms] lg:items-end">
              <PriceTag property={property} size="lg" />
              <div className="flex gap-2">
                <FavoriteButton property={property} variant="labelled" />
                <ShareButton />
              </div>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <Gallery images={property.images} title={property.title} />
          </div>
        </div>
      </div>

      <section className="pb-24 pt-12 lg:pb-32 lg:pt-16">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            {/* Key facts */}
            <Reveal className="grid grid-cols-2 gap-x-6 gap-y-7 rounded-[1.5rem] bg-limestone p-6 sm:grid-cols-5 sm:divide-x sm:divide-line sm:p-8 [&>*]:sm:pl-6 [&>*:first-child]:sm:pl-0">
              <Fact icon={Building2} label="Type" value={property.type} />
              <Fact icon={BedDouble} label="Bedrooms" value={property.beds} />
              <Fact icon={Bath} label="Bathrooms" value={property.baths} />
              <Fact icon={Maximize} label="Area" value={formatArea(property.area)} />
              <Fact icon={Hash} label="Property ID" value={property.id} />
            </Reveal>

            {/* Description */}
            <Reveal className="mt-14">
              <h2 className="font-display text-[1.9rem]">About this home</h2>
              <p className="mt-5 text-[1.12rem] leading-relaxed text-ink">{property.summary}</p>
              <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-ink/75">
                {property.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Amenities */}
            <Reveal className="mt-14 border-t border-line pt-14">
              <h2 className="font-display text-[1.9rem]">Features & amenities</h2>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {property.amenities.map((key) => {
                  const a = amenities[key]
                  if (!a) return null
                  const Icon = a.icon
                  return (
                    <li key={key} className="flex items-center gap-3.5 rounded-2xl border border-line px-4 py-3.5 transition-colors hover:border-accent/40 hover:bg-accent-soft/40">
                      <Icon size={19} strokeWidth={1.6} className="shrink-0 text-accent" />
                      <span className="text-[0.95rem] font-medium">{a.label}</span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            {/* Details table */}
            <Reveal className="mt-14 border-t border-line pt-14">
              <h2 className="font-display text-[1.9rem]">Property details</h2>
              <dl className="mt-7 grid gap-x-10 sm:grid-cols-2">
                {details.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-line py-3.5 text-[0.95rem]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="tabular font-semibold text-ink">{typeof v === 'number' ? formatNumber(v) : v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* Location */}
            <Reveal className="mt-14 border-t border-line pt-14">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-[1.9rem]">Location</h2>
                <p className="flex items-center gap-2 text-[0.92rem] text-muted">
                  <MapPin size={16} className="text-accent" /> {property.district}, {property.location}
                </p>
              </div>
              <MapPlaceholder
                pin={property.mapPin}
                label={property.title}
                sublabel={`${property.district}, ${property.location}`}
                className="mt-7 aspect-[16/10] rounded-[1.5rem] sm:aspect-[16/8]"
              />
              <ul className="mt-5 grid gap-3 text-[0.9rem] sm:grid-cols-3">
                {[
                  ['Schools', '5 min drive'],
                  ['Shopping', '8 min drive'],
                  ['Main road', '3 min drive'],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between rounded-xl bg-limestone px-4 py-3">
                    <span className="text-muted">{k}</span>
                    <span className="font-semibold">{v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-28">
              <AgentPanel agent={agent} property={property} onRequest={() => setViewingOpen(true)} />
              <div className="flex items-center gap-4 rounded-[1.25rem] bg-limestone p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-accent">
                  {property.furnishing === 'Fully furnished' ? <Sofa size={19} /> : <Car size={19} />}
                </span>
                <p className="text-[0.88rem] leading-snug text-muted">
                  <span className="font-semibold text-ink">{property.furnishing}</span> · {property.parking} parking {property.parking === 1 ? 'space' : 'spaces'} included
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar */}
      <section className="bg-limestone py-24 lg:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow="You may also like"
            title="Similar properties"
            action={
              <Button to="/properties" variant="outline">
                View all <ArrowRight size={16} />
              </Button>
            }
          />
          <PropertyGrid properties={similar} className="mt-12" />
        </div>
      </section>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`} aria-label="Call agent" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink active:scale-95">
            <Phone size={18} />
          </a>
          <a href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp agent" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-ink active:scale-95">
            <MessageCircle size={18} />
          </a>
          <Button size="lg" className="flex-1" onClick={() => setViewingOpen(true)}>
            Request a viewing
          </Button>
        </div>
      </div>
      <div className="h-20 lg:hidden" />

      <ViewingModal open={viewingOpen} onClose={() => setViewingOpen(false)} property={property} agent={agent} />
    </>
  )
}
