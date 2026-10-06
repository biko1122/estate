import { ArrowRight, Check } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import CountUp from '../ui/CountUp'
import SectionHeader, { Eyebrow } from '../ui/SectionHeader'
import PropertyGrid from '../property/PropertyGrid'
import LocationCard from './LocationCard'
import TestimonialCard from './TestimonialCard'
import { properties } from '../../data/properties'
import { locations } from '../../data/locations'
import { testimonials } from '../../data/testimonials'
import { advantages, stats } from '../../data/advantages'
import { P } from '../../data/photos'
import { site } from '../../config/site'

export function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured).slice(0, 6)
  return (
    <section className="py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Featured properties"
          title={
            <>
              Hand-picked homes, <em className="text-accent">this month</em>
            </>
          }
          intro="A selection of the listings our consultants are most excited about — every one visited, photographed and checked by our team."
          action={
            <Button to="/properties" variant="outline">
              View all properties <ArrowRight size={16} />
            </Button>
          }
        />
        <PropertyGrid properties={featured} className="mt-14" />
      </div>
    </section>
  )
}

export function WhyChooseUs({ tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <section className={`py-24 sm:py-28 lg:py-32 ${dark ? 'bg-basalt' : 'bg-limestone'}`}>
      <div className="container-x">
        <SectionHeader
          tone={tone}
          align="center"
          eyebrow="Why choose us"
          title="Buying a home is personal. So is how we work."
          intro="Four commitments every client gets, whether you’re renting a studio or buying a villa."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90} className="group bg-white p-8 transition-colors duration-500 hover:bg-[#fbfbf9] lg:p-9">
              <span className="arch grid h-16 w-14 place-items-center bg-accent-soft pt-2 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white">
                <Icon size={24} strokeWidth={1.6} />
              </span>
              <h3 className="mt-7 font-display text-[1.45rem] leading-tight">{title}</h3>
              <p className="mt-3 text-[0.94rem] leading-relaxed text-muted">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsRow({ tone = 'light', className = '' }) {
  const dark = tone === 'dark'
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-10 ${className}`}>
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 80} className={`flex flex-col border-l pl-5 ${dark ? 'border-white/15' : 'border-line'}`}>
          <dt className={`order-2 mt-2 text-[0.88rem] ${dark ? 'text-white/60' : 'text-muted'}`}>{s.label}</dt>
          <dd className={`font-display text-[2.6rem] leading-none sm:text-[3.2rem] ${dark ? 'text-white' : 'text-ink'}`}>
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </Reveal>
      ))}
    </dl>
  )
}

export function AboutIntro() {
  return (
    <section className="overflow-hidden py-24 sm:py-28 lg:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[520px] lg:mx-0">
            <div className="arch aspect-[4/5] w-[82%] bg-limestone shadow-lift">
              <Img id={P.livingModern} alt="A bright living room in one of our New Cairo listings" width={900} sizes="(min-width: 1024px) 440px, 80vw" />
            </div>
            <div className="absolute -bottom-8 right-0 aspect-square w-[46%] overflow-hidden rounded-[1.25rem] border-[6px] border-white bg-limestone shadow-lift">
              <Img id={P.villaPalms} alt="A white villa with palm trees" width={500} sizes="240px" />
            </div>
            <div className="absolute left-3 top-[12%] rounded-2xl bg-white px-5 py-4 shadow-lift sm:left-[-6%]">
              <p className="font-display text-[2.2rem] leading-none text-accent">
                <CountUp value={new Date().getFullYear() - site.founded} />
              </p>
              <p className="mt-1 text-[0.78rem] font-medium text-muted">years in Cairo</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <Eyebrow className="mb-4">About {site.name}</Eyebrow>
            <h2 className="font-display text-[2.1rem] leading-[1.06] sm:text-[2.6rem] lg:text-[3.1rem]">
              A small team that knows every street it sells on.
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">
              We started in {site.founded} with three consultants and a simple rule: never list a home we haven’t walked through ourselves. Today we advise buyers, tenants and owners across Greater Cairo and the North Coast — and the rule hasn’t changed.
            </p>
            <ul className="mt-7 space-y-3">
              {['Every listing visited and title-checked', 'Fair-price guidance on every offer', 'Support through contracts and handover'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[0.95rem] text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <StatsRow className="mt-12 border-t border-line pt-10" />
          <Reveal className="mt-10">
            <Button to="/about" variant="dark">
              More about us <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function PopularLocations() {
  const counts = Object.fromEntries(locations.map((l) => [l.name, properties.filter((p) => p.location === l.name).length]))
  return (
    <section className="bg-limestone py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Popular locations"
          title="Where our clients are moving"
          intro="From gated compounds in New Cairo to lagoon-front chalets on the coast — explore homes by neighbourhood."
          action={
            <Button to="/properties" variant="outline">
              Browse all areas <ArrowRight size={16} />
            </Button>
          }
        />
      </div>
      {/* Scrolls sideways on phones, grid from tablet up */}
      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:container-x sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3 lg:gap-8">
        {locations.map((l, i) => (
          <Reveal key={l.name} delay={(i % 3) * 90} className="w-[74vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none">
            <LocationCard location={l} count={counts[l.name]} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="py-24 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Client stories"
          title="What our clients say after the keys change hands"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBanner({
  title = 'Find a place you’ll love to call home.',
  text = 'Tell us what you’re looking for. A consultant will send you a shortlist within one working day — no obligation.',
}) {
  return (
    <section className="pb-24 sm:pb-28 lg:pb-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-basalt">
          <div className="grid items-stretch lg:grid-cols-12">
            <div className="relative z-10 px-7 py-14 sm:px-12 sm:py-16 lg:col-span-7 lg:px-16 lg:py-20">
              <Eyebrow tone="dark" className="mb-5">Start your search</Eyebrow>
              <h2 className="font-display text-[2.3rem] leading-[1.05] text-white sm:text-[3rem] lg:text-[3.6rem]">{title}</h2>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-white/65">{text}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button to="/properties" size="lg">
                  Browse properties <ArrowRight size={17} />
                </Button>
                <Button to="/contact" variant="glass" size="lg">
                  Contact us
                </Button>
              </div>
            </div>
            <div className="relative hidden min-h-[420px] lg:col-span-5 lg:block">
              <div className="arch absolute bottom-0 left-6 right-12 top-12">
                <Img id={P.mediterraneanSunset} alt="" width={900} sizes="480px" />
              </div>
            </div>
          </div>
          <svg aria-hidden="true" viewBox="0 0 400 400" className="pointer-events-none absolute -left-24 -bottom-40 h-[460px] w-[460px] text-white/[0.04] lg:hidden">
            <path d="M60 400V200a140 140 0 0 1 280 0v200" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </Reveal>
      </div>
    </section>
  )
}
