import { useMemo, useState } from 'react'
import { CalendarCheck } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Field, TextInput } from '../ui/Form'

const times = ['10:00', '12:00', '14:00', '16:00', '18:00']

function nextDays(n) {
  const out = []
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 5) out.push(new Date(d)) // office closed Fridays
  }
  return out
}

/** "Request a viewing" flow — UI only, nothing is sent. */
export default function ViewingModal({ open, onClose, property, agent }) {
  const days = useMemo(() => nextDays(6), [])
  const [day, setDay] = useState(0)
  const [time, setTime] = useState('12:00')
  const [sent, setSent] = useState(false)

  const close = () => {
    onClose()
    setTimeout(() => setSent(false), 300)
  }

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const chosen = days[day]
  const dateLabel = chosen.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <Modal open={open} onClose={close} title={sent ? 'Viewing requested' : 'Request a viewing'}>
      {sent ? (
        <div className="py-4 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent animate-pop">
            <CalendarCheck size={28} />
          </span>
          <h3 className="mt-5 font-display text-[1.6rem] leading-tight">See you on {dateLabel.split(' ')[0]}</h3>
          <p className="mx-auto mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            {agent.name.split(' ')[0]} will call to confirm your visit to <span className="font-medium text-ink">{property.title}</span> on {dateLabel} at {time}.
          </p>
          <Button onClick={close} variant="dark" className="mt-7">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-6">
          <div>
            <p className="mb-3 text-[0.8rem] font-semibold text-ink">Choose a day</p>
            <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6">
              {days.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDay(i)}
                  aria-pressed={day === i}
                  className={`flex w-[68px] shrink-0 flex-col items-center rounded-2xl border py-3 transition-all duration-200 ${
                    day === i ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink/40'
                  }`}
                >
                  <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.1em] ${day === i ? 'text-white/70' : 'text-muted'}`}>
                    {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                  </span>
                  <span className="mt-1 font-display text-[1.5rem] leading-none">{d.getDate()}</span>
                  <span className={`mt-1 text-[0.7rem] ${day === i ? 'text-white/70' : 'text-muted'}`}>
                    {d.toLocaleDateString('en-GB', { month: 'short' })}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[0.8rem] font-semibold text-ink">Preferred time</p>
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  aria-pressed={time === t}
                  className={`tabular h-10 rounded-full border px-4 text-[0.88rem] font-medium transition-all ${
                    time === t ? 'border-accent bg-accent-soft text-accent' : 'border-line hover:border-ink/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <TextInput required placeholder="Your name" autoComplete="name" />
            </Field>
            <Field label="Phone">
              <TextInput required type="tel" placeholder="+20 1xx xxx xxxx" autoComplete="tel" />
            </Field>
          </div>
          <Button type="submit" size="lg" className="w-full">
            Request viewing · {chosen.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}, {time}
          </Button>
        </form>
      )}
    </Modal>
  )
}
