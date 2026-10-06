import { Compass, Eye } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import Img from '../components/ui/Img'
import Reveal from '../components/ui/Reveal'
import SectionHeader, { Eyebrow } from '../components/ui/SectionHeader'
import AgentCard from '../components/home/AgentCard'
import { CtaBanner, StatsRow, WhyChooseUs } from '../components/home/Sections'
import { agents } from '../data/agents'
import { P } from '../data/photos'
import { site } from '../config/site'

const milestones = [
  { year: site.founded, text: 'Opened our first office in the Fifth Settlement with three consultants.' },
  { year: 2017, text: 'Expanded west to Sheikh Zayed and 6th of October.' },
  { year: 2020, text: 'Launched a dedicated North Coast desk for resale and holiday lets.' },
  { year: 2024, text: 'Passed 500 homes sold and let, and opened a leasing team for relocating families.' },
]

export default function About() {
  return (
    <>
      <PageHero
        tall
        image={P.cairo}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow={`Since ${site.founded}`}
        title="We help people find homes in the city we grew up in."
        intro="Saray Estates is an independent Cairo agency. We advise buyers, tenants and owners — and we only list homes we’ve walked through ourselves."
      />

      {/* Story */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="mb-4">Our story</Eyebrow>
            <h2 className="font-display text-[2.1rem] leading-[1.06] sm:text-[2.6rem] lg:text-[3rem]">
              Started with three people and one rule.
            </h2>
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted">
              <p>
                In {site.founded}, Karim Mansour left a decade in developer sales to start an agency that worked for buyers rather than inventory. The rule from day one: never list a home the team hasn’t walked through, measured and title-checked.
              </p>
              <p>
                That rule slowed us down at first. It also meant clients stopped wasting Saturdays on viewings that didn’t match the photos — and started sending their friends.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-8">
            <Reveal className="grid grid-cols-5 gap-4">
              <div className="arch col-span-3 aspect-[3/4] bg-limestone shadow-lift">
                <Img id={P.glassStairs} alt="Interior of a penthouse listing" width={800} sizes="(min-width:1024px) 420px, 60vw" />
              </div>
              <div className="col-span-2 flex flex-col gap-4 pt-16">
                <div className="aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-limestone">
                  <Img id={P.houseGarden} alt="A townhouse garden" width={500} sizes="280px" />
                </div>
                <div className="rounded-[1.25rem] bg-accent p-5 text-white">
                  <p className="font-display text-[2.2rem] leading-none">4</p>
                  <p className="mt-1 text-[0.82rem] text-white/75">regional desks across Cairo and the coast</p>
                </div>
              </div>
            </Reveal>

            <ol className="mt-14 border-l border-line">
              {milestones.map((m, i) => (
                <Reveal as="li" key={m.year} delay={i * 80} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-white" />
                  <p className="tabular font-display text-[1.4rem] leading-none text-accent">{m.year}</p>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-ink/80">{m.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="relative overflow-hidden bg-basalt py-24 sm:py-28 lg:py-32">
        <svg aria-hidden="true" viewBox="0 0 400 400" className="pointer-events-none absolute -right-20 top-0 h-[600px] w-[600px] text-white/[0.035]">
          <path d="M60 400V200a140 140 0 0 1 280 0v200" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M120 400V210a80 80 0 0 1 160 0v190" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="container-x relative">
          <SectionHeader tone="dark" eyebrow="What drives us" title="Mission & vision" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Compass,
                label: 'Our mission',
                text: 'To make buying, renting or selling a home in Egypt clear and fair — with honest advice, verified listings and one person you can call at every step.',
              },
              {
                icon: Eye,
                label: 'Our vision',
                text: 'To be the agency Cairo families recommend first: known less for the number of listings we carry than for the trust our clients place in us.',
              },
            ].map(({ icon: Icon, label, text }, i) => (
              <Reveal key={label} delay={i * 100} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 transition-colors duration-500 hover:bg-white/[0.07] sm:p-10">
                <span className="arch grid h-16 w-14 place-items-center bg-accent pt-2 text-white">
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="mt-8 font-display text-[1.9rem] text-white">{label}</h3>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-white/65">{text}</p>
              </Reveal>
            ))}
          </div>
          <StatsRow tone="dark" className="mt-20 border-t border-white/10 pt-14 lg:grid-cols-4" />
        </div>
      </section>

      <WhyChooseUs />

      {/* Team */}
      <section className="py-24 sm:py-28 lg:py-32">
        <div className="container-x">
          <SectionHeader
            align="center"
            eyebrow="Our team"
            title="The people you’ll actually speak to"
            intro="No call centres and no hand-offs. Each client works with one consultant from first call to keys."
          />
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((a, i) => (
              <Reveal key={a.id} delay={i * 90}>
                <AgentCard agent={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
