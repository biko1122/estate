import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'
import Img from '../ui/Img'
import HeroSearch from '../property/HeroSearch'
import { P } from '../../data/photos'
import { getProperty } from '../../data/properties'
import { formatPriceShort } from '../../utils/format'
import { site } from '../../config/site'

const spotlight = getProperty('sunset-pool-villa-sheikh-zayed')

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative flex min-h-[640px] items-end overflow-hidden bg-basalt pb-10 pt-32 sm:min-h-[720px] lg:h-[92vh] lg:max-h-[940px] lg:min-h-[760px] lg:pb-40">
        <div className="absolute inset-0 animate-[fade-in_1.6s_ease_both]">
          <Img id={P.villaWhitePool} alt="" width={2000} priority className="animate-[hero-zoom_16s_ease-out_both]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1113]/85 via-[#0d1113]/45 to-[#0d1113]/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1113]/70 via-transparent to-transparent" />

        <div className="container-x relative">
          <div className="max-w-[720px]">
            <p className="eyebrow flex items-center gap-3 text-white/80 animate-fade-up">
              <span className="h-px w-10 bg-accent-bright" />
              {site.tagline}
            </p>
            <h1 className="mt-6 font-display text-[2.9rem] leading-[1.02] text-white animate-fade-up [animation-delay:120ms] sm:text-[4rem] lg:text-[5.4rem]">
              The right home,
              <br />
              <em className="font-normal text-white/90">found with care.</em>
            </h1>
            <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-white/75 animate-fade-up [animation-delay:240ms] sm:text-[1.12rem]">
              Verified villas, apartments and coastal homes across Greater Cairo — and one advisor beside you from first viewing to signed contract.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:360ms]">
              <Button to="/properties" size="lg">
                Explore properties
                <ArrowRight size={17} className="transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
              <Button to="/contact" variant="glass" size="lg">
                Contact us
              </Button>
            </div>
          </div>
        </div>

        {/* Spotlight listing — desktop only */}
        {spotlight && (
          <Link
            to={`/properties/${spotlight.slug}`}
            className="group absolute bottom-48 right-10 hidden w-[300px] items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-3 pr-4 text-white backdrop-blur-xl transition-all duration-500 hover:bg-white/20 xl:flex animate-fade-up [animation-delay:700ms]"
          >
            <span className="arch h-20 w-16 shrink-0">
              <Img id={spotlight.images[0]} alt="" width={200} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="eyebrow text-[0.6rem] text-accent-bright">{spotlight.tag}</span>
              <span className="mt-1 block truncate font-display text-[1.15rem]">{spotlight.title}</span>
              <span className="mt-0.5 block text-[0.8rem] text-white/70">
                {spotlight.location} · {formatPriceShort(spotlight.price)}
              </span>
            </span>
            <ArrowUpRight size={18} className="shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Search panel overlaps the hero edge on large screens */}
      <div className="container-x relative z-20 -mt-6 lg:-mt-28">
        <HeroSearch className="animate-fade-up [animation-delay:500ms]" />
      </div>
    </section>
  )
}
