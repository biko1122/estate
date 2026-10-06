import { useState } from 'react'
import { ArrowRight, CircleCheck, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import Button from '../components/ui/Button'
import MapPlaceholder from '../components/ui/MapPlaceholder'
import Reveal from '../components/ui/Reveal'
import { Field, Select, TextArea, TextInput } from '../components/ui/Form'
import { P } from '../data/photos'
import { site } from '../config/site'

const subjects = ['I want to buy a home', 'I want to rent a home', 'I want to sell or let my property', 'Book a valuation', 'Something else']

function InfoCard({ icon: Icon, title, children, href }) {
  const body = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <Icon size={20} strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">{title}</span>
        <span className="mt-1 block text-[1rem] font-medium leading-snug text-ink">{children}</span>
      </span>
    </>
  )
  const cls = 'group flex items-start gap-4 rounded-[1.25rem] border border-line bg-white p-5 transition-all duration-300'
  return href ? (
    <a href={href} className={`${cls} hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card`}>{body}</a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        image={P.livingStairs}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Get in touch"
        title="Let’s talk about your next home."
        intro="Call, message or visit our New Cairo office. A consultant will get back to you within one working day."
      />

      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-[2rem] leading-tight sm:text-[2.4rem]">Contact information</h2>
              <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-muted">
                Prefer to talk it through? Our consultants answer the phone themselves.
              </p>
            </Reveal>
            <Reveal delay={60} className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard icon={Phone} title="Phone" href={site.phoneHref}>
                <span className="tabular">{site.phone}</span>
              </InfoCard>
              <InfoCard icon={Mail} title="Email" href={`mailto:${site.email}`}>
                {site.email}
              </InfoCard>
              <InfoCard icon={MapPin} title="Office">
                {site.address.line1}
                <br />
                <span className="text-muted">{site.address.line2}</span>
              </InfoCard>
              <InfoCard icon={Clock} title="Working hours">
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days} <span className="text-muted">· {h.time}</span>
                  </span>
                ))}
              </InfoCard>
            </Reveal>
            <Reveal delay={120}>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group mt-2 flex items-center justify-between gap-4 rounded-[1.25rem] bg-basalt p-5 text-white transition-colors hover:bg-ink"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-bright text-ink">
                    <MessageCircle size={20} />
                  </span>
                  <span>
                    <span className="block font-semibold">Chat on WhatsApp</span>
                    <span className="block text-[0.85rem] text-white/60">Fastest way to reach us</span>
                  </span>
                </span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-card sm:p-10">
              {sent ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent animate-pop">
                    <CircleCheck size={30} />
                  </span>
                  <h3 className="mt-6 font-display text-[2rem] leading-tight">
                    Thank you{name ? `, ${name.split(' ')[0]}` : ''}.
                  </h3>
                  <p className="mt-3 max-w-sm text-[1rem] leading-relaxed text-muted">
                    Your message is with our team. A consultant will reply within one working day.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button to="/properties">Browse properties</Button>
                    <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div>
                    <h2 className="font-display text-[1.8rem] leading-tight">Send us a message</h2>
                    <p className="mt-2 text-[0.92rem] text-muted">Fields marked * are required.</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name *">
                      <TextInput required autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Field>
                    <Field label="Email *">
                      <TextInput required type="email" autoComplete="email" placeholder="you@example.com" />
                    </Field>
                    <Field label="Phone">
                      <TextInput type="tel" autoComplete="tel" placeholder="+20 1xx xxx xxxx" />
                    </Field>
                    <Field label="Subject *">
                      <Select required defaultValue="">
                        <option value="" disabled>Choose a subject</option>
                        {subjects.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </Select>
                    </Field>
                  </div>
                  <Field label="Message *">
                    <TextArea required placeholder="Tell us what you’re looking for — area, budget, timing…" />
                  </Field>
                  <label className="flex items-start gap-3 text-[0.88rem] text-muted">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]" />
                    Send me new listings that match what I’m looking for.
                  </label>
                  <div className="flex flex-col-reverse items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                    <p className="text-[0.8rem] text-muted">We never share your details.</p>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send message <ArrowRight size={17} />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <Reveal>
            <MapPlaceholder
              pin={[58, 52]}
              label={`${site.name} — Head office`}
              sublabel={site.address.line1}
              className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[16/7]"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
